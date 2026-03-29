"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import {
  Home,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Star,
  Eye,
  Award,
  Trophy,
  Sparkles,
} from "lucide-react"; // Added icons for tabs
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs"; // Assuming shadcn components are in @/components
import Loading from "./Loading";
import { AutoUpdateDialog } from "./dialog_components/AutoUpdateDialog";

import PersonalDetailsForm from "../_components/form_components/PersonalDetailsForm";
import SummaryForm from "../_components/form_components/SummaryForm";
import ExperienceForm from "../_components/form_components/ExperienceForm";
import EducationForm from "../_components/form_components/EducationForm";
import ProjectsForm from "../_components/form_components/ProjectsForm";
import SkillsForm from "../_components/form_components/SkillsForm";
import CertificationForm from "../_components/form_components/CertificationForm";
import { useParams, useRouter } from "next/navigation";
import { ResumeContext } from "../../context/ResumeContext";
import Achievements from "./resume_components/Achievements";
import AchievementsForm from "./form_components/AchievementsForm";

const ResumeForm = () => {
  const router = useRouter();
  const { loading, setLoading, resumeData } = useContext(ResumeContext);
  const params = useParams();

  const [previewLoading, setPreviewLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [isAutoUpdateOpen, setIsAutoUpdateOpen] = useState(false);

  const handleShowPreview = (e) => {
    e.preventDefault();
    setPreviewLoading(true);
    router.push(`/dashboard/resume/${params.resume_id}/preview`);
  };

  // Use state to manage the active tab
  const [activeTab, setActiveTab] = useState("personal");

  // Define the order of tabs for navigation
  const tabOrder = [
    "personal",
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "achievements",
  ];

  // Compute if it is a fresh resume based on missing data
  const isFreshResume =
    !resumeData?.personalDetails?.firstName &&
    !resumeData?.personalDetails?.lastName &&
    (!resumeData?.workExperience || resumeData.workExperience.length === 0) &&
    (!resumeData?.education || resumeData.education.length === 0) &&
    (!resumeData?.projects || resumeData.projects.length === 0) &&
    (!resumeData?.skills || resumeData.skills.length === 0);

  return (
    <div
      id="resume-form"
      className="lg:w-[50%] md:w-full  overflow-auto lg:border-r lg:border-zinc-700"
    >
      {(homeLoading || previewLoading) && <Loading />}
      <div className="pt-5 lg:px-5 ">
        <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center w-full">
          <button
            onClick={() => {
              setHomeLoading(true);
              router.push('/dashboard');
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-zinc-100 bg-white/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white/20 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={homeLoading || previewLoading}
          >
            {homeLoading ? (
              <span className="animate-spin mr-2"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
            ) : (
              <Home size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
            )}
            Back to Home
          </button>
          <div className="flex gap-3">
            {!isFreshResume && (
              <button
                onClick={() => setIsAutoUpdateOpen(true)}
                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl p-[2px] font-bold text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-zinc-900 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={previewLoading || homeLoading}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#ec4899_50%,#a855f7_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 backdrop-blur-3xl transition-colors group-hover:bg-zinc-900/80">
                  <Sparkles size={16} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                  <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">One Click Update</span>
                </span>
              </button>
            )}
            <button
              onClick={handleShowPreview}
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs md:text-sm font-bold text-black bg-white transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={previewLoading || homeLoading}
            >
              {previewLoading ? (
                <span className="animate-spin mr-2"><svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
              ) : (
                <Eye size={16} />
              )}
              Show Preview
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="tab overflow-x-scroll flex flex-row justify-between gap-1 w-full px-1 pt-3 pb-0 items-end h-auto">
            <TabsTrigger
              value="personal"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <User size={16} className="mb-1" /> Personal
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <FileText size={16} className="mb-1" /> Summary
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Briefcase size={16} className="mb-1" /> Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <GraduationCap size={16} className="mb-1" /> Education
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Code size={16} className="mb-1" /> Projects
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Star size={16} className="mb-1" /> Skills
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="flex flex-col flex-1 items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Award size={16} className="mb-1" /> Certifications
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Trophy size={16} className="mb-1" /> Achievements
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="personal">
            <PersonalDetailsForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="summary">
            <SummaryForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="certifications">
            <CertificationForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
          <TabsContent value="achievements">
            <AchievementsForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabOrder={tabOrder}
            />
          </TabsContent>
        </Tabs>
      </div>
      <AutoUpdateDialog isOpen={isAutoUpdateOpen} setIsOpen={setIsAutoUpdateOpen} />
    </div>
  );
};

export default ResumeForm;
