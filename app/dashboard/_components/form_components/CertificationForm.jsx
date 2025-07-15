"use client";
import { ArrowLeft, Eye } from "lucide-react";
import React, { useState, useContext, useEffect, use } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CertificationForm = () => {
  const { resumeData, setResumeData, submitResumeData, loading, setLoading } =
    useContext(ResumeContext);
  const params = useParams();

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const certList = {
    CertificateName: '',
    IssuingOrganization: '',
    CredentialUrl: '',
  };
  const [certificationsList, setCertificationsList] = useState([certList]);
  useEffect(() => {
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      setCertificationsList(resumeData.certifications);
    }
  }, []);
  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updated = [...certificationsList];
    updated[index][name] = value;
    setCertificationsList(updated);
  };
  const handleAddCertBlock = () => {
    setCertificationsList([...certificationsList, certList]);
  };
  const handleRemoveCertBlock = (index) => {
    if (certificationsList.length > 1) {
      const updated = [...certificationsList];
      updated.splice(index, 1);
      setCertificationsList(updated);
      toast.success("Certification block removed successfully!");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    submitResumeData(params.resume_id);
    toast.success("Certification details saved successfully!", { style: { background: '#22c55e', color: '#fff' } });
  }

  useEffect(() => { 
    setResumeData((prevData) => ({
      ...prevData,
      certifications: certificationsList,
    }));
  }, [certificationsList, setResumeData]);

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <div className="rounded-[22px] px-2 py-2 sm:px-4 sm:py-3 dark:bg-zinc-900">
        <div className="flex sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer text-white w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setActiveTab("skills")}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-zinc-100">
            Certifications
          </h1>
        </div>

        {certificationsList.map((item, index) => (
          <div
            key={index}
            className="my-4 sm:my-5 grid text-white gap-3 sm:gap-4 rounded-2xl p-3 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/50 hover:ring-zinc-500/80 transition duration-300 ease-in-out"
          >
            <div className="mb-1">
              <label className="block mb-1 text-xs sm:text-sm">
                Certification Name:
              </label>
              <input
                type="text"
                name="CertificateName"
                placeholder="e.g., AWS Certified Solutions Architect"
                value={item.CertificateName}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg p-2 text-xs sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-xs sm:text-sm">
                Issuing Organization:
              </label>
              <input
                type="text"
                rows={3}
                name="IssuingOrganization"
                placeholder="e.g., Amazon Web Services"
                value={item.IssuingOrganization}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full border border-zinc-600 rounded-lg p-2 bg-zinc-800 text-xs sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-xs sm:text-sm">
                Credential URL: 
              </label>
              <input
                type="text"
                name="CredentialUrl"
                placeholder="https://example.com/credential"
                value={item.CredentialUrl}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full border border-zinc-600 rounded-lg p-2 bg-zinc-800 text-xs sm:text-sm"
              />
            </div>

            {certificationsList.length > 1 && (
              <button
                onClick={() => handleRemoveCertBlock(index)}
                className="bg-white mt-3 font-semibold text-xs sm:text-sm border-2 cursor-pointer text-black w-fit p-2 rounded-xl hover:text-white hover:bg-transparent hover:border-white  hover:border-2 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mt-3 sm:mt-4">
          <button
            onClick={handleAddCertBlock}
            className="border-2 bg-transparent p-2 rounded-xl border-white hover:bg-white transition duration-300 ease-in-out hover:text-black cursor-pointer text-xs sm:text-sm"
          >
            Add Certification
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md cursor-pointer hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationForm;
