import React from 'react'

const Loading = () => {
  return (
    <div className="loader fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="absolute w-24 h-24 bg-white/5 blur-2xl rounded-full"></div>
        
        {/* Outer slow ring */}
        <div className="w-20 h-20 border-[3px] border-white/5 rounded-full animate-[spin_3s_linear_infinite]"></div>
        
        {/* Inner fast ring */}
        <div className="absolute w-12 h-12 border-[3px] border-transparent border-t-white/80 rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)] rounded-full animate-pulse"></div>
      </div>
      
      <p className="mt-8 text-xs tracking-[0.3em] font-medium text-white/50 animate-pulse uppercase">
        Loading
      </p>
    </div>
  )
}

export default Loading
