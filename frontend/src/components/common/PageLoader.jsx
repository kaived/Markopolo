import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[14000] flex items-center justify-center bg-[#020617]">
      <div className="relative flex flex-col items-center gap-8">
        {/* Nested Spinner Design */}
        <div className="relative flex items-center justify-center">
          {/* Outer Blue Spinner */}
          <div className="w-20 h-20 border-4 border-transparent border-t-[#007acc] animate-spin flex items-center justify-center rounded-full">
            {/* Inner Orange Spinner */}
            <div className="w-14 h-14 border-4 border-transparent border-t-[#ff8c42] animate-spin flex items-center justify-center rounded-full" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <span className="text-[12px] font-bold tracking-[0.3em] text-slate-400 animate-pulse font-sans">
            Loading content...
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
