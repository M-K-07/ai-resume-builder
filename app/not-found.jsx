'use client';


import { useRouter } from 'next/navigation';

import React from 'react';

export default function NotFound() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-950 px-4">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-2xl bg-black/80 border border-zinc-800">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 text-center">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">
          Oops! Page Not Found
        </h2>
        <p className="text-zinc-400 text-center max-w-md mb-6">
          The page you are looking for doesn&apos;t exist or you don&apos;t have access.<br />
          Let&apos;s get you back to something awesome!
        </p>
        <button
          onClick={handleClick}
          className="px-6 cursor-pointer py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin mr-2"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg></span>
          ) : null}
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
