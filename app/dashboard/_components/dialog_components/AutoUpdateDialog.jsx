"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { useContext, useEffect, useState } from "react";
import { GenAi } from "../../../../lib/GeminiAI.js";
import { PROMPTS } from "../../../../lib/prompts.js";
import { calcResumeCharCount } from "../../../../lib/resumeCharCount.js";
import { Loader, Sparkles } from "lucide-react";
import { ResumeContext } from "../../../context/ResumeContext.jsx";
import { toast } from "sonner";
import { formatMarkdown } from "../../../../lib/utils";
import { useParams } from "next/navigation";

export function AutoUpdateDialog({ isOpen, setIsOpen }) {
  const { setResumeData, resumeData, loading, setLoading } =
    useContext(ResumeContext);
  const params = useParams();

  const [jobDescription, setJobDescription] = useState(
    resumeData?.jobDescription || ""
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState("");

  useEffect(() => {
    setJobDescription(resumeData?.jobDescription || "");
  }, [resumeData?.jobDescription]);



  const handleAutoUpdate = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description.");
      return;
    }

    try {
      setIsGenerating(true);
      setLoading(true);

      // Create a copy of the current resume data to mutate
      let updatedData = { ...resumeData, jobDescription };

      // ── Compute section-aware budgets that guarantee a single A4 page fit ──
      // Dynamic single-page word count / character budget calculation based on demo layout (~2550 content chars)
      const expCount = (updatedData.workExperience || []).length;
      const projCount = (updatedData.projects || []).length;
      const achCount = (updatedData.achievements || []).length;
      const eduCount = (updatedData.education || []).length;
      const totalEntries = expCount + projCount + achCount + eduCount;

      // Single-page target is max ~2550 content chars. Subtract ~60 chars per extra entry above 4 entries to account for section titles, headers, and line spacing.
      const entryOverhead = Math.max(0, (totalEntries - 5) * 60);
      const TOTAL_TARGET = Math.max(1600, 2550 - entryOverhead);

      const SUMMARY_BUDGET = 320;        // ~45 words (2-3 sentences)
      const SKILLS_ESTIMATE = 250;       // estimate for technical skills section

      // Remaining budget split among experience, projects, achievements
      const remainingBudget = Math.max(600, TOTAL_TARGET - SUMMARY_BUDGET - SKILLS_ESTIMATE);

      // Weight: experiences get 45%, projects 45%, achievements 10%
      const expWeight   = expCount  > 0 ? 0.45 : 0;
      const projWeight  = projCount > 0 ? 0.45 : 0;
      const achWeight   = achCount  > 0 ? 0.10 : 0;
      const totalWeight = expWeight + projWeight + achWeight || 1;

      const budgets = {
        summary: SUMMARY_BUDGET,
        perExperience: expCount  > 0 ? Math.round((remainingBudget * (expWeight  / totalWeight)) / expCount)  : 340,
        perProject:    projCount > 0 ? Math.round((remainingBudget * (projWeight / totalWeight)) / projCount) : 380,
        perAchievement: achCount > 0 ? Math.round((remainingBudget * (achWeight  / totalWeight)) / achCount) : 130,
      };

      // 1. Generate Summary
      setProgressText("Generating Summary...");
      const summaryPrompt = PROMPTS.SUMMARY.replace(
        "{JobTitle}",
        updatedData.jobTitle || ""
      )
        .replace("{Experience}", updatedData.yearsOfExperience || "")
        .replace("{Skills}", updatedData.technologiesKnown || "")
        .replace("{JobDescription}", jobDescription)
        .replace("{CharBudget}", budgets.summary)
        .concat("\n\nKeep the summary professional and without any bold formatting.");
      const summaryResponse = await GenAi(summaryPrompt);
      updatedData.summary = summaryResponse;

      // 2. Generate Work Experience iteratively
      if (updatedData.workExperience && updatedData.workExperience.length > 0) {
        let updatedWorks = [];
        for (let i = 0; i < updatedData.workExperience.length; i++) {
          setProgressText(
            `Generating Experience ${i + 1}/${updatedData.workExperience.length}...`
          );
          const work = updatedData.workExperience[i];
          if (work.description && work.description.trim() !== "") {
            const expPrompt = PROMPTS.EXPERIENCE.replace(
              "{UserProvidedDescription}",
              work.description
            )
              .replace("{JobDescription}", jobDescription)
              .replace("{CharBudget}", budgets.perExperience);
            const resp = await GenAi(expPrompt);
            const formatted = await formatMarkdown(resp);
            updatedWorks.push({ ...work, description: formatted });
          } else {
            updatedWorks.push(work);
          }
        }
        updatedData.workExperience = updatedWorks;
      }

      // 3. Generate Projects iteratively
      if (updatedData.projects && updatedData.projects.length > 0) {
        let updatedProjects = [];
        for (let i = 0; i < updatedData.projects.length; i++) {
          setProgressText(
            `Generating Project ${i + 1}/${updatedData.projects.length}...`
          );
          const project = updatedData.projects[i];
          if (project.description && project.description.trim() !== "") {
            const projPrompt = PROMPTS.PROJECT.replace(
              "{TechnologiesUsed}",
              project.technologies || ""
            )
              .replace("{jobDescription}", jobDescription)
              .replace("{UserProvidedProjectDescription}", project.description)
              .replace("{CharBudget}", budgets.perProject);

            const resp = await GenAi(projPrompt);
            const formatted = await formatMarkdown(resp);
            updatedProjects.push({ ...project, description: formatted });
          } else {
            updatedProjects.push(project);
          }
        }
        updatedData.projects = updatedProjects;
      }

      // Save to context
      setProgressText("Saving changes...");
      setResumeData(updatedData);

      // Save natively via API
      if (params.resume_id) {
        const res = await fetch(`/api/resume/${params.resume_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Failed to save auto-updated resume");

        const newSavedResume = await res.json();
        setResumeData(newSavedResume);
      }

      toast.success("All sections updated successfully!", {
        style: { background: "#22c55e", color: "#fff" },
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during generation or saving.", {
        style: { background: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsGenerating(false);
      setLoading(false);
      setProgressText("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Match JD & Auto-Update</DialogTitle>
          <DialogDescription>
            Automatically update your Summary, Experience, and Projects based on
            the job description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            Job Description
            <Textarea
              className="my-3 scroll-auto h-[30vh] border-zinc-600 bg-zinc-800 text-zinc-200"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target Job Description here..."
            />
          </div>
        </div>
        <DialogFooter>
          <div className="col-span-2 flex justify-end items-center gap-3 w-full">
            {isGenerating && (
              <span className="text-sm text-zinc-400 mr-auto whitespace-nowrap">
                {progressText}
              </span>
            )}
            <button
              type="button"
              onClick={handleAutoUpdate}
              disabled={isGenerating}
              className="relative inline-flex h-11 overflow-hidden rounded-xl p-[1px] focus:outline-none hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:scale-100 cursor-pointer shadow-[0_0_18px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c084fc_0%,#3b82f6_50%,#c084fc_100%)]" />
              <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold backdrop-blur-xl min-w-[140px] group">
                {isGenerating ? (
                  <Loader className="w-4 h-4 animate-spin text-purple-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse group-hover:text-purple-300" />
                )}
                <span className="bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                  {isGenerating ? "Processing..." : "Generate All"}
                </span>
              </span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
