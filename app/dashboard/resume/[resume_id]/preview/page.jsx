"use client";
import Resume from "../../../_components/Resume";
import { Button } from "../../../_components/ui/button";
import { Download, Edit } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";
import { useRouter, useParams } from "next/navigation";
import Loading from "../../../_components/Loading";

const PreviewPage = () => {
  const { resumeData, loading, setLoading } = useContext(ResumeContext);
  const router = useRouter();
  const params = useParams();
  const resumeId = params.resume_id;

  const handleDownload = () => {
    window.print();
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen  text-white print:p-0 print:m-0 print:min-h-0 pt-8 pb-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl print:m-0 mx-auto">
        <div
        id='no-print'
          className="flex  flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <Button
            onClick={() => {
              setLoading(true);
              router.push(`/dashboard/resume/${resumeId}`);
              setLoading(false);
            }}
            variant="outline"
            className="w-full  sm:w-auto bg-transparent hover:bg-purple-600/20 border-purple-500 text-purple-400 hover:text-purple-300 font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-px flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit size={18} />
            Back to Edit
          </Button>
          <Button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={20} />
            Download PDF
          </Button>
        </div>

        <div
          id="print-resume"
          className="resume print:bg-white print:shadow-none print:p-0 print:m-0 w-full mx-auto max-w-[794px]" 
        >
          <Resume />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
