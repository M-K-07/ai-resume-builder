import React from "react";

const Projects = ({ projectsData }) => {
  return (
    <div>
      <div className="mt-3">
        {projectsData?.some(
          (proj) =>
            proj.projectName?.trim() ||
            proj.technologies?.trim() ||
            proj.description?.trim()
        ) && (
          <>
            <h2 className="font-semibold uppercase text-sm sm:text-[15px]">
              projects
            </h2>
            <hr className="border-[1px] mb-2 bg-black opacity-[0.7]" />{" "}
          </>
        )}
        {projectsData &&
          projectsData.map((item, index) => {
            return (
              <div key={index} className="mt-2">
                <h1 className="text-[13px] sm:text-[14px] font-semibold">
                  {item.projectName}{" "}
                  {item.technologies && ` | ${item.technologies}`}
                </h1>
                <div
                  className="ml-4 text-[14px] leading-[1.4] mb-1"
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

export default Projects;
