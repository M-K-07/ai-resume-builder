"use client";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import {  LogOut, SparklesIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <div id="no-print" className="bg-gradient-to-r from-zinc-900/80 via-black/70 to-zinc-900/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center px-6 md:px-10 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-700/50">
      <a
        onClick={() => router.push(`/dashboard`)}
        className="bg-clip-text text-transparent bg-gradient-to-r flex cursor-pointer items-center gap-2 from-white to-gray-400 text-2xl font-bold"
      >
        Smart Resume <SparklesIcon className="text-gray-400"/>
      </a>
      <div className="flex gap-4 items-center justify-center">
        <UserButton />
        <SignOutButton>
          <LogOut className="text-zinc-300 hover:text-red-500 transition-colors duration-300 cursor-pointer" size={20}/>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Navbar;
