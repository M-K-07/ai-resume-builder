"use client";
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { SummaryDialog } from "../dialog_components/SummaryDialog";
import { toast } from "sonner";
  import { motion } from "framer-motion";

const SummaryForm = ({ setActiveTab }) => {
  const { resumeData, setResumeData, submitResumeData } =
    useContext(ResumeContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const params = useParams();

  const handleChange = (e) => {
    setResumeData((prevData) => ({ ...prevData, summary: e.target.value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Summary details saved successfully!", { style: { background: '#22c55e', color: '#fff' } });
    setActiveTab("experience")
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
      <div className="rounded-[22px] px-2 py-2 sm:px-4 sm:py-3 dark:bg-zinc-900">
        <div className="flex sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setActiveTab('personal')}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">Summary</h1>
        </div>

        <form
          action=""
          className="my-4 sm:my-5 grid grid-cols-2 text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out"
        >
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="relative inline-flex h-9 sm:h-12 overflow-hidden rounded-lg sm:rounded-2xl p-[1px] hover:scale-105 ease-in duration-75 text-xs sm:text-sm"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg sm:rounded-2xl bg-slate-950 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl">
                Generate with AI
              </span>
            </button>
          </div>
          <div className="my-2 col-span-2 ">
            <textarea
              value={resumeData.summary}
              onChange={handleChange}
              name="summary"
              placeholder="Enter Your Summary..."
              className="w-full text-xs sm:text-sm p-2 sm:p-4 rounded-xl min-h-[24vh] sm:min-h-[30vh] bg-transparent text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="text-right col-span-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <SummaryDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </motion.div>
  );
};

export default SummaryForm;
