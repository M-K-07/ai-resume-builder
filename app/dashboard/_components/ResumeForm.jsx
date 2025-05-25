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
import { useRouter } from "next/navigation";
import { ResumeContext } from "../../context/ResumeContext";

const ResumeForm = () => {
  const router = useRouter();
  const { loading, setLoading } = useContext(ResumeContext);

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
  ];

  return (
    <div
      id="resume-form"
      className="lg:w-[50%] md:w-full overflow-auto lg:border-r lg:border-zinc-700"
    >
      <div className="pt-5 px-5">
        <div className="mb-4">
          <button
            onClick={() => {
              setLoading(true);
              router.push('/dashboard');
              // setLoading(false) should be handled by the destination page or ResumeContext
              // when the content for the dashboard page is ready.
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 ease-in-out hover:bg-purple-500/10 hover:text-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto">
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
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeForm;
