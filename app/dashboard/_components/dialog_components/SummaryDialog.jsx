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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { useContext, useState } from "react";
import { GenAi } from "../../../../lib/GeminiAI.js";
import { PROMPTS } from "../../../../lib/prompts.js";
import { Loader, Sparkles } from "lucide-react";
import { ResumeContext } from "../../../context/ResumeContext.jsx";

export function SummaryDialog({ isOpen, setIsOpen }) {
  const { setResumeData, resumeData, loading, setLoading } =
    useContext(ResumeContext);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = PROMPTS.SUMMARY.replace("{JobTitle}", resumeData.jobTitle)
        .replace("{Experience}", resumeData.yearsOfExperience)
        .replace("{Skills}", resumeData.technologiesKnown)
        .replace("{JobDescription}", resumeData.jobDescription);
      const response = await GenAi(prompt);

      setResumeData((prevData) => ({ ...prevData, summary: response }));
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setLoading(false);

      toast.error("API Limit Exceeded 🥲. Please try again later.", {
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] ">
        <DialogHeader>
          <DialogTitle>Need Some Inputs 😀</DialogTitle>
          <DialogDescription>
            Fill out the inputs to make sure to generate more detailed summary.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right">
              Job Title
            </Label>
            <Input
              onChange={(e) =>
                setResumeData((prevData) => ({
                  ...prevData,
                  jobTitle: e.target.value,
                }))
              }
              placeholder="Developer, Data Analyst"
              id="jobTitle"
              value={resumeData?.jobTitle}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>Experience</div>
            <Select
              defaultValue={resumeData?.yearsOfExperience}
              onValueChange={(value) =>
                setResumeData((prevData) => ({
                  ...prevData,
                  yearsOfExperience: value,
                }))
              }
            >
              <SelectTrigger className="w-[23vw]">
                <SelectValue placeholder="Select Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Number of Years</SelectLabel>
                  <SelectItem value="0-2 years">0-2 years</SelectItem>
                  <SelectItem value="2-3 years">2-3 years</SelectItem>
                  <SelectItem value="5 years">5 years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              onChange={(e) =>
                setResumeData((prevData) => ({
                  ...prevData,
                  technologiesKnown: e.target.value,
                }))
              }
              id="skills"
              placeholder="Python, Java"
              value={resumeData?.technologiesKnown}
              className="col-span-3"
            />
          </div>
          <div>
            Job Description
            <Textarea
              className="my-3 scroll-auto h-[30vh]"
              value={resumeData?.jobDescription}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  jobDescription: e.target.value,
                }))
              }
              placeholder="Paste Your Job description here.."
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
                {loading ? (
                  <Loader className="w-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4" />
                )}
                {loading ? "Generating..." : "Generate"}
              </span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
