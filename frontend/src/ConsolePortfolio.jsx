import React, { useState, useEffect } from 'react'
import { personalInfo, sections, projects, contentData } from './data'
import StarfieldBackground from './StarfieldBackground'
import { useStats } from './useStats'
import './animations.css'

function ConsolePortfolio() {
  const [currentSection, setCurrentSection] = useState('projects');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(2);
  const [designVariant] = useState('rounded'); // 'rounded' or 'sharp'
  
  // Stats tracking
  const { 
    stats, 
    trackProjectView, 
    trackSectionView, 
    resetStats, 
    getTopProjects, 
    getTopSections,
    getTotalProjectViews,
    getTotalSectionViews 
  } = useStats();

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          navigateMenu(-1);
          break;
        case 'ArrowRight':
          navigateMenu(1);
          break;
        case 'ArrowUp':
          if (currentSection === 'projects') {
            navigateProjects(-1);
          }
          break;
        case 'ArrowDown':
          if (currentSection === 'projects') {
            navigateProjects(1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, currentProjectIndex]);

  // Helper function to get border radius classes based on variant
  const getBorderRadius = (element = 'default') => {
    if (designVariant === 'rounded') {
      switch (element) {
        case 'card': return 'rounded-xl';
        case 'button': return 'rounded-md';
        case 'small': return 'rounded-sm';
        default: return 'rounded-lg';
      }
    }
    return ''; // Sharp edges - no border radius
  };

  const navigateMenu = (direction) => {
    const currentIndex = sections.indexOf(currentSection);
    const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    const newSection = sections[newIndex];
    setCurrentSection(newSection);
    trackSectionView(newSection);
  };

  const navigateProjects = (direction) => {
    setCurrentProjectIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = projects.length - 1; // Loop to end
      } else if (newIndex >= projects.length) {
        newIndex = 0; // Loop to beginning
      }
      trackProjectView(projects[newIndex].name);
      return newIndex;
    });
  };

  const renderProjectsWheel = () => {
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
      let className = "text-center py-2 px-3 transition-all duration-500 cursor-pointer flex items-center justify-center min-w-[180px] relative group ";
      
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
            trackProjectView(projects[originalIndex].name);
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getBorderRadius('button')}`}></div>
          <span className="truncate relative z-10">{project}</span>
        </div>
      );
    });
  };

  const renderContent = () => {
    const currentProject = projects[currentProjectIndex];
    
    switch(currentSection) {
      case 'about':
        return (
          <div className="w-full max-w-3xl mx-auto text-center">
            {contentData.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 text-2xl opacity-90 leading-relaxed text-left">
                {paragraph}
              </p>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contentData.skills.categories.map((category, index) => (
                <div key={index} className="text-left">
                  <h3 className="mb-3 font-medium text-center border-b border-white/20 pb-2">{category.name}</h3>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {category.items.map((item, itemIndex) => (
                      <span 
                        key={itemIndex} 
                        className={`px-2 py-1 bg-white/10 border border-white/20 opacity-80 hover:opacity-100 transition-opacity duration-200 ${getBorderRadius('small')}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'projects': {
        const renderProjectMedia = () => {
          if (!currentProject.media) return null;
          
          const { type, url, poster } = currentProject.media;
          
          switch (type) {
            case 'video':
              return (
                <div className={`mb-6 overflow-hidden border border-white/20 ${getBorderRadius('card')}`}>
                  <video
                    className="w-full h-auto max-h-80 object-cover"
                    controls
                    muted
                    loop
                    poster={poster}
                    preload="metadata"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            case 'gif':
              return (
                <div className={`mb-6 overflow-hidden border border-white/20 ${getBorderRadius('card')}`}>
                  <img
                    src={url}
                    alt={`${currentProject.name} demo`}
                    className="w-full h-auto max-h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              );
            case 'image':
              return (
                <div className={`mb-6 overflow-hidden border border-white/20 ${getBorderRadius('card')}`}>
                  <img
                    src={url}
                    alt={`${currentProject.name} screenshot`}
                    className="w-full h-auto max-h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              );
            default:
              return null;
          }
        };

        return (
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Project Name */}
            <h2 className="text-4xl mb-6 text-center">{currentProject.name}</h2>
            
            {/* Project Media */}
            {renderProjectMedia()}
            
            {/* Project Description */}
            <div className="mb-6">
              <p className="text-2xl opacity-90 leading-relaxed">
                {currentProject.description}
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2">
                {currentProject.techStack.split(', ').map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 bg-white/10 border border-white/20 text-xs opacity-90 hover:opacity-100 transition-opacity duration-200 ${getBorderRadius('small')}`}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-x-4">
              <a 
                href={currentProject.liveDemo} 
                className={`inline-block px-4 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 ${getBorderRadius('button')}`}
              >
                Details
              </a>
              <a 
                href={currentProject.github} 
                className={`inline-block px-4 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 ${getBorderRadius('button')}`}
              >
                GitHub
              </a>
            </div>
          </div>
        );
      }
      
      case 'stats':
        return (
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 bg-white/5 border border-white/20 text-center ${getBorderRadius('card')}`}>
                <div className="text-2xl font-bold text-blue-400">{stats.siteHits}</div>
                <div className="text-sm opacity-80">Site Visits</div>
              </div>
              <div className={`p-4 bg-white/5 border border-white/20 text-center ${getBorderRadius('card')}`}>
                <div className="text-2xl font-bold text-green-400">{getTotalProjectViews()}</div>
                <div className="text-sm opacity-80">Project Views</div>
              </div>
              <div className={`p-4 bg-white/5 border border-white/20 text-center ${getBorderRadius('card')}`}>
                <div className="text-2xl font-bold text-purple-400">{getTotalSectionViews()}</div>
                <div className="text-sm opacity-80">Section Views</div>
              </div>
              <div className={`p-4 bg-white/5 border border-white/20 text-center ${getBorderRadius('card')}`}>
                <div className="text-2xl font-bold text-yellow-400">{stats.totalSessions}</div>
                <div className="text-sm opacity-80">Total Sessions</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Projects */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4 text-green-400">Most Viewed Projects</h3>
                <div className="space-y-2">
                  {getTopProjects().length > 0 ? (
                    getTopProjects().map((project, index) => (
                      <div key={project.name} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="flex items-center gap-2">
                          <span className="text-xs opacity-60">#{index + 1}</span>
                          <span>{project.name}</span>
                        </span>
                        <span className="text-green-400 font-mono">{project.views}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No project views yet</div>
                  )}
                </div>
              </div>

              {/* Top Sections */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4 text-purple-400">Most Visited Sections</h3>
                <div className="space-y-2">
                  {getTopSections().length > 0 ? (
                    getTopSections().map((section, index) => (
                      <div key={section.name} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="flex items-center gap-2">
                          <span className="text-xs opacity-60">#{index + 1}</span>
                          <span className="capitalize">{section.name}</span>
                        </span>
                        <span className="text-purple-400 font-mono">{section.views}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No section views yet</div>
                  )}
                </div>
              </div>
            </div>

            {/* Last Visit & Reset */}
            <div className={`p-4 bg-white/5 border border-white/10 text-center ${getBorderRadius('card')}`}>
              <div className="mb-4 text-sm opacity-80">
                {stats.lastVisit && (
                  <span>Last visit: {new Date(stats.lastVisit).toLocaleString()}</span>
                )}
              </div>
              <button 
                onClick={resetStats}
                className={`px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300 ${getBorderRadius('button')}`}
              >
                Reset Analytics
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="w-full max-w-3xl mx-auto text-center">
            <div className="space-y-4 text-2xl leading-loose">
              {contentData.contact.items.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url} 
                  className="block text-white hover:underline transition-colors duration-300 hover:opacity-80"
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.icon} {item.text}
                </a>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-mono relative overflow-x-hidden">
      {/* Optimized Space Background */}
      <StarfieldBackground />
      
      <div className="text-center w-full max-w-4xl relative z-10 mx-auto py-16">

        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {personalInfo.name}
          </h1>
          <div className="relative inline-block">
            <p className="text-xl opacity-90 font-light tracking-wider">{personalInfo.title}</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Main Menu - Fixed Height */}
        <div className="flex items-center justify-center gap-4 mb-16 h-16 relative">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 ${getBorderRadius()}`}></div>
          {sections.map((section, index) => (
            <React.Fragment key={section}>
              {section === 'projects' && currentSection === 'projects' ? (
                <div className="flex flex-col items-center justify-center gap-1 min-w-[200px] h-16 relative">
                  <div className={`absolute -inset-2 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 ${getBorderRadius()}`}></div>
                  {renderProjectsWheel()}
                </div>
              ) : (
                <div 
                  className={`relative text-lg font-light tracking-wider py-3 px-6 transition-all duration-500 cursor-pointer border min-w-[100px] text-center group ${getBorderRadius('button')} ${
                    currentSection === section 
                      ? 'border-white/80 font-normal shadow-lg shadow-white/20 bg-white/5' 
                      : 'border-white/20 hover:border-white/60 hover:bg-white/5 hover:shadow-md hover:shadow-white/10'
                  }`}
                  onClick={() => {
                    setCurrentSection(section);
                    trackSectionView(section);
                  }}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getBorderRadius('button')}`}></div>
                  <span className="relative z-10">{section}</span>
                </div>
              )}
              {section !== sections[sections.length - 1] && (
                <div className="flex items-center">
                  <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area - Dynamic Height */}
        <div className="flex justify-center relative w-full">
          <div className="w-full max-w-6xl relative z-10 animate-slide-in">
            <div className={`backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl shadow-black/50 p-8 w-full ${getBorderRadius('card')}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsolePortfolio;