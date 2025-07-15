"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
  import { motion } from "framer-motion";

const EducationForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData } =
    useContext(ResumeContext);
  const params = useParams();

  const educationForm = {
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
  };

  const [educationList, setEducationList] = useState([educationForm]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newEducationList = [...educationList];
    newEducationList[index][name] = value;
    setEducationList(newEducationList);
    console.log(resumeData);
  };

  const handleAddEducation = () => {
    setEducationList([...educationList, educationForm]);
  };

  const handleRemoveEducation = (index) => {
    if (educationList.length > 1) {
      const updated = [...educationList];
      updated.splice(index, 1);
      setEducationList(updated);
      toast.success("Education block removed successfully!");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Education details saved successfully!", { style: { background: '#22c55e', color: '#fff' } });
    setActiveTab("projects");
  };
  useEffect(() => {
    if (resumeData.education && resumeData.education.length > 0) {
      setEducationList(resumeData.education);
    }
  }, []);

  useEffect(() => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education: educationList,
    }));
  }, [educationList]);

  const formVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };
  return (
    <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible">
      <div className="rounded-[22px] px-2 py-2 sm:px-4 sm:py-3 dark:bg-zinc-900">
        <div className="flex sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setActiveTab('experience')}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">Education</h1>
        </div>
        {educationList.map((item, index) => (
          <div key={index}>
            <form className="my-4 sm:my-5 grid grid-cols-1 md:grid-cols-2 text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out w-full">
              <div>
                <p className="my-2 text-xs sm:text-sm">Degree: </p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="text"
                  required
                  name="degree"
                  value={item.degree}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <p className="my-2 text-xs sm:text-sm">Institution Name: </p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="text"
                  name="institution"
                  required
                  value={item.institution}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <p className="my-2 text-xs sm:text-sm">CGPA: </p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                  name="cgpa"
                  required
                  value={item.cgpa}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <p className="my-2 text-xs sm:text-sm">Location:</p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  name="location"
                  value={item.location}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600  transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="my-4 col-span-2">
                <p className="text-xs sm:text-sm">Duration:</p>
                <div className="flex flex-col md:flex-row gap-x-4 w-full">
                  <div className="w-full">
                    <p className="my-2 text-xs sm:text-sm text-gray-400">Start Date:</p>
                    <input
                      onChange={(e) => handleInputChange(e, index)}
                      type="month"
                      value={item.startDate}
                      name="startDate"
                      className="w-full border rounded-lg px-3 py-2 bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border-zinc-600  transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <p className="my-2 text-xs sm:text-sm text-gray-400">End Date:</p>
                    <input
                      onChange={(e) => handleInputChange(e, index)}
                      type="month"
                      value={item.endDate}
                      name="endDate"
                      className="w-full border rounded-lg px-3 py-2 bg-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border-zinc-600  transition-all duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              {educationList.length > 1 && (
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="bg-white mt-3 hover:scale-105 font-semibold text-xs sm:text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
                >
                  Remove
                </button>
              )}
            </form>
          </div>
        ))}
        <div className="flex justify-between col-span-2 mb-2">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleAddEducation}
              className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer text-xs sm:text-sm"
            >
              Add Education
            </button>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-px"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationForm;
