import React from 'react'

const Loading = () => {
  return (
    <div className="loader fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <p className="mt-4 text-lg font-semibold text-white">Loading...</p>
    </div>
  )
}

export default Loading
