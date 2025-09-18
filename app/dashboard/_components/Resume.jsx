"use client";
import React, { useContext } from "react";
import Header from "../_components/resume_components/Header";
import Summary from "../_components/resume_components/Summary";
import Experience from "../_components/resume_components/Experience";
import Projects from "../_components/resume_components/Projects";
import Education from "../_components/resume_components/Education";
import Skills from "../_components/resume_components/Skills";
import { ResumeContext } from "../../context/ResumeContext";
import Certifications from "./resume_components/Certifications";
import Achievements from "./resume_components/Achievements";

const Resume = () => {
  const { resumeData } = useContext(ResumeContext);
  return (
    <div className="resume w-full lg:block overflow-auto text-black p-3 ">
      <div
        id="actual-resume-content"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
        className="bg-white print:bg-white print:p-5 print:my-auto print:mx-auto print:rounded-none print:min-h-auto min-h-screen p-8 rounded-xl"
      >
        <Header headerData={resumeData.personalDetails} />

        {/* Summary */}
        <Summary summaryData={resumeData.summary} />

        {/* Experience */}
        <Experience experienceData={resumeData.workExperience} />

        {/* Education */}
        <Education educationData={resumeData.education} />

        {/* Projects */}

        <Projects projectsData={resumeData.projects} />

        {/* skills */}
        <Skills skillsData={resumeData.skills} />

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <Certifications certificationsData={resumeData.certifications} />
        )}

        {/* Achievements */}
        {resumeData.achievements && resumeData.achievements.length > 0 && (
          <Achievements achievementsData={resumeData.achievements} />
        )}
      </div>
    </div>
  );
};

export default Resume;
