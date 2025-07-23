import React, { useState, useEffect, useCallback } from 'react'
import { personalInfo, sections, projects, contentData } from './data'
import blogPosts from './blogPosts.json'
import StarfieldBackground from './StarfieldBackground'
import PaperPlanes from './PaperPlanes'
import { getSkillCategoryIcon } from './SkillIcons'
import { useStats } from './useStats'
import { useContactForm } from './hooks/useContactForm'
import { useGitHubStats } from './hooks/useGitHubStats'
import TypingEffect from './components/TypingEffect'
import LoadingSpinner from './components/LoadingSpinner'
import { StatsCardSkeleton } from './components/SkeletonLoader'
import './animations.css'

function ConsolePortfolio() {
  const [currentSection, setCurrentSection] = useState('projects');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(2);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [designVariant] = useState('rounded'); // 'rounded' or 'sharp'
  const [variationCycle, setVariationCycle] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [lastTrackedProject, setLastTrackedProject] = useState(null);
  
  // Copy email to clipboard
  const copyEmailToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      // Could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };
  
  // Stats tracking
  const { 
    stats, 
    trackProjectView, 
    trackSectionView,
    getTopProjects, 
    getTotalProjectViews,
    getTotalSectionViews,
    isOnline
  } = useStats();

  // Contact form
  const { formData, status, handleInputChange, submitForm } = useContactForm();

  // GitHub stats
  const { githubData, activity, loading: githubLoading, error: githubError, refresh: refreshGitHub } = useGitHubStats();

  // Navigation functions (defined before useEffect that references them)
  const navigateMenu = useCallback((direction) => {
    const currentIndex = sections.indexOf(currentSection);
    const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    const newSection = sections[newIndex];
    setCurrentSection(newSection);
    trackSectionView(newSection);
  }, [currentSection, trackSectionView]);

  const navigateProjects = useCallback((direction) => {
    setMediaLoading(true);
    setCurrentProjectIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = projects.length - 1; // Loop to end
      } else if (newIndex >= projects.length) {
        newIndex = 0; // Loop to beginning
      }
      setCurrentMediaIndex(0); // Reset media index when changing projects
      return newIndex;
    });
    // Clear loading after a short delay
    setTimeout(() => setMediaLoading(false), 300);
  }, []);

  // Handle initial load completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500); // Show loading for 1.5 seconds minimum
    
    return () => clearTimeout(timer);
  }, []);

  // Track project view when section changes to projects or project index changes
  useEffect(() => {
    if (currentSection === 'projects' && projects[currentProjectIndex]) {
      const currentProjectName = projects[currentProjectIndex].name;
      // Only track if the project actually changed
      if (lastTrackedProject !== currentProjectName) {
        trackProjectView(currentProjectName);
        setLastTrackedProject(currentProjectName);
      }
    }
    // Reset tracking when leaving projects section
    if (currentSection !== 'projects') {
      setLastTrackedProject(null);
    }
  }, [currentSection, currentProjectIndex, lastTrackedProject, trackProjectView]);

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
          } else if (currentSection === 'blog') {
            e.preventDefault();
            setCurrentBlogIndex(prev => {
              let newIndex = prev - 1;
              if (newIndex < 0) {
                newIndex = blogPosts.length - 1;
              }
              return newIndex;
            });
          }
          break;
        case 'ArrowDown':
          if (currentSection === 'projects') {
            e.preventDefault();
            navigateProjects(1);
          } else if (currentSection === 'blog') {
            e.preventDefault();
            setCurrentBlogIndex(prev => {
              let newIndex = prev + 1;
              if (newIndex >= blogPosts.length) {
                newIndex = 0;
              }
              return newIndex;
            });
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, currentProjectIndex, currentBlogIndex, navigateMenu, navigateProjects]);

  // Cycle through variations every 8 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setVariationCycle(prev => (prev + 1) % 4);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

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


  const navigateMedia = (direction) => {
    const currentProject = projects[currentProjectIndex];
    if (!currentProject.media || !Array.isArray(currentProject.media)) return;
    
    setMediaLoading(true);
    setCurrentMediaIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = currentProject.media.length - 1; // Loop to end
      } else if (newIndex >= currentProject.media.length) {
        newIndex = 0; // Loop to beginning
      }
      return newIndex;
    });
    // Clear loading after a short delay
    setTimeout(() => setMediaLoading(false), 200);
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
              {contentData.skills.categories.map((category, index) => {
                // Pre-cached variations for performance with explicit class names
                const variations = [
                  {
                    shadowClass: 'hover:shadow-blue-500/10',
                    sparkles: [
                      { classes: 'absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.1s' },
                      { classes: 'absolute bottom-6 left-6 w-1.5 h-1.5 bg-cyan-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.3s' }
                    ]
                  },
                  {
                    shadowClass: 'hover:shadow-purple-500/10',
                    sparkles: [
                      { classes: 'absolute top-8 right-8 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.2s' },
                      { classes: 'absolute top-6 left-8 w-1 h-1 bg-violet-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.4s' },
                      { classes: 'absolute bottom-8 right-12 w-1.5 h-1.5 bg-indigo-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.6s' }
                    ]
                  },
                  {
                    shadowClass: 'hover:shadow-cyan-500/10',
                    sparkles: [
                      { classes: 'absolute top-4 right-4 w-2 h-2 bg-cyan-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.15s' },
                      { classes: 'absolute top-8 left-6 w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.35s' }
                    ]
                  },
                  {
                    shadowClass: 'hover:shadow-indigo-500/10',
                    sparkles: [
                      { classes: 'absolute top-6 right-6 w-1.5 h-1.5 bg-indigo-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.1s' },
                      { classes: 'absolute bottom-4 left-4 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.3s' },
                      { classes: 'absolute top-10 left-10 w-1 h-1 bg-violet-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle', delay: '0.5s' }
                    ]
                  }
                ];
                
                const variation = variations[(index + variationCycle) % variations.length];
                
                return (
                  <div 
                    key={index} 
                    className={`group border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-xl ${variation.shadowClass} ${getBorderRadius('card')}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6 relative overflow-hidden">
                      {/* Cached sparkle effects */}
                      {variation.sparkles.map((sparkle, sparkleIndex) => (
                        <div 
                          key={sparkleIndex}
                          className={sparkle.classes}
                          style={{ animationDelay: sparkle.delay }}
                        ></div>
                      ))}
                    
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        {getSkillCategoryIcon(index)}
                      </div>
                      <h3 className="text-2xl font-semibold group-hover:text-white transition-colors duration-300 bg-gradient-to-r from-white to-gray-300 group-hover:from-blue-200 group-hover:to-white bg-clip-text text-transparent">
                        {category.name}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-base opacity-80 mb-6 leading-relaxed group-hover:opacity-100 transition-opacity duration-300 text-left">
                      {category.description}
                    </p>
                    
                    {/* Tech Stack with enhanced animations */}
                    <div className="flex flex-wrap gap-3">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`group/item relative px-3 py-2 bg-white/10 border border-white/20 text-sm hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer ${getBorderRadius('small')}`}
                        >
                          {/* Gradient overlay on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 ${getBorderRadius('small')}`}></div>
                          
                          {/* Content */}
                          <div className="flex items-center justify-center relative z-10">
                            <span className="font-medium group-hover/item:text-blue-100 transition-colors duration-200">
                              {item.name}
                            </span>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                );
              })}
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
              {/* Content Section - Above Media */}
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
                
                {/* Project Counter and GitHub */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <div className="text-xs opacity-50">
                    {currentProjectIndex + 1} / {projects.length}
                  </div>
                  
                  <a 
                    href={currentProject.github}
                    className={`px-3 py-1.5 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              
              {/* Media Section - Below Content */}
              <div className="relative w-full h-[400px] lg:h-[500px]">
                {renderProjectMedia()}
                {mediaLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <LoadingSpinner size="large" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      case 'stats':
        return (
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 px-3 py-1 text-xs font-medium border ${getBorderRadius('small')} ${
                isOnline 
                  ? 'border-white/40 text-white/80' 
                  : 'border-white/20 text-white/60'
              }`}>
                <div className={`w-2 h-2 ${getBorderRadius()} ${isOnline ? 'bg-white/80' : 'bg-white/40'}`}></div>
                {isOnline ? 'analytics online' : 'offline mode'}
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-1 text-xs font-medium border ${getBorderRadius('small')} ${
                githubData && !githubError
                  ? 'border-white/40 text-white/80' 
                  : 'border-white/20 text-white/60'
              }`}>
                <div className={`w-2 h-2 ${getBorderRadius()} ${githubData && !githubError ? 'bg-white/80' : 'bg-white/40'}`}></div>
                {githubData && !githubError ? 'github connected' : 'github offline'}
              </div>
              
              <button
                onClick={refreshGitHub}
                className={`px-3 py-1 border border-white/40 hover:bg-white/10 transition-all duration-300 text-xs ${getBorderRadius('button')}`}
                disabled={githubLoading}
              >
                {githubLoading ? 'syncing...' : 'refresh'}
              </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {isInitialLoad || githubLoading ? (
                <>
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                </>
              ) : (
                <>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{githubData?.stats?.currentStreak || 0}</div>
                    <div className="text-sm opacity-80">streak days</div>
                  </div>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{githubData?.stats?.totalRepos || 0}</div>
                    <div className="text-sm opacity-80">repositories</div>
                  </div>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{githubData?.stats?.contributionsLast30Days || 0}</div>
                    <div className="text-sm opacity-80">contributions</div>
                  </div>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{stats.siteHits}</div>
                    <div className="text-sm opacity-80">site visits</div>
                  </div>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{getTotalProjectViews()}</div>
                    <div className="text-sm opacity-80">project views</div>
                  </div>
                  <div className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}>
                    <div className="text-2xl font-bold text-white">{githubData?.user?.followers || 0}</div>
                    <div className="text-sm opacity-80">followers</div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Commits */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4">Recent Commits</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {githubLoading ? (
                    <div className="text-center py-4 opacity-60">Loading...</div>
                  ) : githubData?.recentCommits?.length > 0 ? (
                    githubData.recentCommits.slice(0, 5).map((commit, index) => (
                      <div key={index} className="text-left">
                        <div className="text-sm truncate mb-1">{commit.message}</div>
                        <div className="text-xs opacity-60">
                          <span className="font-mono">{commit.sha}</span> • {commit.repo.split('/')[1]} • {new Date(commit.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No recent commits</div>
                  )}
                </div>
              </div>

              {/* Language Usage */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4">Language Usage</h3>
                <div className="space-y-3">
                  {githubLoading ? (
                    <div className="text-center py-4 opacity-60">Loading...</div>
                  ) : githubData?.topLanguages?.length > 0 ? (
                    githubData.topLanguages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{lang.language}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white/60 transition-all duration-500"
                              style={{ width: `${lang.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs opacity-80 font-mono w-8 text-right">{lang.percentage}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No language data</div>
                  )}
                </div>
              </div>

              {/* Recent Repositories */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4">Recent Repos</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {githubLoading ? (
                    <div className="text-center py-4 opacity-60">Loading...</div>
                  ) : githubData?.recentRepos?.length > 0 ? (
                    githubData.recentRepos.slice(0, 4).map((repo, index) => (
                      <div key={index} className="text-left">
                        <div className="text-sm truncate mb-1">{repo.name}</div>
                        <div className="text-xs opacity-60 truncate mb-1">
                          {repo.description || 'No description'}
                        </div>
                        <div className="text-xs opacity-60">
                          {repo.language && <span>{repo.language} • </span>}
                          ⭐ {repo.stars} • 🔀 {repo.forks}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No repositories</div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Projects */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4">Most Viewed Projects</h3>
                <div className="space-y-2">
                  {getTopProjects().length > 0 ? (
                    getTopProjects().map((project) => (
                      <div key={project.name} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="flex items-center gap-2">
                          <span>{project.name}</span>
                        </span>
                        <span className="text-white/80 font-mono">{project.views}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No project views yet</div>
                  )}
                </div>
              </div>

              {/* Activity Preview */}
              <div className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}>
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                {githubLoading ? (
                  <div className="text-center py-4 opacity-60">Loading...</div>
                ) : activity && activity.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {activity.slice(-21).map((day, index) => {
                        const intensity = Math.min(day.total / 3, 1);
                        return (
                          <div
                            key={index}
                            className={`w-6 h-6 border border-white/20 ${getBorderRadius('small')}`}
                            style={{
                              backgroundColor: intensity > 0 
                                ? `rgba(255, 255, 255, ${0.1 + intensity * 0.4})`
                                : 'rgba(255, 255, 255, 0.05)'
                            }}
                            title={`${day.date}: ${day.total} events`}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="text-xs opacity-60 text-center">
                      last 3 weeks
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 opacity-60">No activity data</div>
                )}
              </div>
            </div>

            {/* Last Updated */}
            <div className={`p-4 bg-white/5 border border-white/10 text-center ${getBorderRadius('card')}`}>
              <div className="text-sm opacity-80">
                <span>Site last visit: {stats.lastVisit ? new Date(stats.lastVisit).toLocaleString() : 'Never'}</span>
                {githubData && (
                  <>
                    <span className="mx-2">•</span>
                    <span>GitHub data updated: {new Date().toLocaleString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 'blog': {
        const sortedBlogPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentPost = sortedBlogPosts[currentBlogIndex];
        
        const navigateBlogPosts = (direction) => {
          setCurrentBlogIndex(prev => {
            let newIndex = prev + direction;
            if (newIndex < 0) {
              newIndex = sortedBlogPosts.length - 1;
            } else if (newIndex >= sortedBlogPosts.length) {
              newIndex = 0;
            }
            return newIndex;
          });
        };

        const renderBlogMedia = () => {
          if (!currentPost.media) return null;
          
          const { type, url, poster, alt } = currentPost.media;
          
          if (type === 'video') {
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
          }
          
          if (type === 'image') {
            return (
              <img
                src={url}
                alt={alt || `${currentPost.title} preview`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            );
          }
          
          return null;
        };

        return (
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigateBlogPosts(-1)}
                className={`px-3 py-2 border border-white/40 hover:bg-white/10 transition-all duration-300 text-sm ${getBorderRadius('button')}`}
              >
                ← prev
              </button>
              <span className="text-sm opacity-60">
                {currentBlogIndex + 1} / {sortedBlogPosts.length}
              </span>
              <button
                onClick={() => navigateBlogPosts(1)}
                className={`px-3 py-2 border border-white/40 hover:bg-white/10 transition-all duration-300 text-sm ${getBorderRadius('button')}`}
              >
                next →
              </button>
            </div>

            {/* Blog Post */}
            <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
              <div className="p-6 lg:p-8 space-y-6">
                {/* Title & Date */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{currentPost.title}</h2>
                  <div className="text-sm opacity-60">
                    {new Date(currentPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} • {currentPost.time}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-base opacity-80 leading-relaxed">
                  {currentPost.description}
                </p>
                
                {/* Tags */}
                {currentPost.tags && (
                  <div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentPost.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 bg-white/5 border border-white/20 text-xs opacity-80 ${getBorderRadius('small')}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Media */}
              {currentPost.media && (
                <div className="relative w-full h-[400px] lg:h-[500px]">
                  {renderBlogMedia()}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'contact':
        return (
          <div className="w-full max-w-5xl mx-auto space-y-12">
            {/* Contact Links */}
            <div>
              
              {/* First row - 3 items */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {contentData.contact.items.slice(0, 3).map((item, index) => {
                  const isEmail = item.url.startsWith('mailto:');
                  
                  if (isEmail) {
                    return (
                      <button
                        key={index}
                        onClick={() => copyEmailToClipboard(item.text)}
                        className={`group relative block p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer ${getBorderRadius('card')}`}
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
                            Email (Click to Copy)
                          </h3>
                          
                          {/* URL or description */}
                          <p className="text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                            {item.text}
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
                      </button>
                    );
                  }
                  
                  return (
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
                  );
                })}
              </div>
            
            {/* Second row - 2 items centered */}
            {contentData.contact.items.length > 3 && (
              <div className="flex justify-center gap-6">
                {contentData.contact.items.slice(3).map((item, index) => {
                  const isEmail = item.url.startsWith('mailto:');
                  
                  if (isEmail) {
                    return (
                      <button
                        key={index + 3}
                        onClick={() => copyEmailToClipboard(item.text)}
                        className={`group relative block p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 w-full max-w-xs cursor-pointer ${getBorderRadius('card')}`}
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
                            Email (Click to Copy)
                          </h3>
                          
                          {/* URL or description */}
                          <p className="text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                            {item.text}
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
                      </button>
                    );
                  }
                  
                  return (
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
                  );
                })}
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

            {/* Contact Form */}
            <div className={`p-8 border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 ${getBorderRadius('card')}`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Send me a message
                </h3>
                {!isOnline && (
                  <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded text-xs text-yellow-300">
                    Offline Mode
                  </div>
                )}
              </div>
              
              {/* Status Messages */}
              {status.message && (
                <div className={`mb-6 p-4 rounded-lg border text-center ${
                  status.isSuccess 
                    ? 'bg-green-500/20 border-green-500/40 text-green-300' 
                    : status.isError 
                      ? 'bg-red-500/20 border-red-500/40 text-red-300'
                      : 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                }`}>
                  {status.message}
                </div>
              )}
              
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      maxLength={100}
                      disabled={status.isSubmitting}
                      className={`w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius('button')}`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      disabled={status.isSubmitting}
                      className={`w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius('button')}`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                    maxLength={200}
                    disabled={status.isSubmitting}
                    className={`w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius('button')}`}
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">
                    Message <span className="text-xs opacity-60">({formData.message.length}/2000)</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows="6"
                    maxLength={2000}
                    disabled={status.isSubmitting}
                    className={`w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-white placeholder-white/40 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius('button')}`}
                    placeholder="Tell me about your project, opportunity, or just say hi!"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status.isSubmitting}
                    className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border border-blue-400 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${getBorderRadius('button')}`}
                  >
                    {status.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="small" />
                        Sending...
                      </span>
                    ) : (
                      <>Send Message 📧</>
                    )}
                  </button>
                </div>
                
                {!isOnline && (
                  <div className="text-center text-sm opacity-60">
                    Backend offline - using email fallback
                  </div>
                )}
              </form>
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
      {/* Paper Planes */}
      <PaperPlanes />
      
      <div className="text-center w-full max-w-4xl relative z-10 mx-auto py-16">

        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            <TypingEffect 
              text={personalInfo.name}
              speed={120}
              delay={500}
              cursor={false}
            />
          </h1>
          <div className="relative inline-block">
            <p className="text-xl opacity-90 font-light tracking-wider">
              <TypingEffect 
                text={personalInfo.title}
                speed={80}
                delay={2000}
                cursor={false}
              />
            </p>
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
            <div className={`backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl shadow-black/50 p-8 w-full transition-all duration-500 hover:bg-white/8 hover:border-white/20 ${getBorderRadius('card')}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsolePortfolio;