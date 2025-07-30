import React from 'react';
import { projects } from '../data';

const ProjectsWheel = ({ 
  currentProjectIndex, 
  setCurrentProjectIndex, 
  getBorderRadius 
}) => {
  const visibleProjects = [];
  const totalVisible = 5; // Show 2 above, current, 2 below
  const halfVisible = Math.floor(totalVisible / 2);
  
  for (let i = -halfVisible; i <= halfVisible; i++) {
    let index = currentProjectIndex + i;
    
    // Handle looping for the wheel display
    if (index < 0) {
      index = projects.length + index; // Wrap to end
    } else if (index >= projects.length) {
      index = index - projects.length; // Wrap to beginning
    }
    
    visibleProjects.push({ project: projects[index].name, originalIndex: index, offset: i });
  }
  
  return visibleProjects.map(({ project, originalIndex, offset }) => {
    let className = "text-center py-2 px-3 transition-all duration-500 cursor-pointer flex items-center justify-center min-w-[250px] max-w-[250px] relative group ";
    
    if (offset === 0) {
      // Current/center project
      className += `border border-white/80 font-medium opacity-100 text-base h-10 bg-white/10 shadow-lg shadow-white/20 ${getBorderRadius('button')}`;
    } else if (Math.abs(offset) === 1) {
      // Adjacent projects
      className += `opacity-70 text-sm h-8 hover:opacity-90 hover:bg-white/5 border border-white/20 ${getBorderRadius('button')}`;
    } else {
      // Outer projects
      className += `opacity-40 text-xs h-6 hover:opacity-60 border border-white/10 ${getBorderRadius('small')}`;
    }

    return (
      <div 
        key={`${originalIndex}-${offset}`} 
        className={className}
        onClick={() => {
          setCurrentProjectIndex(originalIndex);
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getBorderRadius('button')}`}></div>
        <span className="truncate relative z-10">{project}</span>
      </div>
    );
  });
};

export default ProjectsWheel;