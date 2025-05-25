import React from "react";

const Summary = ({ summaryData }) => {
  if (!summaryData?.trim()) return null;

  return (
    <div className="mt-4">
      <h2 className="font-semibold uppercase text-sm sm:text-[15px]">
        Summary
      </h2>
      <hr className="border-[1px] mb-2 bg-black opacity-[0.7]" />{" "}
      <p className="text-[13px] sm:text-[14px] leading-snug">{summaryData}</p>
    </div>
  );
};

export default Summary;
