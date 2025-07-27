import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

const Projects = ({ projectsData }) => {
  return (
    <div>
      <div className="mt-2">
        {projectsData?.some(
          (proj) =>
            proj.projectName?.trim() ||
            proj.technologies?.trim() ||
            proj.description?.trim()
        ) && (
          <>
            <h2 className="font-semibold uppercase border-b-1 border-gray-500 mb-1 text-[11px] sm:text-[14px]">
              projects
            </h2>
          </>
        )}
        {projectsData &&
          projectsData.map((item, index) => {
            return (
              <div key={index}>
                <h1 className="text-[11px] sm:text-[14px] font-semibold">
                  {item.projectName}{" "}
                  {item.technologies && ` | ${item.technologies}`}
                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 mx-1 hover:underline"
                    >
                     {'  '} Preview <SquareArrowOutUpRight className="w-3 h-3 inline-block " />
                    </a>
                  )}
                  {item.sourceCodeUrl && (
                    <a
                      href={item.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 mx-1 hover:underline"
                    >
                     {'  '} Source Code <SquareArrowOutUpRight className="w-3 h-3 inline-block" />
                    </a>
                  )}
                </h1>
                <div
                  className="ml-4 text-[11px] sm:text-[14px] leading-snug mb-2"
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
