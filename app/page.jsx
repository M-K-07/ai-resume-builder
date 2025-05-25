"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SparklesIcon, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"; // Import framer-motion
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

  // Animation variants for sections

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Header Section */}
      <header className="bg-black/70 backdrop-blur-lg flex justify-between items-center px-6 md:px-10 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-800">
        <div className="bg-clip-text text-transparent bg-gradient-to-r flex cursor-pointer items-center gap-2 from-white to-gray-400 text-2xl font-bold">
          SmartResume{" "}
          <SparklesIcon className="text-gray-400 h-6 w-6 md:h-7 md:w-7" />
        </div>
        <nav className="flex gap-3 md:gap-5 items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              router.push("/dashboard");
            }}
            className="px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md text-sm md:text-base transition-colors duration-200"
          >
            Dashboard
          </button>
        </nav>
      </header>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative flex flex-col lg:flex-row items-center justify-around lg:justify-around min-h-screen px-6 md:px-20 pt-32 pb-16 bg-black text-white overflow-hidden"
      >
        <div className="lg:w-1/2 text-center lg:text-left lg:pr-8 xl:pr-12 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-md font-medium text-gray-300 mb-4">
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              <span>Ai Powered Resume Builder</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight text-white"
          >
            Build Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              {" "}
              Resume
            </span>
            , Faster.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-md sm:text-lg text-zinc-400 max-w-md mx-auto lg:mx-0 mb-10"
          >
            Leverage the power of AI to create professional, ATS-friendly
            resumes that get noticed. Effortless, intelligent, and effective.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-md font-semibold text-white bg-gradient-to-r from-purple-900 to-blue-600 rounded-lg shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:shadow-purple-500/40  transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-px"

          >
            Get Started Free
          </motion.a>
        </div>
        <motion.div
          className="lg:w-5/12 xl:w-1/2 mt-12 lg:mt-0 z-10 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "circOut" }}
        >
          <img
            src="/images/image.jpg"
            alt="AI Resume Builder in action"
            className="rounded-xl shadow-2xl max-w-sm lg:max-w-md xl:max-w-lg border-2 border-zinc-700/50"
          />
        </motion.div>
      </motion.section>

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

      <motion.section
        id="how-it-works"
        className="py-24 px-6 bg-zinc-950 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-white">
            Resume Crafting, Simplified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_5px_rgba(168,85,247,0.15)]" // More subtle shadow
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
                <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full mb-6 inline-block border border-purple-500/30">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="py-24 px-6 bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-white">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-2xl flex flex-col border backdrop-blur-lg ${
                  plan.name === "Pro"
                    ? "bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-purple-500/50 shadow-2xl shadow-purple-500/25 ring-1 ring-purple-500/60"
                    : "bg-zinc-900/80 border-zinc-800 shadow-xl hover:border-zinc-700 transition-colors duration-300"
                }`}
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
                <h3
                  className={`text-2xl font-semibold mb-4 ${
                    plan.name === "Pro" ? "text-white" : "text-purple-400"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-4xl font-bold mb-8 ${
                    plan.name === "Pro" ? "text-white" : "text-white"
                  } tracking-tight`}
                >
                  {plan.price}
                </p>
                <ul className="text-left mb-10 flex-grow space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className={`flex items-center text-sm ${
                        plan.name === "Pro" ? "text-purple-100" : "text-zinc-300"
                      }`}
                    >
                      <CheckCircle
                        className={`h-5 w-5 mr-2.5 flex-shrink-0 ${
                          plan.name === "Pro"
                            ? "text-green-300"
                            : "text-green-400"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonLink}
                  className={`mt-6 block w-full px-6 py-3 rounded-lg font-medium text-center transition-all duration-300 ${
                    plan.name === "Pro"
                      ? "bg-white text-purple-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
                      : "bg-purple-600 text-white hover:bg-purple-500 shadow-md hover:shadow-lg"
                  }`}
                >
                  {plan.buttonText}
                </a>
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
              <SparklesIcon className="text-purple-400 h-5 w-5" /> SmartResume
            </Link>
          </div>
          <p className="mb-2 text-zinc-600">
            &copy; {currentYear} SmartResume. All rights reserved.
          </p>
          <p>Built with ❤️</p>
        </div>
      </footer>
    </>
  );
};

export default page;
