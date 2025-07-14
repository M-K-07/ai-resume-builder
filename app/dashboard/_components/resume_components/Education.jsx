import React from "react";

const Education = ({ educationData }) => {
  const currentDate = new Date();

  return (
    <div>
        <div className="mt-3">
        {educationData.some(
          (edu) =>
            edu.cgpa ||
            edu.institution?.trim() ||
            edu.degree?.trim() ||
            edu.startDate?.trim() || // Corrected to use actual field names
            edu.endDate?.trim() // Corrected to use actual field names
        ) && (
          <>
            <h2 className="font-semibold uppercase text-sm sm:text-[15px]">
              Education
            </h2>
            <hr className="border-[1px] mb-1 bg-black opacity-[0.7]" />
          </>
        )}
        {educationData.map((item, index) => {
          let formattedStartDate = "";
          let formattedEndDate = "";

          if (item.startDate) {
            const start = new Date(item.startDate);
            const isStartInCurrentMonthAndYear =
              start.getFullYear() >= currentDate.getFullYear() &&
              start.getMonth() >= currentDate.getMonth();

            if (!isStartInCurrentMonthAndYear) {
              formattedStartDate = start.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              });
            } else {
              formattedStartDate = "invalid";
            }
          }

          if (item.startDate && !item.endDate) {
            formattedEndDate = "Present";
          } else if (item.endDate) {
            const end = new Date(item.endDate);
            formattedEndDate = end.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            });
          }

          let dateDisplayString = "";
          if (formattedStartDate && formattedEndDate) {
            dateDisplayString = `${formattedStartDate} - ${formattedEndDate}`;
          } else if (formattedStartDate) {
            dateDisplayString = formattedStartDate;
          } else if (formattedEndDate) {
            dateDisplayString = formattedEndDate;
          }

          const headerParts = [];
          if (item.institution?.trim())
            headerParts.push(item.institution.trim());
          if (item.location?.trim()) headerParts.push(item.location.trim());
          if (item.cgpa) {
            const isOngoing =
              new Date(item.endDate) > currentDate;
            headerParts.push(
              `CGPA: ${item.cgpa} / 10${isOngoing ? " (as of last semester)	" : ""}`
            );
          }

          return (
            <div key={index} className="mb-1 ">
              <h3 className="text-[11px] sm:text-[14px] font-bold capitalize">
                {item.degree.trim()} {dateDisplayString.trim() && `| ${dateDisplayString.trim()}`}
              </h3>
              <h4 className="text-[11px] sm:text-[14px] capitalize">{headerParts.join(" | ")}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
