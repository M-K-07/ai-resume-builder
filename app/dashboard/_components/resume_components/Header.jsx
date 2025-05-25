import React from "react";

const Header = ({ headerData }) => {
  return (
    <div className="mb-4">
      <div className="text-center">
        <h1 className="text-[20px] sm:text-[24px] md:text-[28px] m-0 p-0 font-bold uppercase leading-tight">
          {headerData.firstName || " "} {headerData.lastName || " "}
        </h1>
        <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mt-1 leading-snug">
          {headerData.phone}

          {headerData.email && (
            <>
              {" | "}
              <a
                href={`mailto:${headerData.email}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {headerData.email}
              </a>
            </>
          )}

          {headerData.linkedIn && (
            <>
              {" | "}
              <a
                href={headerData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                LinkedIn
              </a>
            </>
          )}

          {headerData.github && (
            <>
              {" | "}
              <a
                href={headerData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Github
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Header;
