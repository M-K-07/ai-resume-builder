"use client";
import React, { useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { Plus, Sparkles, Trash2, ArrowRight } from "lucide-react";
import { DialogBox } from "./_components/dialog_components/DialogBox";
import { useRouter } from "next/navigation";
import { ResumeContext } from "../context/ResumeContext";
import { Button } from "./_components/ui/button";
import { Card } from "./_components/ui/card";
import { DeleteDialog } from "./_components/dialog_components/DeleteDialog";
import Loading from "./_components/Loading";
import { Skeleton } from "./_components/ui/skeleton";
import { motion } from "framer-motion";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDeleteId, setResumeToDeleteId] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isFetchingResumes, setIsFetchingResumes] = useState(true);
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
      setIsFetchingResumes(true);
      const res = await fetch(`/api/resume?userId=${user.id}`);
      if (!res) {
        setIsFetchingResumes(false);
        return;
      }
      const data = await res.json();
      setResumes(data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setIsFetchingResumes(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false); // Disable global loader on the dashboard root
      fetchResumes();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 mt-4 gap-8"
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">
            Hello, {user?.firstName} 👋
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-zinc-400 font-medium tracking-tight mt-2">
            Create a brand new ATS-optimized resume, or refine your existing ones to perfection.
          </p>
        </div>
        
        <Button
          onClick={() => setDialogOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-6 bg-white text-black rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-zinc-200 cursor-pointer"
        >
          Create New Resume <Plus className="h-5 w-5 ml-1" />
        </Button>
      </motion.div>

      {isFetchingResumes ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tighter">
              My Resumes
            </h2>
            <div className="h-px bg-white/10 flex-grow ml-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="h-[280px] bg-[#09090b] backdrop-blur-lg border border-white/10 rounded-[1.25rem] overflow-hidden flex flex-col p-6 shadow-lg">
                <Skeleton className="h-7 w-3/4 mb-4 bg-white/10" />
                <Skeleton className="h-4 w-1/2 mb-auto bg-white/10" />
                <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                  <Skeleton className="h-11 flex-1 rounded-xl bg-white/10" />
                  <Skeleton className="h-11 w-[52px] flex-none rounded-xl bg-white/10" />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      ) : resumes.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tighter">
              My Resumes
            </h2>
            <div className="h-px bg-white/10 flex-grow ml-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume, index) => (
              <motion.div 
                key={resume._id} 
                className="group relative h-full cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative bg-[#09090b] backdrop-blur-lg border border-white/10 overflow-hidden h-full rounded-[1.25rem] transition-all duration-300 group-hover:border-zinc-300 group-hover:-translate-y-1 flex flex-col justify-between shadow-lg group-hover:shadow-[0_10px_30px_rgba(212,212,216,0.15)]">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <h3
                        className="text-xl font-bold text-white mb-2 line-clamp-2 tracking-tight"
                        title={resume.resume_name}
                      >
                        {resume.resume_name}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-6 font-medium">
                        Last Edited:{" "}
                        {new Date(
                          resume.updatedAt || resume.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                      <Button
                        onClick={() => {
                          setLoading(true);
                          viewResumeForm(resume._id);
                        }}
                        className="flex-1 bg-white text-black hover:bg-zinc-200 rounded-xl transition-all duration-300 font-bold cursor-pointer"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDeleteDialog(resume._id)}
                        variant="outline"
                        className="flex-none px-3 cursor-pointer border-white/10 bg-black/20 text-zinc-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-32 px-4 text-center border border-white/5 bg-white/5 backdrop-blur-sm rounded-[3rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            Your Canvas Awaits
          </h2>
          <p className="text-zinc-400 max-w-md text-lg mb-10">
            You don't have any resumes yet. Create your first ATS-optimized resume in seconds.
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-6 bg-white text-black rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-zinc-200 cursor-pointer"
          >
            Create Your First Resume <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
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
