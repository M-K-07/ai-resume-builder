"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ResumeContext } from "../../../context/ResumeContext.jsx";

export function DialogBox({ isOpen, setIsOpen, setResumes, fetchResumes }) {
  const [resumeName, setResumeName] = useState("Untitled");
  const router = useRouter();
  const { user } = useUser();
  const { loading, setLoading } = useContext(ResumeContext);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsOpen(false);

    try {
      setLoading(true);
      const res = await fetch("/api/resume/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          resume_name: resumeName,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to create resume. Check server logs.");
      }

      const data = await res.json();
      console.log(data);

      fetchResumes();
      router.push(`/dashboard/resume/${data._id}`);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Name Your Resume</DialogTitle>
          <DialogDescription>
            Create a name for the resume you're about to create.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="submit"
            className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl p-[2px] font-bold text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={submitForm}
            disabled={loading}
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 px-8 py-2 text-lg backdrop-blur-3xl transition-colors group-hover:bg-zinc-900/80">
              {loading ? (
                <span className="animate-spin mr-2"><svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
              ) : null}
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Create Resume</span>
            </span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
