"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import { formatMarkdown } from "../../../../lib/utils.js";
import { Textarea } from "../ui/textarea.jsx";
import { useContext, useEffect, useState } from "react";
import { GenAi } from "../../../../lib/GeminiAI.js";
import { PROMPTS } from "../../../../lib/prompts.js";
import { Loader, Sparkles } from "lucide-react";
import { ResumeContext } from "../../../context/ResumeContext.jsx";
import { useParams } from "next/navigation.js";

export function ExperienceDialog({
  isOpen,
  setIsOpen,
  index,
  experienceList,
  setExperienceList,
}) {
  const { setResumeData, resumeData, submitResumeData, loading, setLoading } =
    useContext(ResumeContext);
  const params = useParams();

  const experienceSummary =
    resumeData.workExperience[index]?.experienceSummary || "";

  const handleInputChange = (e) => {
    const value = e.target.value;
    setResumeData((prevData) => {
      const updatedWorkExperience = [...prevData.workExperience];
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        experienceSummary: value,
      };
      return {
        ...prevData,
        workExperience: updatedWorkExperience,
      };
    });
  };

  const submitForm = async (e) => {
  
    e.preventDefault();
    setLoading(true);
    const prompt = PROMPTS.EXPERIENCE.replace("{Summary}", experienceSummary);
    const response = await GenAi(prompt);
    const formattedResponse = await formatMarkdown(response);
    console.log(resumeData.workExperience);
    await submitResumeData(params.resume_id);
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index].description = formattedResponse;
    updatedExperienceList[index].experienceSummary = experienceSummary;
    setExperienceList(updatedExperienceList);
    setLoading(false); 
    setIsOpen(false);
  };
  useEffect(() => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: experienceList,
    }));
    console.log(experienceList);
  }, [experienceList]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] ">
        <DialogHeader>
          <DialogTitle>Need Some Inputs 😀</DialogTitle>
          <DialogDescription>
            Fill out the inputs to make sure to generate more detailed
            Description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            Brief Summary
            <Textarea
              className="my-3 scroll-auto h-[30vh]"
              value={experienceSummary}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Summarize your key responsibilities, technologies used, and achievements in your current or previous role..."
            />
          </div>
        </div>
        <DialogFooter>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={submitForm}
              className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] focus:outline-none hover:scale-105 ease-in duration-75 "
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
               {loading ? <Loader className="w-4 animate-spin" /> : <Sparkles className="w-4" />}
                {loading ? "Generating..." : "Generate"}
              
              </span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
