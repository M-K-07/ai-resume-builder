"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SparklesIcon, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black min-h-screen text-zinc-100 overflow-hidden selection:bg-purple-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Header Section */}
      <header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-24 lg:right-24 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex cursor-pointer items-center select-none"
        >
          <span className="text-2xl md:text-3xl font-extrabold tracking-tighter">
            <span className="text-white">R</span>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              EZ
            </span>
            <span className="text-white">UME AI</span>
          </span>
          <SparklesIcon className="text-gray-400 ml-2 h-5 w-5 animate-pulse" />
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-6 items-center"
        >
          <div className="hidden md:flex gap-6 mr-4 text-sm font-medium text-zinc-400">
            <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer">How it Works</button>
            <button onClick={() => document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer">FAQs</button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              router.push("/dashboard");
            }}
            className="group relative px-5 py-2.5 rounded-full overflow-hidden bg-white text-black font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Dashboard
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.nav>
      </header>

      {/* Hero Section - Glassmorphism Style */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 pt-32 pb-20 text-center overflow-hidden">
        {/* Background Gradients for Glass Effect contrast */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-600/20 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
        
        {/* Glass Container */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
           className="relative z-10 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 max-w-5xl w-full mx-auto shadow-2xl flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 mb-8 tracking-widest uppercase shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-3 animate-pulse"></span>
            Rezume AI 2.0 is Live
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black mb-6 tracking-tighter leading-[1.05] max-w-4xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="block text-zinc-400 font-medium tracking-tight text-2xl sm:text-3xl md:text-4xl mb-3">You build the skills.</span>
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
              We build the resume.
            </span>
          </motion.h1>

          <motion.p
            className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create perfect, ATS-friendly resumes in seconds. Powered by intelligent algorithms to highlight your true potential and get you hired faster.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-auto hover:bg-zinc-200 cursor-pointer"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => {
                document.getElementById("app-preview")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-full text-base font-bold transition-all hover:bg-white/10 w-full sm:w-auto cursor-pointer"
            >
              See How it Works
            </button>
          </motion.div>
        </motion.div>
        
        {/* Animated Mouse Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-10 hidden md:block"
          onClick={() => {
            document.getElementById("app-preview")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="w-8 h-12 rounded-full border border-white/20 flex justify-center p-1 hover:border-white/50 transition-colors bg-black/20 backdrop-blur-md">
            <motion.div 
              animate={{ y: [0, 16, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
              className="w-1.5 h-3 bg-zinc-400 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* App Preview Section */}
      <motion.section
        id="app-preview"
        className="relative z-10 py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <motion.div
            className="max-w-6xl mx-auto rounded-2xl p-2 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center h-10 px-4 space-x-2 bg-black/40 border-b border-white/5 rounded-t-lg">
              <div className="w-3 h-3 bg-red-500/80 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 bg-yellow-400/80 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
              <div className="w-3 h-3 bg-green-500/80 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="bg-zinc-950 relative rounded-b-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
              <img
                src="/images/app-ss.jpg"
                alt="Rezume AI Dashboard Interface"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
              Intelligent Tools for <br/> Modern Professionals
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400/10 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-32 px-6 bg-black/40 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
              Three Steps to Success
            </h2>
            <p className="text-zinc-400 text-lg">Your perfect resume is just moments away.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line - desktop only */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-24 h-24 mb-6 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center relative z-10 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-zinc-100">{step.title}</h3>
                <p className="text-zinc-400 px-4">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
            Loved By Job Seekers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-left hover:border-purple-500/30 transition-colors flex flex-col h-full cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SparklesIcon className="h-6 w-6 text-purple-400/50 mb-6 shrink-0" />
                <p className="text-lg text-zinc-300 font-light leading-relaxed mb-8 grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 bg-purple-500/10">
                    <span className="text-white font-bold">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="relative z-10 py-32 px-6 bg-black/60 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100 mb-2">{faq.question}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-lg text-zinc-500 py-12 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tighter">REZUME AI</span>
            <SparklesIcon className="text-purple-400 h-4 w-4" />
          </div>
          <p className="text-sm">
            &copy; {currentYear} REZUME AI. All rights reserved.
          </p>
          <p className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Built By MK ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
