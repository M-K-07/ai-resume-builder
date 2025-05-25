"use client";
import Resume from "../../../_components/Resume";
import { Button } from "../../../_components/ui/button";
import { Download, Edit } from "lucide-react";
import React, { useContext, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { ResumeContext } from "../../../../context/ResumeContext";
import { useRouter, useParams } from "next/navigation";
import Loading from "../../../_components/Loading";

const PreviewPage = () => {
  const { resumeData, loading, setLoading } = useContext(ResumeContext);
  const router = useRouter();
  const params = useParams();
  const resumeId = params.resume_id;

  // const handleDownload = async () => {
  //   const resumeElement = document.getElementById("actual-resume-content"); // Target the A4 paper div

  //   if (!resumeElement) {
  //     console.error(
  //       "Resume element with ID 'actual-resume-content' not found!"
  //     );
  //     alert("Could not find resume content to download."); // User-friendly alert
  //     return;
  //   }

  //   const canvas = await html2canvas(resumeElement, {
  //     scale: 2, // Increased scale for better quality (was 1.5)
  //     useCORS: true, // For external images, if any
  //     logging: false,
  //     backgroundColor: "#ffffff", // Ensure a white background for JPEG output
  //   });

  //   // Convert canvas to JPEG data URL with specified quality (0-1)
  //   // Adjusted quality slightly to balance size and quality with the increased scale
  //   const imgData = canvas.toDataURL("image/jpeg", 0.98); // Using JPEG with 88% quality

  //   const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const imgHeight = (imgProps.height * pdfWidth) / imgProps.width; // Calculate image height based on PDF width

  //   const pdfImageActualHeight = Math.min(imgHeight, pdfHeight); // Actual height of the image on PDF

  //   // Basic single-page implementation. For multi-page, this needs more logic.
  //   pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfImageActualHeight); // Specify format as JPEG

  //   const filename =
  //     resumeData?.personalDetails?.firstName &&
  //     resumeData?.personalDetails?.lastName
  //       ? `${resumeData.personalDetails.firstName}_${resumeData.personalDetails.lastName}_Resume.pdf`
  //       : "Resume.pdf";

  //   // Add links to the PDF
  //   // This needs to happen *after* the image is added and we know its dimensions on the PDF
  //   const links = resumeElement.querySelectorAll("a");
  //   const resumeElementRect = resumeElement.getBoundingClientRect(); // Get dimensions of the source HTML element

  //   links.forEach((link) => {
  //     const href = link.getAttribute("href");
  //     // Only process valid http, https, or mailto links
  //     if (href && (href.startsWith("http") || href.startsWith("mailto:"))) {
  //       const linkRect = link.getBoundingClientRect();

  //       // Calculate link position and size relative to the resumeElement (in pixels)
  //       const htmlX_px = linkRect.left - resumeElementRect.left;
  //       const htmlY_px = linkRect.top - resumeElementRect.top;
  //       const htmlW_px = linkRect.width;
  //       const htmlH_px = linkRect.height;

  //       // Convert HTML pixel coordinates to PDF mm coordinates
  //       // resumeElement.offsetWidth/Height are the original dimensions of the HTML element rendered by html2canvas (before its internal scaling)
  //       // pdfWidth and pdfImageActualHeight are the dimensions of the image on the PDF page in mm
  //       const pdfLinkX = (htmlX_px / resumeElement.offsetWidth) * pdfWidth;
  //       const pdfLinkY =
  //         (htmlY_px / resumeElement.offsetHeight) * pdfImageActualHeight;
  //       const pdfLinkWidth = (htmlW_px / resumeElement.offsetWidth) * pdfWidth;
  //       const pdfLinkHeight =
  //         (htmlH_px / resumeElement.offsetHeight) * pdfImageActualHeight;

  //       // Add the link to the PDF if it has valid dimensions
  //       if (
  //         pdfLinkWidth > 0 &&
  //         pdfLinkHeight > 0 &&
  //         pdfLinkY + pdfLinkHeight <= pdfImageActualHeight
  //       ) {
  //         pdf.link(pdfLinkX, pdfLinkY, pdfLinkWidth, pdfLinkHeight, {
  //           url: href,
  //         });
  //       }
  //     }
  //   });

  //   pdf.save(filename);
  // };

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
