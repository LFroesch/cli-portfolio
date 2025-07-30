import React, { useMemo } from 'react';

const StarfieldBackground = () => {
  // Memoize all background elements so they only calculate once
  const backgroundElements = useMemo(() => {
    const elements = {};
    
    // Generate stars (only calculated once)
    elements.stars = Array.from({ length: 80 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 0.5 + Math.random() * 0.9;
      const baseOpacity = 0.15 + Math.random() * 0.4;
      
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
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 1 + Math.random() * 2;
      
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
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/15 via-purple-950/8 to-black"></div>
      
      {/* Static star field */}
      <div className="absolute inset-0">
        {backgroundElements.stars}
      </div>

      {/* Static nebula clouds - very subtle */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '15%',
            top: '20%',
            width: '300px',
            height: '150px',
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '60%',
            top: '40%',
            width: '200px',
            height: '100px',
            background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '30%',
            top: '70%',
            width: '250px',
            height: '120px',
            background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.25) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Minimal floating particles - very subtle */}
      <div className="absolute inset-0 opacity-15">
        {backgroundElements.particles}
      </div>

      {/* Deep space vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30"></div>
    </div>
  );
};

export default StarfieldBackground;