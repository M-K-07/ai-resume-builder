"use client";
import { ArrowLeft, Eye } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
  import { motion } from "framer-motion";

const SkillsForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData,loading,setLoading } =
    useContext(ResumeContext);
  const params = useParams();
  const router = useRouter();

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/dashboard/resume/${params.resume_id}/preview`);
  };
  const skillBlock = {
    title: "",
    skills: "",
  };

  const [skillsList, setSkillsList] = useState([skillBlock]);

  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSkillsList(resumeData.skills);
    }
  }, []);

  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updated = [...skillsList];
    updated[index][name] = value;
    setSkillsList(updated);
  };

  const handleAddSkillBlock = () => {
    setSkillsList([...skillsList, skillBlock]);
  };

  const handleRemoveSkillBlock = (index) => {
    if (skillsList.length > 1) {
      const updated = [...skillsList];
      updated.splice(index, 1);
      setSkillsList(updated);
    }
  };

  const formVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };


  useEffect(() => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: skillsList,
    }));
    console.log(resumeData);
  }, [skillsList]);

  return (
    <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible">
      <div className="rounded-[22px] px-4 py-3 dark:bg-zinc-900">
        <div className="flex justify-between">
          <h1 className="text-2xl my-3 text-white">Skills</h1>
          <div className="flex gap-3 items-center">
            <ArrowLeft
              className="cursor-pointer text-white"
              onClick={() => setActiveTab('projects')}
            />
            <button
              onClick={handleSubmit}
               className="px-5 py-2 flex gap-2 items-center text-sm font-medium text-purple-400 bg-transparent border-2 border-purple-400 rounded-lg cursor-pointer hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-px"
            >
             <Eye /> Show Preview
            </button>
          </div>
        </div>

        {skillsList.map((item, index) => (
          <div key={index} className="my-5 grid  text-white gap-4 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out">
            <div className="mb-3">
              <label className="block mb-1">Skill Category Title:</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Front-End, AI, DevOps"
                value={item.title}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Skills (comma-separated):</label>
              <input
                type="text"
                rows={3}
                name="skills"
                placeholder="e.g., HTML, CSS, React, Tailwind CSS"
                value={item.skills}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full border border-zinc-600 rounded-lg p-2 bg-zinc-800"
                required
              />
            </div>

            {skillsList.length > 1 && (
              <button
                onClick={() => handleRemoveSkillBlock(index)}
                className="bg-white mt-3 font-semibold text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddSkillBlock}
            className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer"
          >
            Add Skill Category
          </button>
          <button
            onClick={handleSave}
             className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
            >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsForm;
