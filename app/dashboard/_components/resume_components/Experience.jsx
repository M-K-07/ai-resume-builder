import React from "react";

const Experience = ({ experienceData }) => {
  return (
    <div>
      <div className="mt-2">
        {experienceData.some(
          (exp) =>
            exp.endDate?.trim() ||
            exp.startDate?.trim() ||
            exp.location?.trim() ||
            exp.company?.trim() ||
            exp.role?.trim()
        ) && (
          <>
            <h2 className="font-semibold uppercase border-b-1 border-gray-500 mb-1 text-[11px] sm:text-[14px] ">
              Experience
            </h2>
          </>
        )}
        {experienceData.map((item, index) => {
          const currentDate = new Date();
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
                month: "long",
              });
            }
          }

          if (item.startDate && !item.endDate) {
            formattedEndDate = "Present";
          } else if (item.endDate) {
            const end = new Date(item.endDate);
            const endMarkerDate = new Date(end.getFullYear(), end.getMonth());
            const currentMarkerDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth()
            );

            if (endMarkerDate === currentMarkerDate) {
              formattedEndDate = "Present";
            } else if (endMarkerDate >= currentMarkerDate) {
              formattedEndDate = "";
            } else {
              formattedEndDate = end.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              });
            }
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
          if (item.role?.trim()) headerParts.push(item.role.trim());
          if (item.company?.trim()) headerParts.push(item.company.trim());
          if (item.location?.trim()) headerParts.push(item.location.trim());
          if (dateDisplayString.trim())
            headerParts.push(dateDisplayString.trim());

          return (
            <div key={index} className="mb-1">
              <h3 className="text-[11px] sm:text-[14px] font-semibold capitalize">
                {headerParts.join(" | ")}
              </h3>
              <div
                className="ml-4 text-[11px] sm:text-[14px] leading-snug"
                dangerouslySetInnerHTML={{
                  __html: item.description?.replace(
                    /<p>/g,
                    '<p style="margin:0;padding:0;line-height:1.4;">'
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
