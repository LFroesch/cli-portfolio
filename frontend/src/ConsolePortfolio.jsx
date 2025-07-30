import React, { useState, useEffect, useCallback } from 'react'
import { personalInfo, projects, contentData } from './data'
import blogPosts from './blogPosts.json'
import StarfieldBackground from './StarfieldBackground'
import PaperPlanes from './PaperPlanes'
import { getSkillCategoryIcon } from './SkillIcons'
import { useStats } from './useStats'
import { useContactForm } from './hooks/useContactForm'
import { useGitHubStats } from './hooks/useGitHubStats'
import { useNavigation } from './hooks/useNavigation'
import { useLightbox } from './hooks/useLightbox'
import TypingEffect from './components/TypingEffect'
import LoadingSpinner from './components/LoadingSpinner'
import { StatsCardSkeleton } from './components/SkeletonLoader'
import FloatingButtons from './components/FloatingButtons'
import Lightbox from './components/Lightbox'
import AboutSection from './components/AboutSection'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './components/DesktopMenu'
import { getBorderRadiusClasses, copyEmailToClipboard, createToggleSection } from './utils/helpers'
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [certGalleryIndex, setCertGalleryIndex] = useState(0);
  const [showCertGallery, setShowCertGallery] = useState(false);
  const [isScrolledIntoProject, setIsScrolledIntoProject] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  
  // Initialize hooks
  const { showLightbox, lightboxImages, lightboxImageIndex, openLightbox, closeLightbox, navigateLightbox } = useLightbox(currentProjectIndex);
  const getBorderRadius = getBorderRadiusClasses(designVariant);
  const toggleSection = createToggleSection(setCollapsedSections);
  
  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're scrolled into project content (adjust threshold as needed)
      const scrollThreshold = 70; // pixels
      setIsScrolledIntoProject(currentScrollY > scrollThreshold && currentSection === 'projects');
      
      // Show floating buttons when scrolled down on any page
      setShowFloatingButtons(currentScrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);
  
  
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
  const { githubData, activity, loading: githubLoading } = useGitHubStats();

  // Navigation hooks
  const { navigateProjects, navigateMedia, handleKeyPress } = useNavigation({
    currentSection,
    setCurrentSection,
    currentProjectIndex,
    setCurrentProjectIndex,
    currentMediaIndex,
    setCurrentMediaIndex,
    currentBlogIndex,
    setCurrentBlogIndex,
    showLightbox,
    isScrolledIntoProject,
    navigateLightbox,
    closeLightbox,
    trackSectionView,
    trackProjectView
  });

  // Local navigation functions with loading states
  const navigateProjectsWithLoading = useCallback((direction) => {
    setMediaLoading(true);
    navigateProjects(direction);
    setTimeout(() => setMediaLoading(false), 300);
  }, [navigateProjects]);

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

  // Keyboard event handler
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Cycle through variations every 8 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setVariationCycle(prev => (prev + 1) % 4);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);




  const renderContent = () => {
    const currentProject = projects[currentProjectIndex];
    
    switch(currentSection) {
      case 'about':
        return (
          <AboutSection 
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
            getBorderRadius={getBorderRadius}
          />
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
                    
                      {/* Header with icon - Clickable */}
                      <button
                        onClick={() => toggleSection(`skills-${index}`)}
                        className="w-full group/header mb-4 flex items-center gap-4 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover/header:border-white/80 group-hover/header:bg-white/10 transition-all duration-300 ${collapsedSections[`skills-${index}`] ? 'bg-white/20' : ''}`}>
                          <div className={`transition-transform duration-300 ${collapsedSections[`skills-${index}`] ? 'rotate-180' : ''}`}>
                            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-white/80 group-hover/header:text-white group-hover/header:scale-110 transition-all duration-300">
                            {getSkillCategoryIcon(index)}
                          </div>
                          <h3 className="text-2xl font-semibold group-hover/header:text-white transition-colors duration-300 bg-gradient-to-r from-white to-gray-300 group-hover/header:from-blue-200 group-hover/header:to-white bg-clip-text text-transparent text-left">
                            {category.name}
                          </h3>
                        </div>
                      </button>
                    
                      {/* Collapsible Content */}
                      {!collapsedSections[`skills-${index}`] && (
                        <div className="animate-fade-in">
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
                          
                          {/* Gallery for Certifications & Learning */}
                          {category.gallery && (
                            <div className="mt-8">
                              <button 
                                onClick={() => setShowCertGallery(!showCertGallery)}
                                className={`w-full p-3 border border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 ${getBorderRadius('button')}`}
                              >
                                <span className="text-sm font-medium">
                                  {showCertGallery ? 'Hide Gallery' : 'View Learning Gallery'}
                                </span>
                                <svg className={`w-4 h-4 transition-transform duration-300 ${showCertGallery ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {showCertGallery && (
                                <div className="mt-6 animate-fade-in">
                                  <div className={`border border-white/20 bg-black overflow-hidden ${getBorderRadius('card')}`}>
                                    <div className="relative h-[400px] flex items-center justify-center">
                                      <img
                                        src={category.gallery[certGalleryIndex]?.url}
                                        alt={category.gallery[certGalleryIndex]?.title}
                                        className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                        loading="lazy"
                                        onClick={() => openLightbox(category.gallery, certGalleryIndex)}
                                        title="Click to enlarge"
                                      />
                                      
                                      {/* Gallery Navigation */}
                                      {category.gallery.length > 1 && (
                                        <>
                                          <button
                                            onClick={() => setCertGalleryIndex(prev => 
                                              prev > 0 ? prev - 1 : category.gallery.length - 1
                                            )}
                                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 border border-white/20 transition-all duration-300 ${getBorderRadius('button')}`}
                                          >
                                            ←
                                          </button>
                                          <button
                                            onClick={() => setCertGalleryIndex(prev => 
                                              prev < category.gallery.length - 1 ? prev + 1 : 0
                                            )}
                                            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 border border-white/20 transition-all duration-300 ${getBorderRadius('button')}`}
                                          >
                                            →
                                          </button>
                                          
                                          {/* Gallery Counter */}
                                          <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white/80 text-xs rounded">
                                            {certGalleryIndex + 1} / {category.gallery.length}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    
                                    {/* Caption */}
                                    {category.gallery[certGalleryIndex]?.caption && (
                                      <div className="p-4 border-t border-white/20">
                                        <p className="text-sm text-white/80 text-center">
                                          <strong>{category.gallery[certGalleryIndex]?.title}</strong>
                                          {category.gallery[certGalleryIndex]?.title && ' - '}
                                          {category.gallery[certGalleryIndex]?.caption}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
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
                    className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    loading="lazy"
                    onClick={() => openLightbox(currentMediaIndex)}
                    title="Click to enlarge"
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
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              {renderMediaContent()}
              
              {/* Media Counter */}
              {hasMultipleMedia && (
                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white/80 text-xs rounded">
                  {currentMediaIndex + 1} / {mediaArray.length}
                </div>
              )}
            </div>
          );
        };

        return (
          <div className="w-full relative">
            {/* Media Navigation Arrows - Outside project card */}
            {(() => {
              const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
              const hasMultipleMedia = mediaArray.length > 1;
              return hasMultipleMedia && (
                <>
                  <button
                    onClick={() => navigateMedia(-1)}
                    className={`absolute -left-[80px] top-[40%] p-2 transition-all duration-300 z-20 ${getBorderRadius('button')} ${
                      isScrolledIntoProject 
                        ? 'bg-black/70 hover:bg-black/90 border border-green-400/40 hover:border-green-400/60' 
                        : 'bg-black/50 hover:bg-black/80 border border-white/20'
                    }`}
                    title={isScrolledIntoProject ? "← Previous photo (Left arrow key)" : "Previous photo"}
                  >
                    {isScrolledIntoProject ? (
                      <div className="hidden lg:flex w-4 h-4 items-center justify-center bg-white/10 border border-white/30 rounded text-xs font-mono font-bold text-green-100">
                        ←
                      </div>
                    ) : (
                      <span className="text-white">←</span>
                    )}
                    {isScrolledIntoProject && (
                      <span className="lg:hidden text-white">←</span>
                    )}
                  </button>
                  <button
                    onClick={() => navigateMedia(1)}
                    className={`absolute -right-[80px] top-[40%] p-2 transition-all duration-300 z-20 ${getBorderRadius('button')} ${
                      isScrolledIntoProject 
                        ? 'bg-black/70 hover:bg-black/90 border border-green-400/40 hover:border-green-400/60' 
                        : 'bg-black/50 hover:bg-black/80 border border-white/20'
                    }`}
                    title={isScrolledIntoProject ? "→ Next photo (Right arrow key)" : "Next photo"}
                  >
                    {isScrolledIntoProject ? (
                      <div className="hidden lg:flex w-4 h-4 items-center justify-center bg-white/10 border border-white/30 rounded text-xs font-mono font-bold text-green-100">
                        →
                      </div>
                    ) : (
                      <span className="text-white">→</span>
                    )}
                    {isScrolledIntoProject && (
                      <span className="lg:hidden text-white">→</span>
                    )}
                  </button>
                </>
              );
            })()}
            
            {/* Project Card Layout - With Rounded UI */}
            <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
              {/* Header with Project Info and Actions */}
              <div className="border-b border-white/10 bg-white/5">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* First Row: Title and Status */}
                  <div className="p-4 border-b border-white/5">
                    <h2 className="text-lg font-bold mb-2">{currentProject.name}</h2>
                    <div className="flex justify-center">
                      <span className="text-xs opacity-60 bg-white/10 px-2 py-1 rounded-full whitespace-nowrap">
                        {currentProject.status || 'Completed'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Second Row: Action Buttons */}
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      {currentProject.liveDemo && currentProject.liveDemo !== '#' && (
                        <a 
                          href={currentProject.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-3 py-2 border border-purple-400/60 hover:bg-purple-500 hover:text-white transition-all duration-300 text-sm text-center ${getBorderRadius('button')}`}
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-3 py-2 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-sm text-center ${getBorderRadius('button')}`}
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden lg:flex justify-between items-center p-4 lg:p-4">
                  <div className="flex items-center gap-2">
                    {/* Project Counter */}
                    <div className="text-sm opacity-60 bg-white/10 px-2 py-1 rounded-full">
                      {currentProjectIndex + 1} / {projects.length}
                    </div>
                    
                    {/* Project Navigation (always visible) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateProjectsWithLoading(-1)}
                        className={`p-2 border transition-all duration-300 ${getBorderRadius('button')} ${
                          isScrolledIntoProject 
                            ? 'border-green-400/40 hover:bg-green-500/10 hover:border-green-400/60' 
                            : 'border-white/40 hover:bg-white/10 hover:border-white/60'
                        }`}
                        title={isScrolledIntoProject ? "↑ Previous project (Up arrow key)" : "Previous project"}
                      >
                        {isScrolledIntoProject ? (
                          <div className="hidden lg:flex w-4 h-4 items-center justify-center bg-white/10 border border-white/30 rounded text-xs font-mono font-bold">
                            ↑
                          </div>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                        title={isScrolledIntoProject ? "↓ Next project (Down arrow key)" : "Next project"}
                      >
                        {isScrolledIntoProject ? (
                          <div className="hidden lg:flex w-4 h-4 items-center justify-center bg-white/10 border border-white/30 rounded text-xs font-mono font-bold">
                            ↓
                          </div>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl lg:text-2xl font-bold">{currentProject.name}</h2>
                    </div>
                    <span className="text-sm opacity-60 bg-white/10 px-2 py-1 rounded-full">
                      {currentProject.status || 'Completed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {currentProject.liveDemo && currentProject.liveDemo !== '#' && (
                        <a 
                          href={currentProject.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 border border-purple-400/60 hover:bg-purple-500 hover:text-white transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1.5 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-sm ${getBorderRadius('button')}`}
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description & Tech Stack - Above Media */}
              <div className="p-6 lg:p-8 bg-white/5 border-b border-white/10 space-y-4">
                {/* Description */}
                <div>
                  <p className="text-base opacity-80 leading-relaxed text-center">
                    {currentProject.description}
                  </p>
                </div>
                
                {/* Tech Stack */}
                <div className="text-center">
                  <p className="text-sm opacity-60 mb-3">Tech Stack</p>
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
              </div>
              
              {/* Media Section - Prominent Display */}
              <div className="w-full">
                <div className="relative w-full h-[500px] lg:h-[600px]">
                  {renderProjectMedia()}
                  {mediaLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <LoadingSpinner size="large" />
                    </div>
                  )}
                </div>
                
                {/* Media Caption */}
                {(() => {
                  const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
                  const currentMedia = mediaArray[currentMediaIndex] || mediaArray[0];
                  return currentMedia?.caption && (
                    <div className="px-4 py-2 bg-black/20 border-t border-white/10">
                      <p className="text-sm text-white/60 italic text-center">
                        {currentMedia.caption}
                      </p>
                    </div>
                  );
                })()}
              </div>
              
              {/* Detailed Project Information - Below Media */}
              {(currentProject.longDescription || currentProject.learned || currentProject.goal) && (
                <div className="p-6 lg:p-8 bg-white/5 border-t border-white/10 space-y-8">
                  <div className="max-w-4xl mx-auto space-y-8">
                    {currentProject.longDescription && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">Why This Project?</h3>
                        <p className="text-base opacity-80 leading-relaxed text-center">
                          {currentProject.longDescription}
                        </p>
                      </div>
                    )}
                    
                    {currentProject.learned && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">What I Learned:</h3>
                        <p className="text-base opacity-80 leading-relaxed text-center">
                          {currentProject.learned}
                        </p>
                      </div>
                    )}
                    
                    {currentProject.goal && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Goal:</h3>
                        <p className="text-base opacity-80 leading-relaxed text-center">
                          {currentProject.goal}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        );
      }
      
      case 'stats':
        return (
          <div className="w-full max-w-6xl mx-auto space-y-8">
            {/* Key Metrics - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
              {isInitialLoad || githubLoading ? (
                <>
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                  <StatsCardSkeleton getBorderRadius={getBorderRadius} />
                </>
              ) : (
                <>
                  <div 
                    className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}
                  >
                    <div className="text-2xl font-bold text-white">{stats.siteHits}</div>
                    <div className="text-sm opacity-80">site visits</div>
                  </div>
                  <div 
                    className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}
                  >
                    <div className="text-2xl font-bold text-white">{getTotalSectionViews()}</div>
                    <div className="text-sm opacity-80">section views</div>
                  </div>
                  <div 
                    className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors ${getBorderRadius('card')}`}
                  >
                    <div className="text-2xl font-bold text-white">{getTotalProjectViews()}</div>
                    <div className="text-sm opacity-80">project views</div>
                  </div>
                </>
              )}
            </div>

            {/* Main Content - Four Equal Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Most Viewed Projects */}
              <div 
                className={`p-6 bg-white/5 border border-white/10 h-[330px] flex flex-col ${getBorderRadius('card')}`}
              >
                <h3 className="text-lg font-medium mb-4">Most Viewed Projects</h3>
                <div className="flex-1 space-y-2 overflow-y-auto">
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
              
              {/* Language Usage */}
              <div 
                className={`p-6 bg-white/5 border border-white/10 h-[330px] flex flex-col ${getBorderRadius('card')}`}
              >
                <h3 className="text-lg font-medium mb-6">Language Usage</h3>
                <div className="flex-1 space-y-5 overflow-y-auto">
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

              {/* Recent Commits */}
              <div 
                className={`p-6 bg-white/5 border border-white/10 h-[360px] flex flex-col ${getBorderRadius('card')}`}
              >
                <h3 className="text-lg font-medium mb-4">Recent Commits</h3>
                <div className="flex-1 space-y-4 overflow-y-auto">
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

              {/* Recent Repositories */}
              <div 
                className={`p-6 bg-white/5 border border-white/10 h-[360px] flex flex-col ${getBorderRadius('card')}`}
              >
                <h3 className="text-lg font-medium mb-4">Recent Repos</h3>
                <div className="flex-1 space-y-8 overflow-y-auto">
                  {githubLoading ? (
                    <div className="text-center py-4 opacity-60">Loading...</div>
                  ) : githubData?.recentRepos?.length > 0 ? (
                    githubData.recentRepos.slice(0, 4).map((repo, index) => (
                      <div key={index} className="text-left">
                        <div className="text-sm truncate mb-1">{repo.name}</div>
                        <div className="text-xs opacity-60">
                          {repo.language && <span>{repo.language} • </span>}
                          ⭐ {repo.stars}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 opacity-60">No repositories</div>
                  )}
                </div>
              </div>

            </div>

            {/* Activity Preview - Full Width */}
            <div 
              className={`p-6 bg-white/5 border border-white/10 ${getBorderRadius('card')}`}
            >
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              {githubLoading ? (
                <div className="text-center py-4 opacity-60">Loading...</div>
              ) : activity && activity.length > 0 ? (
                <div>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {activity.map((day, index) => {
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
                    last 2 weeks
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 opacity-60">No activity data</div>
              )}
            </div>
            
          </div>
        );

      case 'blog': {
        const sortedBlogPosts = [...blogPosts].sort((a, b) => {
          const parseDate = (dateStr) => {
            const [year, month, day] = dateStr.split('-');
            return new Date(year, month - 1, day);
          };
          return parseDate(b.date) - parseDate(a.date);
        });
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
                className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                loading="lazy"
                onClick={() => openLightbox(currentPost.media, 0)}
                title="Click to enlarge"
              />
            );
          }
          
          return null;
        };

        return (
          <div className="w-full">
            {/* Blog Post Card Layout - Matching Project Card Structure */}
            <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
              {/* Top Bar - Header with Blog Info and Navigation */}
              <div className="border-b border-white/10 bg-white/5">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* First Row: Date */}
                  <div className="p-4 pb-2 border-b border-white/5">
                    <div className="flex items-center justify-center">
                      <span className="text-xs opacity-60 bg-white/10 px-2 py-1 rounded-full whitespace-nowrap">
                        {(() => {
                          const [year, month, day] = currentPost.date.split('-');
                          const date = new Date(year, month - 1, day);
                          return date.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          });
                        })()}
                      </span>
                    </div>
                  </div>
                  {/* Second Row: Title */}
                  <div className="p-4 pt-2 border-b border-white/5">
                    <h2 className="text-lg font-bold text-center">{currentPost.title}</h2>
                  </div>
                  
                  {/* Third Row: Navigation Buttons */}
                  <div className="p-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => navigateBlogPosts(-1)}
                        className={`flex-1 px-3 py-2 border border-white/40 hover:bg-white/10 transition-all duration-300 text-sm text-center ${getBorderRadius('button')}`}
                      >
                        ← Previous
                      </button>
                      <span className="text-sm opacity-60 px-3">
                        {currentBlogIndex + 1} / {sortedBlogPosts.length}
                      </span>
                      <button
                        onClick={() => navigateBlogPosts(1)}
                        className={`flex-1 px-3 py-2 border border-white/40 hover:bg-white/10 transition-all duration-300 text-sm text-center ${getBorderRadius('button')}`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  {/* First Row: Navigation and Counters */}
                  <div className="flex justify-between items-center p-4 lg:p-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      {/* Navigation Arrows */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateBlogPosts(-1)}
                          className={`p-2 border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 ${getBorderRadius('button')}`}
                          title="Previous blog post"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigateBlogPosts(1)}
                          className={`p-2 border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 ${getBorderRadius('button')}`}
                          title="Next blog post"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm opacity-60 bg-white/10 px-2 py-1 rounded-full">
                          {(() => {
                            const [year, month, day] = currentPost.date.split('-');
                            const date = new Date(year, month - 1, day);
                            return date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            });
                          })()}
                        </span>
                        {/* Reading Time next to date */}
                        {currentPost.time && (
                          <span className="text-sm opacity-60 bg-white/10 px-2 py-1 rounded-full">
                            {currentPost.time}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Blog Counter */}
                      <div className="text-sm opacity-60">
                        {currentBlogIndex + 1} / {sortedBlogPosts.length}
                      </div>
                    </div>
                  </div>
                  
                  {/* Second Row: Title */}
                  <div className="p-4 lg:p-6 pt-4">
                    <h2 className="text-xl lg:text-2xl font-bold text-center">{currentPost.title}</h2>
                  </div>
                </div>
              </div>
              
              {/* Media Section with Caption - One unified section */}
              {currentPost.media && (
                <div className="w-full border-b border-white/10">
                  <div className="relative w-full h-[400px] lg:h-[500px]">
                    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center p-1">
                      {renderBlogMedia()}
                    </div>
                  </div>
                  {/* Media Caption */}
                  {currentPost.media.caption && (
                    <div className="px-4 py-2 bg-white/5 border-t border-white/10">
                      <p className="text-sm text-white/60 italic text-center">
                        {currentPost.media.caption}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Content Section - Compact Description & Tags (separate section with gap) */}
              <div className="bg-white/5 p-4 lg:p-6 mt-4">
                <div className="max-w-4xl mx-auto">
                  {/* Description */}
                  <p className="text-sm lg:text-base opacity-80 leading-relaxed text-center mb-4">
                    {currentPost.description}
                  </p>
                  
                  {/* Tags */}
                  {currentPost.tags && (
                    <div className="text-center">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {currentPost.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 bg-white/10 border border-white/20 text-xs opacity-80 hover:opacity-100 hover:bg-white/10 transition-all duration-200 ${getBorderRadius('small')}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Blog Body Section */}
              {currentPost.body && (
                <div className="p-6 lg:p-8">
                  <div className="text-left max-w-3xl mx-auto">
                    <div className="prose prose-invert max-w-none">
                      {currentPost.body.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-white/80 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        );
      }

      case 'contact':
        return (
          <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Contact Links */}
            
            <div>
              {/* All contact items in one grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {contentData.contact.items.map((item, index) => {
                  const isEmail = item.url.startsWith('mailto:');
                  
                  if (isEmail) {
                    return (
                      <button
                        key={index}
                        onClick={() => copyEmailToClipboard(item.text)}
                        className={`group relative block p-4 lg:p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer ${getBorderRadius('card')}`}
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
                          <p className="hidden lg:block text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
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
                      className={`group relative block p-4 lg:p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 ${getBorderRadius('card')}`}
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
                    <p className="hidden lg:block text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
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
            </div>
            {/* Available to Work Tag */}
            <div className="flex items-center justify-center animate-fade-in my-0">
              <div className="flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium tracking-wide">Available to work</span>
              </div>
            </div>
            {/* Contact Form */}
                  <div className={`p-6 lg:p-8 border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 ${getBorderRadius('card')}`}>
                    <div className="text-center mb-8">
                      
                      {/* Available for Hire Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
                        {contentData.contact.services.items.map((service, index) => (
                          <div 
                            key={index}
                            className={`group border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-lg text-center ${getBorderRadius('card')}`}
                          >
                            <div className="p-3 lg:p-4">
                              <h4 className="text-xs lg:text-sm font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                                {service.name}
                              </h4>
                              <p className="text-xs opacity-80 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
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
      
      {/* Lightbox Modal */}
      <Lightbox 
        showLightbox={showLightbox}
        lightboxImages={lightboxImages}
        lightboxImageIndex={lightboxImageIndex}
        closeLightbox={closeLightbox}
        navigateLightbox={navigateLightbox}
      />
      
      <div className="text-center w-full max-w-5xl relative z-10 mx-auto py-8">

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-2 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
          </div>
        </div>

        {/* Navigation Container */}
        <div className="mb-16">
          {/* Mobile Navigation */}
          <MobileMenu 
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
            trackSectionView={trackSectionView}
            currentProjectIndex={currentProjectIndex}
            navigateProjectsWithLoading={navigateProjectsWithLoading}
          />

          {/* Desktop Menu */}
          <DesktopMenu 
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            trackSectionView={trackSectionView}
            currentProjectIndex={currentProjectIndex}
            setCurrentProjectIndex={setCurrentProjectIndex}
            navigateProjectsWithLoading={navigateProjectsWithLoading}
            isScrolledIntoProject={isScrolledIntoProject}
            getBorderRadius={getBorderRadius}
          />
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
      
      {/* Floating Action Buttons - Bottom Right Overlay */}
      <FloatingButtons 
        showFloatingButtons={showFloatingButtons}
        showLightbox={showLightbox}
        setCurrentSection={setCurrentSection}
        trackSectionView={trackSectionView}
        getBorderRadius={getBorderRadius}
      />
    </div>
  );
}

export default ConsolePortfolio;