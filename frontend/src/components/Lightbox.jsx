import React from 'react';

const Lightbox = ({ 
  showLightbox, 
  lightboxImages, 
  lightboxImageIndex, 
  closeLightbox, 
  navigateLightbox 
}) => {
  if (!showLightbox || !lightboxImages.length) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Close button with ESC key styling */}
      <button
        onClick={closeLightbox}
        className="absolute top-6 right-6 px-3 py-2 bg-black/70 hover:bg-black/90 border border-red-400/40 hover:border-red-400/60 rounded-lg flex items-center gap-2 transition-all duration-300 z-10"
        title="Close (ESC)"
      >
        <div className="hidden lg:flex w-6 h-6 items-center justify-center bg-white/10 border border-white/30 rounded text-xs font-mono font-bold text-red-100">
          ESC
        </div>
        <span className="text-red-100 text-sm">Close</span>
      </button>
      
      {/* Image container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={lightboxImages[lightboxImageIndex]?.url}
          alt={lightboxImages[lightboxImageIndex]?.alt || `Image ${lightboxImageIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Navigation arrows with keyboard indicators */}
        {lightboxImages.length > 1 && (
          <>
            {/* Desktop version with keyboard indicators */}
            <button
              onClick={() => navigateLightbox(-1)}
              className="hidden lg:flex absolute left-6 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-black/70 hover:bg-black/90 border border-green-400/40 hover:border-green-400/60 rounded-lg items-center gap-2 transition-all duration-300"
              title="Previous image (←)"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white/10 border border-white/30 rounded text-sm font-mono font-bold">
                ←
              </div>
              <span className="text-green-100 text-sm">Previous</span>
            </button>
            <button
              onClick={() => navigateLightbox(1)}
              className="hidden lg:flex absolute right-6 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-black/70 hover:bg-black/90 border border-green-400/40 hover:border-green-400/60 rounded-lg items-center gap-2 transition-all duration-300"
              title="Next image (→)"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white/10 border border-white/30 rounded text-sm font-mono font-bold">
                →
              </div>
              <span className="text-green-100 text-sm">Next</span>
            </button>
            
            {/* Mobile version without keyboard indicators */}
            <button
              onClick={() => navigateLightbox(-1)}
              className="lg:hidden absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
              title="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigateLightbox(1)}
              className="lg:hidden absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
              title="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/70 text-white/90 text-sm rounded-full border border-white/20">
              {lightboxImageIndex + 1} / {lightboxImages.length}
            </div>
          </>
        )}
      </div>
      
      {/* Caption */}
      {lightboxImages[lightboxImageIndex]?.caption && (
        <div className="absolute bottom-6 right-6 max-w-md p-3 bg-black/70 text-white/80 text-sm rounded-lg border border-white/20">
          {lightboxImages[lightboxImageIndex].caption}
        </div>
      )}
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={closeLightbox}
      />
    </div>
  );
};

export default Lightbox;