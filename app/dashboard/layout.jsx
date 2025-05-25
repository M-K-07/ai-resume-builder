import React from "react";
import Navbar from "./_components/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-18 print:m-0">{children}</div>
    </div>
  );
};

export default layout;
