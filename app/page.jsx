"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SparklesIcon, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResumeContext } from "./context/ResumeContext";
import {
  sectionVariants,
  howItWorksSteps,
  features,
  testimonials,
  pricingPlans,
  faqs,
} from "../constants";

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const { loading, setLoading } = useContext(ResumeContext);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Header Section */}
      <header className="bg-black/70 backdrop-blur-lg flex justify-between items-center px-6 md:px-10 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-800">
        <div
          className="flex cursor-pointer items-center select-none"
          style={{ lineHeight: 1 }}
        >
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight transition-all duration-200">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              R
            </span>
            <span className="font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EZ
            </span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              UME AI
            </span>
          </span>
          <SparklesIcon className="text-gray-400 ml-2 flex items-center" />
        </div>
        <nav className="flex gap-3 md:gap-5 items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              router.push("/dashboard");
            }}
            className="px-4 py-2 cursor-pointer rounded-xl bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105"
          >
            Dashboard
          </button>
        </nav>
      </header>

      <section className="flex bg-zinc-950 flex-col items-center justify-center min-h-[80vh] w-full px-4 md:px-0 text-white text-center">
        <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-gray-300 mb-4">
          <SparklesIcon className="h-4 w-4 mr-2 text-purple-400" />
          <span>AI Powered Resume Builder</span>
        </div>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-normal ">
            Welcome to <br />
          </span>
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {" "}
            R
          </span>
          <span className="font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            EZ
          </span>
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            UME AI
          </span>
        </motion.h1>
        <motion.p
          className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Leverage the power of AI to create professional, ATS-friendly resumes
          that get noticed. Effortless, intelligent, and effective.{" "}
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] hover:scale-105 ease-in duration-200 text-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 400,
              delay: 0.2,
            }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-xl font-bold text-white backdrop-blur-3xl">
              <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-xl font-semibold text-white backdrop-blur-3xl">
                Start Building Now
                <ArrowRight className="w-6 h-6" />
              </span>
            </span>
          </motion.button>
        </div>
      </section>

      <motion.section
        id="app-preview"
        className="py-20 px-6 bg-zinc-950 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            See It In Action
          </h2>
          <p className="text-md sm:text-lg text-zinc-400 max-w-xl mx-auto mb-12">
            Experience our intuitive interface and powerful AI features designed
            to make resume building a breeze.
          </p>
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="bg-zinc-800 rounded-xl shadow-2xl p-1.5 sm:p-2 border border-zinc-700">
              <div className="flex items-center h-6 sm:h-8 px-2 sm:px-3 space-x-1.5 sm:space-x-2 bg-zinc-700 rounded-t-lg">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-black rounded-b-lg overflow-hidden">
                <img
                  src="/images/app-ss.jpg"
                  alt="App Screenshot"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section id="how-it-works" className="py-24 px-6 bg-zinc-950 text-white">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-20 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Resume Crafting, Simplified
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_5px_rgba(168,85,247,0.15)]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full mb-6 inline-block border border-purple-500/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.5, delay: index * 0.15 },
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-3 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.15 },
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-zinc-400 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.18 },
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <motion.section
        id="features"
        className="py-24 px-6 bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-white">
            Powerful Features, Effortless Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-zinc-900 rounded-xl flex flex-col items-center text-center border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="mb-5 text-cyan-400">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-24 px-6 bg-zinc-950 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-white">
            Hear From Our Users
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 bg-zinc-900 rounded-2xl flex flex-col items-center border border-zinc-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <SparklesIcon className="h-6 w-6 text-purple-400 mb-4 opacity-70" />
                <p className="text-md italic text-zinc-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-white text-md">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-zinc-500">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* FAQs Section */}
      <motion.section
        id="faqs"
        className="py-24 px-6 bg-zinc-950 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-white">
            Your Questions, Answered
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 bg-zinc-900 rounded-xl border border-zinc-800"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-purple-300">
                  {faq.question}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-black text-zinc-500 py-12 px-6 border-t border-zinc-800">
        <div className="container mx-auto text-center text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-1.5 text-md font-medium text-zinc-300 hover:text-purple-300 transition-colors"
            >
               REZSUME AI <SparklesIcon className="text-gray-400 h-4 w-4" />
            </Link>
          </div>
          <p className="mb-2 text-zinc-600">
            &copy; {currentYear} REZSUME AI. All rights reserved.
          </p>
          <p>Built By MK ✨</p>
        </div>
      </footer>
    </>
  );
};

export default page;
