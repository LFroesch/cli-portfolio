import React from 'react';

const FloatingButtons = ({ 
  showFloatingButtons, 
  showLightbox,
  setCurrentSection, 
  trackSectionView, 
  getBorderRadius 
}) => {
  // Hide floating buttons when lightbox is open
  if (!showFloatingButtons || showLightbox) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Chat Bubble Button */}
      <button
        onClick={() => {
          setCurrentSection('contact');
          trackSectionView('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`group w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-400/50 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 ${getBorderRadius('button')}`}
        title="Contact Me"
      >
        <svg className="w-6 h-6 text-blue-300 group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-8 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.418-8 8-8s8 3.582 8 8z" />
        </svg>
      </button>
      
      {/* Jump to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`group w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400/50 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 ${getBorderRadius('button')}`}
        title="Back to Top"
      >
        <svg 
          className="w-6 h-6 text-green-300 group-hover:text-green-200 transition-all duration-300 group-hover:-translate-y-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;