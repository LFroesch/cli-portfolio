import React, { useState, useEffect } from 'react';

const TypingEffect = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '',
  cursor = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span className={'inline-block w-0.5 h-5 ml-1 bg-transparent'}>
          |
        </span>
      )}
    </span>
  );
};

export default TypingEffect;