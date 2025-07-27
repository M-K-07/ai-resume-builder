import React from "react";

const Skills = ({ skillsData }) => {
  return (
    <div>
      <div className="mt-2">
        {skillsData?.some(
          (skill) => skill.title?.trim() || skill.skills?.trim()
        ) && (
          <>
            <h2 className="font-semibold border-b-1 border-gray-500 mb-1 uppercase text-[11px] sm:text-[14px]">
              skills
            </h2>
          </>
        )}
        {skillsData.map((item, index) => {
          return (
            <div key={index} className="text-[11px] sm:text-[14px]">
              <span className="font-bold">{item.title}</span>
              {item.skills && <span>: {item.skills}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
