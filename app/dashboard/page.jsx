"use client";
import React, { useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { Plus, PlusCircle, Sparkles, Trash2 } from "lucide-react";
import { DialogBox } from "./_components/dialog_components/DialogBox";
import { useRouter } from "next/navigation";
import { ResumeContext } from "../context/ResumeContext";
import { Button } from "./_components/ui/button";
import { Card } from "./_components/ui/card";
import { DeleteDialog } from "./_components/dialog_components/DeleteDialog";
import Loading from "./_components/Loading";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDeleteId, setResumeToDeleteId] = useState(null);
  const [resumes, setResumes] = useState([]);
  const { loading, setLoading } = useContext(ResumeContext);

  const viewResumeForm = (id) => {
    router.push(`/dashboard/resume/${id}`);
  };

  const handleOpenDeleteDialog = (id) => {
    setResumeToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleResumeSuccessfullyDeleted = (deletedId) => {
    setResumes((prevResumes) =>
      prevResumes.filter((resume) => resume._id !== deletedId)
    );
    setResumeToDeleteId(null);
  };

  const fetchResumes = async () => {
    try {
      const res = await fetch(`/api/resume?userId=${user.id}`);
      if (!res) return;
      const data = await res.json();
      setResumes(data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchResumes();
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="text-center mx-10">
        <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-gray-300 mb-4">
          <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
          <span>Ai Powered Resume Builder</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Hello {user?.firstName}
          </span>
          👋
        </h1>
        <p className="text-lg mx-auto justify-center text-gray-300 mb-8">
          Craft a brand new resume with the help of our AI-powered assistant,{" "}
          <br />
          or easily update and polish your existing ones to perfection.
        </p>
        <Button
          onClick={() => setDialogOpen(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full text-lg  shadow-lg shadow-purple-900/20 transition-all duration-400 cursor-pointer hover:shadow-xl hover:shadow-purple-900/30 p-7 hover:translate-y-[-5px]"
        >
          Create New Resume <Plus className="h-6 w-6" />
        </Button>
      </div>
      {resumes.length != 0 ? (
        <>
          {" "}
          <h2 className="text-2xl m-7 mx-10 font-bold text-white">
            My Resumes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-7 mx-10">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Card className="relative bg-[#0a0a0a] border border-white/10 overflow-hidden h-full transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-5px] flex flex-col justify-between">
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium text-white mb-2 truncate"
                      title={resume.resume_name}
                    >
                      {resume.resume_name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Last Edited{": "}
                      {new Date(
                        resume.updatedAt || resume.createdAt
                      ).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => {
                          setLoading(true);
                          viewResumeForm(resume._id);
                        }}
                        className="flex-1 bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-lg transition-all duration-300"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDeleteDialog(resume._id)}
                        variant="outline"
                        className="flex-1 cursor-pointer border-white/20 text-gray-400 hover:border-red-500/70 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-center py-30 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4">
              Your Resume Canvas Awaits! 🎨
            </h2>
            
          </div>
        </>
      )}
      <DialogBox
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        setResumes={setResumes}
        fetchResumes={fetchResumes}
      />
      <DeleteDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        setResumes={setResumes}
        resumeId={resumeToDeleteId}
        onResumeDeleted={handleResumeSuccessfullyDeleted}
      />
    </div>
  );
};

export default Page;
