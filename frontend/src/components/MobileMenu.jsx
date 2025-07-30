import React from 'react';
import { sections, projects } from '../data';

const MobileMenu = ({ 
  currentSection,
  setCurrentSection, 
  showMobileMenu, 
  setShowMobileMenu,
  trackSectionView,
  currentProjectIndex,
  navigateProjectsWithLoading
}) => {
  return (
    <div className="lg:hidden flex flex-col items-center">
      {/* Mobile Nav Button */}
      <button 
        className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-4 hover:bg-white/20 transition-all relative"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span className="text-white font-medium">{sections[currentSection]}</span>
        <div className={`w-4 h-4 border-l-2 border-b-2 border-white/60 transform transition-transform ${showMobileMenu ? 'rotate-135' : '-rotate-45'} relative top-[-2px] left-[-4px]`}></div>
      </button>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="w-full max-w-sm bg-black/80 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
          {sections.map((section) => (
            <button
              key={section}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                currentSection === section 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => {
                setCurrentSection(section);
                setShowMobileMenu(false);
                trackSectionView(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      )}
      
      {/* Mobile Projects Navigation */}
      {currentSection === 'projects' && (
        <div className="flex items-center gap-4 mt-4">
          <button 
            className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all"
            onClick={() => navigateProjectsWithLoading(-1)}
          >
            <div className="w-4 h-4 border-l-2 border-t-2 border-white/60 transform -rotate-45"></div>
          </button>
          <span className="text-white/70 text-sm">
            {currentProjectIndex + 1} / {projects.length}
          </span>
          <button 
            className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all"
            onClick={() => navigateProjectsWithLoading(1)}
          >
            <div className="w-4 h-4 border-r-2 border-t-2 border-white/60 transform rotate-45"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;