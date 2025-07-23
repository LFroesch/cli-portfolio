import React, { useState, useEffect } from 'react'
import { personalInfo, sections, projects, contentData } from './data'
import StarfieldBackground from './StarfieldBackground'
import { useStats } from './useStats'
import './animations.css'

function ConsolePortfolio() {
  const [currentSection, setCurrentSection] = useState('projects');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(2);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
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
            e.preventDefault();
            navigateProjects(-1);
          }
          break;
        case 'ArrowDown':
          if (currentSection === 'projects') {
            e.preventDefault();
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
      setCurrentMediaIndex(0); // Reset media index when changing projects
      return newIndex;
    });
  };

  const navigateMedia = (direction) => {
    const currentProject = projects[currentProjectIndex];
    if (!currentProject.media || !Array.isArray(currentProject.media)) return;
    
    setCurrentMediaIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = currentProject.media.length - 1; // Loop to end
      } else if (newIndex >= currentProject.media.length) {
        newIndex = 0; // Loop to beginning
      }
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
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className={`w-48 h-48 lg:w-56 lg:h-56 border-2 border-white/20 overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center ${getBorderRadius('card')}`}>
                  <img
                    src="/profile.jpg"
                    alt="Lucas Froeschner"
                    className={`w-full h-full object-cover ${getBorderRadius('card')}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center text-white/40">
                    <div className="text-6xl mb-2">👨‍💻</div>
                    <div className="text-sm">Lucas F.</div>
                  </div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                {contentData.about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-xl lg:text-2xl opacity-90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="w-full max-w-5xl mx-auto">
            <div className="space-y-8">
              {contentData.skills.categories.map((category, index) => (
                <div 
                  key={index} 
                  className={`group border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 ${getBorderRadius('card')}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    {/* Header */}
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base opacity-80 mb-4 leading-relaxed group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span 
                          key={itemIndex} 
                          className={`px-3 py-1.5 bg-white/10 border border-white/20 text-sm hover:bg-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105 ${getBorderRadius('small')}`}
                          style={{ animationDelay: `${(index * 0.1) + (itemIndex * 0.02)}s` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'projects': {
        const renderProjectMedia = () => {
          if (!currentProject.media) {
            return (
              <div className="relative w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                <span className="text-white/30 text-4xl">No Preview</span>
              </div>
            );
          }
          
          // Handle both single media objects and arrays of media
          const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
          const currentMedia = mediaArray[currentMediaIndex] || mediaArray[0];
          const hasMultipleMedia = mediaArray.length > 1;
          
          if (!currentMedia) {
            return (
              <div className="relative w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                <span className="text-white/30 text-4xl">No Preview</span>
              </div>
            );
          }
          
          const { type, url, poster } = currentMedia;
          
          const renderMediaContent = () => {
            switch (type) {
              case 'video':
                return (
                  <video
                    className="w-full h-full object-contain bg-black"
                    controls
                    muted
                    loop
                    poster={poster}
                    preload="metadata"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              case 'gif':
              case 'image':
                return (
                  <img
                    src={url}
                    alt={`${currentProject.name} preview ${currentMediaIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                );
              default:
                return (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white/30 text-4xl">No Preview</span>
                  </div>
                );
            }
          };
          
          return (
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center p-1">
              {renderMediaContent()}
              
              {/* Media Navigation Arrows */}
              {hasMultipleMedia && (
                <>
                  <button
                    onClick={() => navigateMedia(-1)}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 border border-white/20 transition-all duration-300 ${getBorderRadius('button')}`}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => navigateMedia(1)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 border border-white/20 transition-all duration-300 ${getBorderRadius('button')}`}
                  >
                    →
                  </button>
                  
                  {/* Media Counter */}
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white/80 text-xs rounded">
                    {currentMediaIndex + 1} / {mediaArray.length}
                  </div>
                </>
              )}
            </div>
          );
        };

        return (
          <div className="w-full">
            {/* Project Card Layout - Vertical Stack */}
            <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
              {/* Media Section - Full Width */}
              <div className="relative w-full h-[400px] lg:h-[500px]">
                {renderProjectMedia()}
              </div>
              
              {/* Content Section - Below Media */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">{currentProject.name}</h2>
                  <p className="text-sm opacity-60">{currentProject.status || 'Completed'}</p>
                </div>
                
                {/* Description */}
                <div className="text-center">
                  <p className="text-base opacity-80 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>
                
                {/* Tech Stack */}
                <div className="text-center">
                  <p className="text-sm opacity-60 mb-3">Stack</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentProject.techStack.split(', ').map((tech, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 bg-white/5 border border-white/20 text-xs opacity-80 hover:opacity-100 hover:bg-white/10 transition-all duration-200 ${getBorderRadius('small')}`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <div className="text-xs opacity-50">
                    {currentProjectIndex + 1} / {projects.length}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigateProjects(-1)}
                      className={`px-4 py-2 border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                    >
                      ← Previous
                    </button>
                    <button 
                      onClick={() => navigateProjects(1)}
                      className={`px-4 py-2 border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                    >
                      Next →
                    </button>
                  </div>
                  
                  <a 
                    href={currentProject.github}
                    className={`px-3 py-1.5 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
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
                    getTopProjects().map((project) => (
                      <div key={project.name} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="flex items-center gap-2">
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
                    getTopSections().map((section) => (
                      <div key={section.name} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="flex items-center gap-2">
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
          <div className="w-full max-w-5xl mx-auto">
            {/* First row - 3 items */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {contentData.contact.items.slice(0, 3).map((item, index) => (
                <a 
                  key={index} 
                  href={item.url} 
                  className={`group relative block p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 ${getBorderRadius('card')}`}
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getBorderRadius('card')}`}></div>
                  
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 ${getBorderRadius('card')}`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon with glow effect */}
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                      <span className="relative z-10">{item.icon}</span>
                      <div className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 text-4xl">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors duration-300">
                      {item.text.includes('@') ? 'Email' : item.text}
                    </h3>
                    
                    {/* URL or description */}
                    <p className="text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                      {item.url.startsWith('mailto:') 
                        ? item.text 
                        : item.url.startsWith('http') 
                          ? new URL(item.url).hostname.replace('www.', '')
                          : 'Click to visit'
                      }
                    </p>
                  </div>
                  
                  {/* Hover particle effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div 
                      className={`absolute w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping ${getBorderRadius()}`} 
                      style={{ 
                        top: `${5 + (index * 7) % 15}%`, 
                        left: `${10 + (index * 13) % 20}%`,
                        animationDelay: `${0.1 + (index * 0.05)}s` 
                      }}
                    ></div>
                    <div 
                      className={`absolute w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse ${getBorderRadius()}`} 
                      style={{ 
                        top: `${30 + (index * 11) % 25}%`, 
                        right: `${20 + (index * 9) % 15}%`,
                        animationDelay: `${0.3 + (index * 0.07)}s` 
                      }}
                    ></div>
                    <div 
                      className={`absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce ${getBorderRadius()}`} 
                      style={{ 
                        bottom: `${20 + (index * 17) % 20}%`, 
                        left: `${25 + (index * 19) % 25}%`,
                        animationDelay: `${0.5 + (index * 0.09)}s` 
                      }}
                    ></div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Second row - 2 items centered */}
            {contentData.contact.items.length > 3 && (
              <div className="flex justify-center gap-6">
                {contentData.contact.items.slice(3).map((item, index) => (
                  <a 
                    key={index + 3} 
                    href={item.url} 
                    className={`group relative block p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 w-full max-w-xs ${getBorderRadius('card')}`}
                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                  >
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getBorderRadius('card')}`}></div>
                    
                    {/* Animated border glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 ${getBorderRadius('card')}`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Icon with glow effect */}
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                        <span className="relative z-10">{item.icon}</span>
                        <div className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 text-4xl">
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Text */}
                      <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors duration-300">
                        {item.text.includes('@') ? 'Email' : item.text}
                      </h3>
                      
                      {/* URL or description */}
                      <p className="text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                        {item.url.startsWith('mailto:') 
                          ? item.text 
                          : item.url.startsWith('http') 
                            ? new URL(item.url).hostname.replace('www.', '')
                            : 'Click to visit'
                        }
                      </p>
                    </div>
                    
                    {/* Hover particle effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div 
                        className={`absolute w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping ${getBorderRadius()}`} 
                        style={{ 
                          top: `${5 + ((index + 3) * 7) % 15}%`, 
                          left: `${10 + ((index + 3) * 13) % 20}%`,
                          animationDelay: `${0.1 + ((index + 3) * 0.05)}s` 
                        }}
                      ></div>
                      <div 
                        className={`absolute w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse ${getBorderRadius()}`} 
                        style={{ 
                          top: `${30 + ((index + 3) * 11) % 25}%`, 
                          right: `${20 + ((index + 3) * 9) % 15}%`,
                          animationDelay: `${0.3 + ((index + 3) * 0.07)}s` 
                        }}
                      ></div>
                      <div 
                        className={`absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce ${getBorderRadius()}`} 
                        style={{ 
                          bottom: `${20 + ((index + 3) * 17) % 20}%`, 
                          left: `${25 + ((index + 3) * 19) % 25}%`,
                          animationDelay: `${0.5 + ((index + 3) * 0.09)}s` 
                        }}
                      ></div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            
            {/* Bottom section with additional info */}
            <div className={`mt-12 text-center p-6 border border-white/10 bg-white/5 ${getBorderRadius('card')}`}>
              <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Let's Connect!
              </h3>
              <p className="text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
                I'm always excited to discuss new opportunities and collaborate on interesting projects. Feel free to reach out through any of the channels above.
              </p>
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