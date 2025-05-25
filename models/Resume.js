import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  experienceSummary: {
    type:String,
    default:"",
  },
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  startDate: String,
  endDate: String,
  location: String,
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  title: String,
  skills: String,
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  projectName: String,
  technologies: String,
  description: String,
  projectSummary: {
    type:String,
    default:"",
  },
}, { _id: false })
const ResumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  resume_name: {
    type: String,
    default: 'Untitled'
  },
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedIn: String,
    github: String
  },

  summary: {
    type: String,
  },

  jobDescription: {
    type: String,
    default:""
  },
  jobTitle: {
    type: String,
    default:""
  },
  yearsOfExperience: {
    type: String,
    default:""
  },
  technologiesKnown: {
    type: String,
    default:""
  },
  workExperience: {
    type: [ExperienceSchema],
    default: [],
  },

  education: {
    type: [EducationSchema],
    default: [],
  },

  projects: {
    type: [ProjectSchema],
    default: [],
  },

  skills: {
    type: [SkillSchema],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
