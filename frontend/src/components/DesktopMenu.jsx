import React from 'react';
import { sections, projects } from '../data';
import ProjectsWheel from './ProjectsWheel';

const DesktopMenu = ({ 
  currentSection,
  setCurrentSection,
  trackSectionView,
  currentProjectIndex,
  setCurrentProjectIndex,
  navigateProjectsWithLoading,
  isScrolledIntoProject,
  getBorderRadius
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center gap-4 h-16 relative group">
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 ${getBorderRadius()}`}></div>
      
      {/* Left/Right section navigation indicators - Desktop only, hidden when in keyboard navigation mode */}
      {!isScrolledIntoProject && (
        <div className="hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -left-24">
          <div className="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/30 rounded text-sm font-mono font-bold">
            ←
          </div>
          <div className="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/30 rounded text-sm font-mono font-bold">
            →
          </div>
        </div>
      )}
      
      {/* Up/Down project navigation indicators - Desktop only */}
      {currentSection === 'projects' && (
        <div className="hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -right-24">
          {/* Project Navigation (always visible) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateProjectsWithLoading(-1)}
              className={`p-2 border transition-all duration-300 ${getBorderRadius('button')} ${
                isScrolledIntoProject 
                  ? 'border-green-400/40 hover:bg-green-500/10 hover:border-green-400/60' 
                  : 'border-white/40 hover:bg-white/10 hover:border-white/60'
              }`}
              title="Previous project (↑)"
            >
              {isScrolledIntoProject ? (
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              )}
            </button>
            <button
              onClick={() => navigateProjectsWithLoading(1)}
              className={`p-2 border transition-all duration-300 ${getBorderRadius('button')} ${
                isScrolledIntoProject 
                  ? 'border-green-400/40 hover:bg-green-500/10 hover:border-green-400/60' 
                  : 'border-white/40 hover:bg-white/10 hover:border-white/60'
              }`}
              title="Next project (↓)"
            >
              {isScrolledIntoProject ? (
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Menu Items */}
      {sections.map((section) => (
        <React.Fragment key={section}>
          {section === 'projects' && currentSection === 'projects' ? (
            <div className="flex flex-col items-center justify-center gap-1 min-w-[200px] h-16 relative">
              <ProjectsWheel 
                currentProjectIndex={currentProjectIndex}
                setCurrentProjectIndex={setCurrentProjectIndex}
                getBorderRadius={getBorderRadius}
              />
            </div>
          ) : (
            <div 
              className={`relative text-lg font-light tracking-wider py-3 px-4 transition-all duration-500 cursor-pointer border min-w-[120px] text-center group ${getBorderRadius('button')} ${
                currentSection === section 
                  ? 'border-white/80 bg-white/10 text-white shadow-lg shadow-white/20' 
                  : 'border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5'
              }`}
              onClick={() => {
                setCurrentSection(section);
                trackSectionView(section);
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getBorderRadius('button')}`}></div>
              <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DesktopMenu;