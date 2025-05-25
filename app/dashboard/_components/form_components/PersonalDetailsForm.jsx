"use client";
import React, { useContext } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
  import { motion } from "framer-motion";

const PersonalDetailsForm = ({setActiveTab}) => {
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
    setActiveTab("summary");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveTab("summary");
  };
const formVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };
  return (
    <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible">
      <div className="rounded-[22px] px-4 py-3 dark:bg-zinc-900">
        <div className="flex justify-between">
          <h1 className="text-2xl my-3">Personal Details</h1>
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={() => setActiveTab("summary")}
              className="px-5 py-2 text-sm font-medium text-purple-400 bg-transparent border-2 border-purple-400 rounded-lg cursor-pointer hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-px"
            >
              Next
            </button>
          </div>
        </div>

        <div className="relative my-5">
          <div className="absolute -inset-0.5  rounded-2xl blur opacity-70"></div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="relative grid grid-cols-2 text-white gap-4 rounded-2xl p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80  transition duration-300 ease-in-out"
          >
          <div className="my-2">
            <p className="m-2">First Name:</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.firstName || ""}
              name="firstName"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="my-2">
            <p className="m-2">Last Name:</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.lastName || ""}
              name="lastName"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="my-2">
            <p className="m-2">Phone Number:</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.phone || ""}
              name="phone"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="my-2">
            <p className="m-2">Email:</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.email || ""}
              name="email"
              type="email"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="my-2 col-span-2">
            <p className="m-2">LinkedIn Url (Optional)</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.linkedIn || ""}
              name="linkedIn"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="my-2 col-span-2">
            <p className="m-2">Github Url (Optional)</p>
            <input
              onChange={handleChange}
              value={resumeData.personalDetails?.github || ""}
              name="github"
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="text-right col-span-2">
            <button
              type="submit"
              onClick={handleSave}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
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
