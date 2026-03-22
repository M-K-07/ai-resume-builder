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

  const [editLoading, setEditLoading] = React.useState(false);
  const [downloadLoading, setDownloadLoading] = React.useState(false);

  const handleDownload = () => {
    setDownloadLoading(true);
    setTimeout(() => {
      window.print();
      setDownloadLoading(false);
    }, 300); // short delay for UX
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
      {editLoading && <Loading />}
      <div className="max-w-5xl print:m-0 mx-auto">
        <div
        id='no-print'
          className="flex  flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <Button
            onClick={() => {
              setEditLoading(true);
              router.push(`/dashboard/resume/${resumeId}`);
            }}
            variant="outline"
            className="w-full cursor-pointer sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-zinc-100 bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={editLoading || downloadLoading}
          >
            {editLoading ? (
              <span className="animate-spin mr-2"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
            ) : (
              <Edit size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
            )}
            Back to Edit
          </Button>
          <Button
            onClick={handleDownload}
            className="w-full cursor-pointer sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-bold text-black bg-white transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={downloadLoading || editLoading}
          >
            {downloadLoading ? (
              <span className="animate-spin mr-2"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
            ) : (
              <Download size={20} />
            )}
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
