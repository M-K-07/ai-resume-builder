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
import { toast } from "sonner";
const AchievementsForm = ({setActiveTab}) => {
  const { resumeData, setResumeData, submitResumeData, loading, setLoading } =
    useContext(ResumeContext);

  const params = useParams();
  const achievements = {
    title: "",
    description: "",
  };
  const [achievementList, setAchievementList] = useState([achievements]);

  useEffect(() => {
    if (resumeData.achievements.length > 0 && resumeData.achievements) {
      setAchievementList(resumeData.achievements);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Achievement details saved successfully!", {
      style: { background: "#22c55e", color: "#fff" },
    });
    setActiveTab("personal");
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...achievementList];
    list[index][name] = value;
    setAchievementList(list);
  };

  const handleDescriptionChange = (e, index, value) => {
    const list = [...achievementList];
    list[index]["description"] = value;
    setAchievementList(list);
  };

  const handleAddAchievement = () => {
    setAchievementList([...achievementList, achievements]);
  };

  const handleRemoveAchievement = (index) => {
    if (achievementList.length > 1) {
      const updated = [...achievementList];
      updated.splice(index, 1);
      setAchievementList(updated);
      toast.success("Achievement removed successfully!");
    }
  };
  const aiResponse = async (e, index) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userAchievementDescription = achievementList[index].description;
      const achievementTitle = achievementList[index].title;
      const prompt = PROMPTS.ACHIEVEMENTS.replace(
        "{AchievementTitle}",
        achievementTitle
      ).replace(
        "{UserProvidedAchievementDescription}",
        userAchievementDescription
      );
      console.log(typeof PROMPTS.ACHIEVEMENTS);
      console.log(userAchievementDescription)
      console.log(prompt)

      const response = await GenAi(prompt);
      const formatted = await formatMarkdown(response);
      console.log("AI Response:", response);
      console.log("Formatted Response:", formatted);
      const list = [...achievementList];
      list[index].description = formatted;

      setAchievementList(list);
      setLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoading(false);
      toast.error("API Limit Exceeded 🥲. Please try again later.", {
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      achievements: achievementList,
    }));
  }, [achievementList]);

  useEffect(() => {
    console.log(resumeData);
    console.log(formatMarkdown(`Okay, since the user-provided description is simply "hello," it's impossible to refine or optimize it in a meaningful way. I can only assume it's a placeholder. Therefore, I'll create a hypothetical achievement based on a common scenario where "hello" might be significant: **Making a positive first impression that leads to a successful interaction.** I will then craft a refined description and related resume bullet points. **Hypothetical Scenario:** A customer service representative consistently receives positive feedback for their initial greeting and ability to quickly build rapport with customers. **Refined Achievement Description (for achievement title "Hello"):** "Mastered the art of first impressions, consistently delivering exceptional initial greetings that fostered immediate rapport with customers. Achieved a 20% higher customer satisfaction rating (CSAT) on initial interaction questions compared to the team average, leading to a 15% increase in successful issue resolution on first contact. Demonstrated active listening skills and empathy to understand customer needs quickly, setting a positive tone for the entire service experience." **Resume Bullet Points:** * **Enhanced Customer Satisfaction:** Improved initial interaction CSAT scores by 20% by crafting empathetic and effective customer greetings, setting a positive tone for subsequent interactions. * **Boosted First-Call Resolution:** Contributed to a 15% increase in first-call resolution rates by quickly building rapport and understanding customer needs during the initial greeting.`));
  }, [resumeData]);

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
              onClick={() => setActiveTab("skills")}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">
            Achievements
          </h1>
        </div>

        {achievementList.map((item, index) => {
          return (
            <form
              key={index}
              className="my-4 sm:my-5 grid grid-cols-2 text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out"
            >
              <div key={index} className="col-span-2">
                <p className="my-2 text-xs sm:text-sm">Achievement Title: </p>
                <input
                  onChange={(e) => handleInputChange(index, e)}
                  type="text"
                  required
                  name="title"
                  value={item.title}
                  className="w-full bg-zinc-800 p-2 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
                />
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
                      className="relative inline-flex h-9 sm:h-12 overflow-hidden rounded-lg sm:rounded-2xl p-[1px] hover:scale-105 ease-in duration-75 text-xs sm:text-sm"
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
                  value={String(item.description)}
                  placeholder="Craft your project story here, then let AI polish it to perfection! ✨"
                  onChange={(e) =>
                    handleDescriptionChange(e, index, e.target.value)
                  }
                  className="h-[200px] sm:h-[320px] w-full bg-zinc-800 p-2 text-[12px] sm:text-sm text-zinc-200 placeholder:text-zinc-500 border border-zinc-600 transition-all duration-300 ease-in-out"
                />
              </div>
              {achievementList.length > 1 && (
                <button
                  onClick={() => handleRemoveAchievement(index)}
                  className="bg-white mt-3 font-semibold text-xs sm:text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
                >
                  Remove
                </button>
              )}
            </form>
          );
        })}

        <div className="flex justify-between col-span-2 mb-2">
          <button
            onClick={handleAddAchievement}
            className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer text-xs sm:text-sm"
          >
            Add Achievement
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

export default AchievementsForm;
