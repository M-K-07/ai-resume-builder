import {
  SparklesIcon,
  FileText,
  Download,
  BrainCircuit, 
  Eye,          
  FileDown,     
  ScanSearch,   
} from "lucide-react";
 export const EMPTY_RESUME_DATA = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
  },
  summary: "",
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  jobDescription: "",  
  jobTitle: "",        
  yearsOfExperience: "",
  technologiesKnown: "",
};

export const toolbarConfig = [
  [{ 'font': [] }],
  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'align': [] }],
  ['link', 'blockquote'],
  ['image'],
  ['clean']  ];

     export const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "circOut" } }, // Changed easing and duration
  };

  // Data for sections (previously in separate components)
   export const howItWorksSteps = [
    {
      icon: <SparklesIcon className="h-10 w-10 text-purple-400" />,
      title: "Input Your Info",
      description: "Provide your details, experience, and education.",
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-400" />,
      title: "AI Suggests Content",
      description: "Our AI helps you craft compelling descriptions.",
    },
    {
      icon: <Download className="h-10 w-10 text-green-400" />,
      title: "Download & Share",
      description: "Export your polished resume in minutes.",
    },
  ];

   export const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-purple-400" />,
      title: "AI-Powered Suggestions",
      description: "Leverage cutting-edge AI for intelligent content suggestions, ensuring every word counts.",
    },
    {
      icon: <ScanSearch className="h-10 w-10 text-blue-400" />, // Changed icon
      title: "ATS Optimized",
      description: "Craft resumes that are optimized for Applicant Tracking Systems, increasing your chances of getting noticed.",
    },
    {
      icon: <Eye className="h-10 w-10 text-green-400" />,
      title: "Real-time Preview",
      description: "Instantly see your changes with our live preview, ensuring your resume looks perfect.",
    },
    {
      icon: <FileDown className="h-10 w-10 text-orange-400" />,
      title: "Easy PDF Export",
      description: "Download your perfectly crafted resume in PDF format, ready to impress employers.",
    }
  ];

   export const testimonials = [
    {
      quote: "This AI Resume Builder saved me hours! The suggestions were spot on and helped me land interviews.",
      author: "Sarah J.",
      title: "Marketing Manager"
    },
    {
      quote: "Finally, a resume tool that is easy to use and produces professional results. Highly recommended!",
      author: "David L.",
      title: "Software Engineer"
    },
    {
      quote: "The dark theme is sleek, and the AI features are incredibly helpful. Great product!",
      author: "Emily R.",
      title: "Graphic Designer"
    },
  ];

   export const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Basic Resume Templates",
        "AI Suggestions (Limited)",
        "PDF Download",
        "Up to 1 Resume"
      ],
      buttonText: "Get Started",
      buttonLink: "/dashboard"
    },
    {
      name: "Pro",
      price: "$9/mo",
      features: [
        "All Basic Features",
        "Premium Templates",
        "Unlimited AI Suggestions",
        "Unlimited Resumes",
        "Priority Support"
      ],
      buttonText: "Upgrade Now",
      buttonLink: "#" // Link to a payment/upgrade page
    },
  ];

   export const faqs = [
    {
      question: "What is the AI Resume Builder?",
      answer: "It's a tool that helps you create professional resumes quickly using artificial intelligence to suggest content and improve descriptions."
    },
    {
      question: "Is it free to use?",
      answer: "We offer a free tier with basic features. Check our pricing section for details on premium features."
    },
    {
      question: "Can I download my resume?",
      answer: "Yes, you can download your resume in PDF format."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously and use industry-standard practices to protect your information."
    },
  ];