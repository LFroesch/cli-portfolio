import React from 'react';

const JumpToTop = ({ getBorderRadius }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={scrollToTop}
        className={`group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 ${getBorderRadius ? getBorderRadius('button') : 'rounded-md'}`}
        title="Jump to top"
      >
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-sm font-medium">Back to Top</span>
      </button>
    </div>
  );
};

export default JumpToTop;