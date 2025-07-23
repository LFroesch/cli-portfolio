import React, { useState, useEffect } from 'react';

const PaperPlanes = () => {
  const [planes, setPlanes] = useState([]);

  const createPlane = () => {
    const direction = Math.random() * Math.PI * 2;
    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: (direction * 180 / Math.PI) + 45, // Point in direction of travel
      scale: 0.5 + Math.random() * 0.3, // Random size between 0.5 and 0.8
      speed: 1 + Math.random() * 3, // Much faster forward speed (1-4 pixels per frame)
      direction: direction,
      turnTimer: 0,
      nextTurn: 60 + Math.random() * 120, // Turn every 3-9 seconds (at 20fps)
      opacity: 0.5 + Math.random() * 0.3, // Random opacity between 0.5 and 0.8
    };
  };

  useEffect(() => {
    // Initialize 15 planes
    const initialPlanes = Array.from({ length: 15 }, createPlane);
    setPlanes(initialPlanes);

    const animationFrame = () => {
      setPlanes(prevPlanes => 
        prevPlanes.map(plane => {
          let newDirection = plane.direction;
          let newTurnTimer = plane.turnTimer + 1;
          let newNextTurn = plane.nextTurn;
          
          // Occasional gentle turns (like catching air currents)
          if (newTurnTimer >= plane.nextTurn) {
            newDirection += (Math.random() - 0.5) * 0.8; // Gentle turn up to ~23 degrees
            newTurnTimer = 0;
            newNextTurn = 60 + Math.random() * 180; // Next turn in 3-9 seconds
          }
          
          // Small random wobbles (like air turbulence)
          newDirection += (Math.random() - 0.5) * 0.02;
          
          // Forward motion based on direction
          const deltaX = Math.cos(newDirection) * plane.speed;
          const deltaY = Math.sin(newDirection) * plane.speed;
          
          let newX = plane.x + deltaX;
          let newY = plane.y + deltaY;
          
          // Wrap around screen edges with some randomness for re-entry
          if (newX < -100) {
            newX = window.innerWidth + 100;
            newY = Math.random() * window.innerHeight;
            newDirection = Math.random() * Math.PI * 2;
          } else if (newX > window.innerWidth + 100) {
            newX = -100;
            newY = Math.random() * window.innerHeight;
            newDirection = Math.random() * Math.PI * 2;
          }
          
          if (newY < -100) {
            newY = window.innerHeight + 100;
            newX = Math.random() * window.innerWidth;
            newDirection = Math.random() * Math.PI * 2;
          } else if (newY > window.innerHeight + 100) {
            newY = -100;
            newX = Math.random() * window.innerWidth;
            newDirection = Math.random() * Math.PI * 2;
          }
          
          return {
            ...plane,
            x: newX,
            y: newY,
            direction: newDirection,
            turnTimer: newTurnTimer,
            nextTurn: newNextTurn,
            rotation: (newDirection * 180 / Math.PI) + 45, // Always point in direction of travel
          };
        })
      );
    };

    const interval = setInterval(animationFrame, 30); // 30 FPS for smooth but not too intensive animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {planes.map((plane) => (
        <div
          key={plane.id}
          className="absolute transition-transform duration-1000 ease-linear"
          style={{
            left: `${plane.x}px`,
            top: `${plane.y}px`,
            transform: `rotate(${plane.rotation}deg) scale(${plane.scale})`,
            opacity: plane.opacity,
          }}
        >
          <img
            src="/general_icons/paper-plane.svg"
            alt=""
            className="w-8 h-8 filter brightness-0 invert opacity-40"
            style={{
              filter: 'brightness(0) invert(1) opacity(0.4)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PaperPlanes;