import React from "react";

const Skills = ({ skillsData }) => {
  return (
    <div>
      <div className="mt-2">
        {skillsData?.some(
          (skill) => skill.title?.trim() || skill.skills?.trim()
        ) && (
          <>
            <h2 className="font-semibold uppercase text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
              skills
            </h2>
            <hr className="border-[1px] mb-1 bg-black opacity-[0.7]" />
          </>
        )}
        {skillsData.map((item, index) => {
          return (
            <div key={index} className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
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
