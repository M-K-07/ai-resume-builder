"use client";
import { EMPTY_RESUME_DATA } from "../../constants";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const ResumeContext = createContext();
const ResumeProvider = ({ children }) => {
  const params = useParams();
  const [resumeData, setResumeData] = useState(EMPTY_RESUME_DATA);
  const [loading, setLoading] = useState(true);

  const getResumeData = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/resume/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedResume = await res.json();
      console.log("Resume updated:", updatedResume);
      setResumeData(updatedResume);
      setLoading(false);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  useEffect(() => {
    if (params.resume_id) {
      getResumeData(params.resume_id);
      console.log(resumeData);
    }
  }, [params.resume_id]);

  const submitResumeData = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/resume/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!res.ok) {
        throw new Error("Failed to update resume");
      }
      const updatedResume = await res.json();
      setResumeData(updatedResume);
      setLoading(false);
      console.log("Resume updated:", updatedResume);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        submitResumeData,
        loading,
        setLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export { ResumeProvider, ResumeContext };
