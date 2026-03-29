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

  const bulletConstraint =
    "Generate the same number of bullet points as the original (either 2 or 3 mix of both) provided description. Keep the phrasing natural and professional. Do not use bold formatting or introductory text.";

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

      // 1. Generate Summary
      setProgressText("Generating Summary...");
      const summaryPrompt = PROMPTS.SUMMARY.replace(
        "{JobTitle}",
        updatedData.jobTitle || ""
      )
        .replace("{Experience}", updatedData.yearsOfExperience || "")
        .replace("{Skills}", updatedData.technologiesKnown || "")
        .replace("{JobDescription}", jobDescription) +
        "\n\nKeep the summary professional and without any bold formatting.";
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
            const expPrompt =
              PROMPTS.EXPERIENCE.replace(
                "{UserProvidedDescription}",
                work.description
              ).replace("{JobDescription}", jobDescription) +
              "\n\n" +
              bulletConstraint;
            const resp = await GenAi(expPrompt);
            const formatted = await formatMarkdown(resp);
            updatedWorks.push({ ...work, description: formatted });
            // 
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
            const projPrompt =
              PROMPTS.PROJECT.replace(
                "{TechnologiesUsed}",
                project.technologies || ""
              )
                .replace("{jobDescription}", jobDescription)
                .replace(
                  "{UserProvidedProjectDescription}",
                  project.description
                ) +
              "\n\n" +
              bulletConstraint;

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
              className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] focus:outline-none hover:scale-105 ease-in duration-75 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl min-w-[140px]">
                {isGenerating ? (
                  <Loader className="w-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4" />
                )}
                {isGenerating ? "Processing..." : "Generate All"}
              </span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
