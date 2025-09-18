import React from "react";

const Achievements = ({ achievementsData }) => {
  return (
    <div>
      <div className="mt-2">
        {achievementsData?.some(
          (ach) => ach.title?.trim() || ach.description?.trim()
        ) && (
          <>
            <h2 className="font-semibold uppercase border-b-1 border-gray-500 mb-1 text-[11px] sm:text-[14px]">
              Achievements
            </h2>
          </>
        )}
        {achievementsData &&
          achievementsData.map((item, index) => {
            return (
              <div key={index}>
                <h1 className="text-[11px] sm:text-[14px] font-semibold">
                  {item.title}{" "}
                </h1>
                <div
                  className="text-[11px] sm:text-[14px] leading-snug mb-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof item.description === "string"
                        ? item.description.replace(
                            /<p>/g,
                            '<p style="margin:0;padding:0;line-height:1.4;">'
                          )
                        : "",
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Achievements;
