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
} from "lucide-react"; // Added icons for tabs
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs"; // Assuming shadcn components are in @/components

import PersonalDetailsForm from "../_components/form_components/PersonalDetailsForm";
import SummaryForm from "../_components/form_components/SummaryForm";
import ExperienceForm from "../_components/form_components/ExperienceForm";
import EducationForm from "../_components/form_components/EducationForm";
import ProjectsForm from "../_components/form_components/ProjectsForm";
import SkillsForm from "../_components/form_components/SkillsForm";
import CertificationForm from "../_components/form_components/CertificationForm";
import { useParams, useRouter } from "next/navigation";
import { ResumeContext } from "../../context/ResumeContext";

const ResumeForm = () => {
  const router = useRouter();
  const { loading, setLoading } = useContext(ResumeContext);
  const params = useParams();

  const [previewLoading, setPreviewLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

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
  ];

  return (
    <div
      id="resume-form"
      className="lg:w-[50%] md:w-full  overflow-auto lg:border-r lg:border-zinc-700"
    >
      <div className="pt-5 lg:px-5 ">
        <div className="mb-4 flex flex-row justify-between gap-2 items-center w-full">
          <button
            onClick={() => {
              setHomeLoading(true);
              router.push('/dashboard');
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 ease-in-out hover:bg-purple-500/10 hover:text-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={homeLoading || previewLoading}
          >
            {homeLoading ? (
              <span className="animate-spin mr-2"><svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
            ) : (
              <Home size={18} />
            )}
            Back to Home
          </button>
          <button
            onClick={handleShowPreview}
            className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-400 transition-all duration-300 ease-in-out hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={previewLoading || homeLoading}
          >
            {previewLoading ? (
              <span className="animate-spin mr-2"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
            ) : (
              <Eye size={18} />
            )}
            Show Preview
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="tab overflow-x-scroll flex flex-row justify-between gap-2 w-full p-2 pt-3 items-center h-auto">
            <TabsTrigger
              value="personal"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <User size={16} className="mb-1" /> Personal
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <FileText size={16} className="mb-1" /> Summary
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Briefcase size={16} className="mb-1" /> Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <GraduationCap size={16} className="mb-1" /> Education
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Code size={16} className="mb-1" /> Projects
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Star size={16} className="mb-1" /> Skills
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="flex flex-col items-center justify-center py-1 px-1 text-xs md:text-sm cursor-pointer"
            >
              <Award size={16} className="mb-1" /> Certifications
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
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeForm;
