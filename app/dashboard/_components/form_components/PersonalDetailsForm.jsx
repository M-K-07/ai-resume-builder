"use client";
import React, { useContext } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner"

const PersonalDetailsForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData } =
    useContext(ResumeContext);
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Personal details saved successfully!", { style: { background: '#22c55e', color: '#fff' } });
    setActiveTab("summary");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveTab("summary");
  };
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
            {/* No left arrow for PersonalDetailsForm, but structure matches others for consistency */}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">
            Personal Details
          </h1>
        </div>

        <div className="relative my-4 sm:my-5">
          <div className="absolute -inset-0.5  rounded-2xl blur opacity-70"></div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="relative grid grid-cols-2 text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80  transition duration-300 ease-in-out"
          >
            <div className="my-2">
              <p className="m-2 text-xs sm:text-sm">First Name:</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.firstName || ""}
                name="firstName"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="my-2">
              <p className="m-2 text-xs sm:text-sm">Last Name:</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.lastName || ""}
                name="lastName"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="my-2">
              <p className="m-2 text-xs sm:text-sm">Phone Number:</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.phone || ""}
                name="phone"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="my-2">
              <p className="m-2 text-xs sm:text-sm">Email:</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.email || ""}
                name="email"
                type="email"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="my-2 col-span-2">
              <p className="m-2 text-xs sm:text-sm">LinkedIn Url (Optional)</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.linkedIn || ""}
                name="linkedIn"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="my-2 col-span-2">
              <p className="m-2 text-xs sm:text-sm">Github Url (Optional)</p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.github || ""}
                name="github"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="my-2 col-span-2">
              <p className="m-2 text-xs sm:text-sm">
                LeetCode Profile (Optional)
              </p>
              <input
                onChange={handleChange}
                value={resumeData.personalDetails?.leetCode || ""}
                name="leetCode"
                className="bg-zinc-800 border border-zinc-700 text-gray-200 text-xs sm:text-sm rounded-lg block w-full p-2 sm:p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="text-right col-span-2">
              <button
                type="submit"
                onClick={handleSave}
                className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalDetailsForm;
