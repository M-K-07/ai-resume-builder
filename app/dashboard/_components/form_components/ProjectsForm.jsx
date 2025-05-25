"use client";
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Loader, Sparkles } from "lucide-react";
import Editor from "react-simple-wysiwyg";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PROMPTS } from "../../../../lib/prompts";
import { GenAi } from "../../../../lib/GeminiAI";
import { formatMarkdown } from "../../../../lib/utils";

const ProjectsForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData, loading, setLoading } =
    useContext(ResumeContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const projects = {
    projectName: "",
    technologies: "",
    description: "",
  };
  const params = useParams();

  const [projectList, setProjectList] = useState([projects]);

  useEffect(() => {
    if (resumeData.projects && resumeData.projects.length > 0) {
      setProjectList(resumeData.projects);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    setActiveTab("skills");
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...projectList];
    updatedList[index][name] = value;
    setProjectList(updatedList);
    console.log(resumeData);
  };

  const handleAddProject = () => {
    setProjectList([...projectList, projects]);
  };

  const handleRemoveProjectBlock = (index) => {
    if (projectList.length > 1) {
      const updated = [...projectList];
      updated.splice(index, 1);
      setProjectList(updated);
    }
  };

  const handleDescriptionChange = (e, idx, value) => {
    const updated = [...projectList];
    updated[idx].description = value;
    setProjectList(updated);
    console.log(resumeData);
  };

  const aiResponse = async (e, index) => {
    e.preventDefault();
    setLoading(true);
    const userProjectDescription = projectList[index].description;
    const jobDescription = resumeData.jobDescription;

    const prompt = PROMPTS.PROJECT.replace(
      "{TechnologiesUsed}",
      resumeData.projects[index].technologies
    )
      .replace("{jobDescription}", jobDescription)
      .replace("{UserProvidedProjectDescription}", userProjectDescription);

    const response = await GenAi(prompt);
    const formattedResponse = await formatMarkdown(response);
    const updated = [...projectList]; // Create a new array for state update
    updated[index].description = formattedResponse;
    setProjectList(updated);
    setLoading(false);
  };

  useEffect(() => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      projects: projectList,
    }));
  }, [projectList]);

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
      <div className="rounded-[22px] px-4 py-3  dark:bg-zinc-900">
        <div className="flex justify-between">
          <h1 className="text-2xl my-3">Projects</h1>
          <div className="flex gap-3 items-center">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => setActiveTab("education")}
            />
            <button
              onClick={() => setActiveTab("skills")}
              className="px-5 py-2 text-sm font-medium text-purple-400 bg-transparent border-2 border-purple-400 rounded-lg cursor-pointer hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-px"
            >
              Next
            </button>
          </div>
        </div>

        {projectList.map((item, index) => {
          return (
            <form
              key={index}
              className="my-5 grid grid-cols-2 text-white gap-4 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out"
            >
              <div key={index} className="col-span-2">
                <p className="my-2">Project Name: </p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="text"
                  required
                  name="projectName"
                  value={item.projectName}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="col-span-2">
                <p className="my-2">Technologies Used: </p>
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="text"
                  required
                  placeholder="Nextjs, MongoDb, Java, Python"
                  value={item.technologies}
                  name="technologies"
                  className="w-full bg-zinc-800 p-2 rounded-lg text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="my-2 col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <p className="my-2">Description:</p>
                  <div>
                    <button
                      type="button"
                      onClick={(event) => {
                        aiResponse(event, index);
                      }}
                      className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] hover:scale-105 ease-in duration-75 "
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
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
                  placeholder="Craft your project story here, then let AI polish it to perfection! ✨"
                  onChange={(e) =>
                    handleDescriptionChange(e, index, e.target.value)
                  }
                  className="h-[320px] w-full bg-zinc-800 p-2 text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
                />
              </div>
              {projectList.length > 1 && (
                <button
                  onClick={() => handleRemoveProjectBlock(index)}
                  className="bg-white mt-3 font-semibold text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
                >
                  Remove
                </button>
              )}
            </form>
          );
        })}

        <div className="flex justify-between col-span-2 mb-2">
          <button
            onClick={handleAddProject}
            className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer"
          >
            Add Project
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
          >
            Save
          </button>
        </div>
      </div>
      {/* <ProjectDialog projectList={projectList} setProjectList={setProjectList} isOpen={dialogOpen} index={activeIndex} setIsOpen={setDialogOpen} /> */}
    </motion.div>
  );
};

export default ProjectsForm;
