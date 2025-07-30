import React from 'react';

const CollapsibleSection = ({ 
  sectionKey, 
  collapsedSections, 
  toggleSection, 
  title, 
  children, 
  className = "mb-8" 
}) => {
  const isCollapsed = collapsedSections[sectionKey];
  
  return (
    <div>
      <button
        onClick={() => toggleSection(sectionKey)}
        className={`w-full group flex items-center gap-4 hover:bg-white/5 p-3 rounded-lg transition-all duration-300 ${className}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${isCollapsed ? 'bg-white/20' : ''}`}>
          <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
          {title}
        </h3>
      </button>
      {!isCollapsed && (
        <div className="animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;