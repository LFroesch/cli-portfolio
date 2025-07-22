import React, { useMemo } from 'react';

const StarfieldBackground = () => {
  // Memoize all background elements so they only calculate once
  const backgroundElements = useMemo(() => {
    const elements = {};
    
    // Generate stars (only calculated once)
    elements.stars = Array.from({ length: 80 }, (_, i) => {
      const x = (i * 37 + 13) % 100;
      const y = (i * 71 + 29) % 100;
      const size = 0.5 + ((i * 11) % 3) * 0.3;
      const baseOpacity = 0.1 + ((i * 7) % 4) * 0.1;
      
      return (
        <div
          key={`star-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: baseOpacity
          }}
        />
      );
    });

    // Generate floating particles (only calculated once)
    elements.particles = Array.from({ length: 8 }, (_, i) => {
      const x = (i * 41 + 17) % 100;
      const y = (i * 83 + 31) % 100;
      const size = 1 + ((i * 3) % 2);
      
      return (
        <div
          key={`particle-${i}`}
          className="absolute bg-white rounded-full animate-float-subtle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${i * 3}s`,
            animationDuration: '20s'
          }}
        />
      );
    });

    return elements;
  }, []); // Empty dependency array - only runs once!

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/10 via-purple-950/5 to-black"></div>
      
      {/* Static star field */}
      <div className="absolute inset-0">
        {backgroundElements.stars}
      </div>

      {/* Static nebula clouds - very subtle */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '15%',
            top: '20%',
            width: '300px',
            height: '150px',
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '60%',
            top: '40%',
            width: '200px',
            height: '100px',
            background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.2) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '30%',
            top: '70%',
            width: '250px',
            height: '120px',
            background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Minimal floating particles - very subtle */}
      <div className="absolute inset-0 opacity-10">
        {backgroundElements.particles}
      </div>

      {/* Deep space vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50"></div>
    </div>
  );
};

export default StarfieldBackground;