"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Loader, Sparkles } from "lucide-react";
import Editor from "react-simple-wysiwyg";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PROMPTS } from "../../../../lib/prompts";
import { GenAi } from "../../../../lib/GeminiAI";
import { formatMarkdown } from "../../../../lib/utils";

const ExperienceForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData, loading, setLoading } =
    useContext(ResumeContext);

  const params = useParams();
  const formData = {
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [experienceList, setExperienceList] = useState([formData]);

  useEffect(() => {
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      setExperienceList(resumeData.workExperience);
    }
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index][name] = value;
    setExperienceList(updatedExperienceList);
  };
  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Experience details saved successfully!", {
      style: { background: "#22c55e", color: "#fff" },
    });
    setActiveTab("education");
  };
  const handleDescriptionChange = (idx, value) => {
    const updated = [...experienceList];
    updated[idx].description = value;
    setExperienceList(updated);
    console.log(experienceList);
  };

  const handleRemoveExperienceBlock = (index) => {
    if (experienceList.length > 1) {
      const updated = [...experienceList];
      updated.splice(index, 1);
      setExperienceList(updated);
      toast.success("Experience block removed successfully!");
    }
  };
  const handleAddExperience = () => {
    setExperienceList([...experienceList, formData]);
  };

  const aiResponse = async (e, index) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userDescription = experienceList[index].description;
      const jobDescription = resumeData.jobDescription;

      const prompt = PROMPTS.EXPERIENCE.replace(
        "{UserProvidedDescription}",
        userDescription
      ).replace("{JobDescription}", jobDescription);

      const response = await GenAi(prompt);
      const formattedResponse = await formatMarkdown(response);
      const updated = [...experienceList]; // Create a new array for state update
      updated[index].description = formattedResponse;
      setExperienceList(updated);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("API Limit Exceeded 🥲. Please try again later.", {
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  useEffect(() => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: experienceList,
    }));
  }, [experienceList]);

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <div className="rounded-[22px] px-2 py-2 sm:px-4 sm:py-3 dark:bg-zinc-900">
        <div className="flex sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setActiveTab("summary")}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">
            Experience
          </h1>
        </div>
        {experienceList.map((item, index) => (
          <form
            action=""
            key={index}
            className="my-4 sm:my-5 grid grid-cols-2 text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out"
          >
            <div>
              <p className="my-2 text-xs sm:text-sm">Role: </p>
              <input
                type="text"
                required
                name="role"
                value={item.role}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full  bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
              />
            </div>
            <div>
              <p className="my-2 text-xs sm:text-sm">Company Name: </p>
              <input
                type="text"
                required
                name="company"
                value={item.company}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 rounded-lg bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
              />
            </div>
            <div className=" col-span-2">
              <p className="my-2 text-xs sm:text-sm">Location:</p>
              <input
                required
                name="location"
                value={item.location}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 rounded-lg bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="my-4 col-span-2">
              <p className="text-xs sm:text-sm">Duration:</p>
              <div className="flex flex-col md:flex-row gap-x-4 w-full">
                <div className="w-full">
                  <p className="my-2 text-xs sm:text-sm text-gray-400">
                    Start Date:
                  </p>
                  <input
                    type="month"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full border rounded-lg px-3 py-2 bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border-zinc-600  transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="w-full">
                  <p className="my-2 text-xs sm:text-sm text-gray-400">
                    End Date:
                  </p>
                  <input
                    type="month"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full border rounded-lg px-3 py-2 bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border-zinc-600  transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="my-2 col-span-2">
              <div className="flex justify-between items-center mb-3">
                <p className="my-2 text-xs sm:text-sm">Description:</p>
                <div>
                  <button
                    type="button"
                    onClick={(event) => {
                      aiResponse(event, index);
                    }}
                    className="relative inline-flex h-9 sm:h-12 overflow-hidden rounded-lg sm:rounded-2xl p-[1px] hover:scale-105 ease-in duration-75 text-[13px] sm:text-sm"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg sm:rounded-2xl bg-slate-950 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl">
                      <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-lg sm:rounded-2xl bg-slate-950 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl">
                        {loading ? (
                          <Loader className="w-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4" />
                        )}
                        {loading ? "Generating..." : "Enhance with AI"}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <Editor
                value={item.description}
                placeholder="Describe your achievements and responsibilities, then let AI make them shine! 🚀"
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="h-[200px] sm:h-[320px] border-none outline-none bg-zinc-800 text-[12px] sm:text-sm text-zinc-200"
              />
            </div>
            {experienceList.length > 1 && (
              <button
                onClick={() => handleRemoveExperienceBlock(index)}
                className="bg-white mt-3 hover:scale-105 font-semibold text-xs sm:text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            )}
          </form>
        ))}
        <div className="flex justify-between col-span-2">
          <button
            onClick={handleAddExperience}
            className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer text-xs sm:text-sm"
          >
            + Add experience
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceForm;
