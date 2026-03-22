"use client";
import { UserButton } from "@clerk/nextjs";
import { SparklesIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="no-print" 
      className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-24 lg:right-24 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl"
    >
      <a
        onClick={() => router.push(`/dashboard`)}
        className="flex cursor-pointer items-center select-none"
        style={{ lineHeight: 1 }}
      >
        <span className="text-2xl md:text-3xl font-extrabold tracking-tighter">
          <span className="text-white">R</span>
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            EZ
          </span>
          <span className="text-white">UME AI</span>
        </span>
        <SparklesIcon className="text-gray-400 ml-2 h-5 w-5 animate-pulse" />
      </a>
      <div className="flex gap-4 items-center justify-center">
        <UserButton />
      </div>
    </motion.div>
  );
};

export default Navbar;
