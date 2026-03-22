import React from "react";
import Navbar from "./_components/Navbar";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 overflow-x-hidden font-sans selection:bg-purple-500/30">
      {/* Background Gradients for Glass Effect contrast */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>
      
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-8 print:p-0 print:m-0 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default layout;
