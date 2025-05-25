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
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-md text-md shadow-lg shadow-purple-900/20 transition-all duration-400 cursor-pointer hover:shadow-xl hover:shadow-purple-900/30 p-3 sm:p-4 flex items-center justify-center gap-2"
            onClick={submitForm}
          >
            Create Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
