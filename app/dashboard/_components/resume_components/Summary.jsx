import React from "react";

const Summary = ({ summaryData }) => {
  if (!summaryData?.trim()) return null;

  return (
    <div className="mt-2">
      <h2 className="font-semibold uppercase border-b-1 border-gray-500 mb-1 text-[11px] sm:text-[14px]">
        Summary
      </h2>
      <p className="text-[11px] sm:text-[14px] leading-snug">{summaryData}</p>
    </div>
  );
};

export default Summary;
