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
        className="flex cursor-pointer items-center select-none"
        style={{ lineHeight: 1 }}
      >
         <span className="text-2xl md:text-3xl font-extrabold tracking-tight transition-all duration-200">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">R</span>
            <span className="font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">EZ</span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">UME AI</span>
          </span>
        <SparklesIcon className="text-gray-400 ml-2 flex items-center" />
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
