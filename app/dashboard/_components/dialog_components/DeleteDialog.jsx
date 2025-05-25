"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./../ui/dialog"; // Assuming this is the correct path to your shadcn/ui components
import { Button } from "./../ui/button"; // Assuming this is the correct path

export function DeleteDialog({ isOpen, resumeId, setIsOpen, onResumeDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      console.error("No resume ID provided for deletion.");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setIsOpen(false);
        if (onResumeDeleted) {
          onResumeDeleted(resumeId);
        }
      } else {
        console.error(
          "Failed to delete resume:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error during resume deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this resume? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" className='cursor-pointer' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className='cursor-pointer'
            variant="destructive"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
