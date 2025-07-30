import React from 'react';
import AboutSection from './AboutSection';
// Note: We would import other section components here when they're created

const ContentRenderer = ({ 
  currentSection,
  // About props
  collapsedSections,
  toggleSection,
  getBorderRadius,
  // ... other props that would be needed for different sections
}) => {
  switch(currentSection) {
    case 'about':
      return (
        <AboutSection 
          collapsedSections={collapsedSections}
          toggleSection={toggleSection}
          getBorderRadius={getBorderRadius}
        />
      );
    
    // For now, return null for other sections - they would be implemented here
    default:
      return null;
  }
};

export default ContentRenderer;