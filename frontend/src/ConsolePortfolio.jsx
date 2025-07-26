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
import JumpToTop from './components/JumpToTop'
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
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  
  // Toggle section collapse
  const toggleSection = (sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  
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
  const { githubData, activity, loading: githubLoading } = useGitHubStats();

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
      // Handle lightbox navigation first
      if (showLightbox) {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            navigateLightbox(-1);
            break;
          case 'ArrowRight':
            e.preventDefault();
            navigateLightbox(1);
            break;
        }
        return; // Don't handle other navigation when lightbox is open
      }

      // Normal navigation when lightbox is closed
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
  }, [currentSection, currentProjectIndex, currentBlogIndex, showLightbox, lightboxImages.length, navigateMenu, navigateProjects]);

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

  // Lightbox functions - Updated to work with different image sources
  const openLightbox = (imageSource, imageIndex = 0, contextTitle = '') => {
    let imageArray = [];
    
    // Handle different image sources
    if (Array.isArray(imageSource)) {
      // Direct array of images (e.g., certificates)
      imageArray = imageSource.filter(item => 
        item.url && (item.type === 'image' || item.type === 'gif' || !item.type)
      );
    } else if (imageSource && typeof imageSource === 'object') {
      // Single image object (e.g., blog media)
      if (imageSource.type === 'image' && imageSource.url) {
        imageArray = [imageSource];
      }
    } else {
      // Project media (existing functionality)
      const currentProject = projects[currentProjectIndex];
      if (!currentProject.media) return;
      
      // Handle both single media objects and arrays of media
      const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
      
      // Filter to only include images (exclude videos)
      imageArray = mediaArray.filter(media => 
        media.type === 'image' || media.type === 'gif'
      );
      
      // Find the corresponding image index for the given media index
      let correctedIndex = 0;
      let imageCount = 0;
      for (let i = 0; i <= imageSource && i < mediaArray.length; i++) {
        if (mediaArray[i].type === 'image' || mediaArray[i].type === 'gif') {
          if (i === imageSource) {
            correctedIndex = imageCount;
            break;
          }
          imageCount++;
        }
      }
      imageIndex = correctedIndex;
    }
    
    if (imageArray.length === 0) return;
    
    setLightboxImages(imageArray);
    setLightboxImageIndex(Math.min(imageIndex, imageArray.length - 1));
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setLightboxImages([]);
    setLightboxImageIndex(0);
  };

  const navigateLightbox = (direction) => {
    setLightboxImageIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = lightboxImages.length - 1;
      } else if (newIndex >= lightboxImages.length) {
        newIndex = 0;
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
            {/* About Header */}
            <div className="mb-12">
              <button
                onClick={() => toggleSection('about-bio')}
                className="w-full group flex items-center gap-4 mb-8 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${collapsedSections['about-bio'] ? 'bg-white/20' : ''}`}>
                  <div className={`transition-transform duration-300 ${collapsedSections['about-bio'] ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
                  About
                </h3>
              </button>
              {!collapsedSections['about-bio'] && (
                <div className="animate-fade-in space-y-12">
                  {/* Photo and Text Sections */}
                  {contentData.about.sections.map((section, index) => {
                    const isLeftPhoto = index % 2 === 0; // Left for even indices (0, 2), Right for odd indices (1)
                    
                    return (
                      <div key={index} className={`flex flex-col ${isLeftPhoto ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
                        {/* Photo */}
                        <div className="flex-shrink-0">
                          <div className={`w-48 h-48 lg:w-56 lg:h-56 border-2 border-white/20 overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center ${getBorderRadius('card')}`}>
                            <img
                              src={section.photo.src}
                              alt={section.photo.alt}
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
                          {/* Photo Caption */}
                          <p className="text-center text-sm opacity-60 mt-2">
                            {section.photo.caption}
                          </p>
                        </div>
                        
                        {/* Text Content */}
                        <div className={`flex-1 text-center ${isLeftPhoto ? 'lg:text-left' : 'lg:text-right'}`}>
                          {section.paragraphs.map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex} className="text-xl lg:text-2xl opacity-90 leading-relaxed mb-6 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Learning Timeline */}
            <div className="mt-16">
              <button
                onClick={() => toggleSection('about-timeline')}
                className="w-full group flex items-center gap-4 mb-12 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${collapsedSections['about-timeline'] ? 'bg-white/20' : ''}`}>
                  <div className={`transition-transform duration-300 ${collapsedSections['about-timeline'] ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
                  Learning Journey
                </h3>
              </button>
              {!collapsedSections['about-timeline'] && (
                <div className="animate-fade-in">
                  <div className="relative max-w-4xl mx-auto">
                {/* Desktop Timeline Line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
                
                {/* Mobile Timeline Line */}
                <div className="md:hidden absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8 md:space-y-12">
                  {contentData.about.timeline.map((item, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Mobile Timeline Dot */}
                      <div className="md:hidden flex-shrink-0 w-12 flex justify-center">
                        <div className="w-3 h-3 bg-white/60 rounded-full border-2 border-black z-10 relative">
                          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`w-full md:w-6/12 text-left ${index % 2 === 0 ? 'md:text-right md:pr-6' : 'md:text-left md:pl-6'}`}>
                        <div className={`p-4 md:p-6 bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300 ${getBorderRadius('card')} ml-2 md:ml-0`}>
                          <div className="text-sm opacity-60 mb-2">{item.period}</div>
                          <h4 className="text-lg font-semibold mb-3 hyphens-auto">{item.title}</h4>
                          <p className="text-sm opacity-80 mb-4 leading-relaxed hyphens-auto">{item.description}</p>
                          <div className="flex flex-wrap gap-2 justify-start">
                            {item.tech.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className={`px-2 py-1 bg-white/10 border border-white/20 text-xs opacity-80 ${getBorderRadius('small')}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop Timeline Dot */}
                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className="w-4 h-4 bg-white/60 rounded-full border-4 border-black z-10 relative">
                          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Empty space for alignment - Hidden on mobile */}
                      <div className="hidden md:block w-6/12"></div>
                    </div>
                  ))}
                </div>
              </div>
                </div>
              )}
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <button
                onClick={() => toggleSection('about-faq')}
                className="w-full group flex items-center gap-4 mb-12 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${collapsedSections['about-faq'] ? 'bg-white/20' : ''}`}>
                  <div className={`transition-transform duration-300 ${collapsedSections['about-faq'] ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
                  {contentData.about.faq.title}
                </h3>
              </button>
              {!collapsedSections['about-faq'] && (
                <div className="animate-fade-in">
                  <p className="text-center text-lg opacity-80 leading-relaxed mb-12">
                    {contentData.about.faq.description}
                  </p>
              
              <div className="space-y-8">
                {contentData.about.faq.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={`border border-white/20 bg-white/5 ${getBorderRadius('card')}`}>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                        {section.category}
                      </h4>
                      
                      <div className="space-y-6">
                        {section.questions.map((qa, qaIndex) => (
                          <div key={qaIndex} className="text-left">
                            <h5 className="text-base lg:text-lg font-medium mb-3 text-white/90">
                              Q: {qa.question}
                            </h5>
                            <p className="text-sm lg:text-base opacity-80 leading-relaxed pl-4 border-l-2 border-white/20">
                              {qa.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                </div>
              )}
            </div>
            
            {/* Recommendations Section */}
            {/* <div className="mt-16">
              <button
                onClick={() => toggleSection('about-recommendations')}
                className="w-full group flex items-center gap-4 mb-8 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${collapsedSections['about-recommendations'] ? 'bg-white/20' : ''}`}>
                  <div className={`transition-transform duration-300 ${collapsedSections['about-recommendations'] ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
                  {contentData.about.recommendations.title}
                </h3>
              </button>
              {!collapsedSections['about-recommendations'] && (
                <div className="animate-fade-in">
                  <p className="text-center text-base lg:text-lg opacity-80 leading-relaxed mb-12">
                    {contentData.about.recommendations.description}
                  </p>
              
              <div className="space-y-8">
                {contentData.about.recommendations.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    {/* Category Header */}
                    {/* <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="text-xl lg:text-2xl">{category.icon}</div>
                      <h4 className="text-lg lg:text-xl font-bold">{category.name}</h4>
                    </div>
                    
                    {/* Tools Grid */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.items.map((tool, toolIndex) => (
                        <div 
                          key={toolIndex}
                          className={`group border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-lg text-center ${getBorderRadius('card')}`}
                        >
                          <div className="p-4">
                            <h5 className="text-sm lg:text-base font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                              {tool.name}
                            </h5>
                            <p className="text-xs lg:text-sm opacity-80 leading-relaxed">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                </div>
              )}
            </div> */}
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
            {/* Project Card Layout - Restructured */}
            <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
              {/* Top Bar - Header with Project Info and Actions */}
              <div className="border-b border-white/10 bg-white/5">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* First Row: Title and Status */}
                  <div className="p-4 border-b border-white/5">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-bold truncate flex-1">{currentProject.name}</h2>
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
                <div className="hidden lg:flex justify-between items-center p-4 lg:p-6">
                  <div className="flex items-center gap-4">
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateProjects(-1)}
                        className={`p-2 border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 ${getBorderRadius('button')}`}
                        title="Previous project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigateProjects(1)}
                        className={`p-2 border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 ${getBorderRadius('button')}`}
                        title="Next project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <h2 className="text-xl lg:text-2xl font-bold">{currentProject.name}</h2>
                    <span className="text-sm opacity-60 bg-white/10 px-2 py-1 rounded-full">
                      {currentProject.status || 'Completed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Project Counter */}
                    <div className="text-sm opacity-60">
                      {currentProjectIndex + 1} / {projects.length}
                    </div>
                    
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
              
              {/* Media Section - Prominent Display */}
              <div className="w-full">
                <div className="relative w-full h-[400px] lg:h-[500px]">
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
              
              {/* Content Section - Below Media */}
              <div className="p-6 lg:p-8 space-y-6">
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
            </div>
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
                  {/* <div 
                    className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors animate-slide-in ${getBorderRadius('card')}`}
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="text-2xl font-bold text-white">{githubData?.user?.followers || 0}</div>
                    <div className="text-sm opacity-80">followers</div>
                  </div> */}
                  {/* <div 
                    className={`p-4 bg-white/5 border border-white/20 text-center hover:bg-white/8 transition-colors animate-slide-in ${getBorderRadius('card')}`}
                    style={{ animationDelay: '0.2s' }}
                  >
                    <div className="text-2xl font-bold text-white">{githubData?.stats?.totalRepos || 0}</div>
                    <div className="text-sm opacity-80">repositories</div>
                  </div> */}
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
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
            
            <JumpToTop getBorderRadius={getBorderRadius} />
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
      {showLightbox && lightboxImages.length > 0 && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300 z-10"
            title="Close (ESC)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={lightboxImages[lightboxImageIndex]?.url}
              alt={lightboxImages[lightboxImageIndex]?.alt || `Image ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation arrows */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox(-1)}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
                  title="Previous image (←)"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateLightbox(1)}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
                  title="Next image (→)"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/70 text-white/90 text-sm rounded-full border border-white/20">
                  {lightboxImageIndex + 1} / {lightboxImages.length}
                </div>
              </>
            )}
          </div>
          
          {/* Caption */}
          {lightboxImages[lightboxImageIndex]?.caption && (
            <div className="absolute bottom-6 right-6 max-w-md p-3 bg-black/70 text-white/80 text-sm rounded-lg border border-white/20">
              {lightboxImages[lightboxImageIndex].caption}
            </div>
          )}
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}
      
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
                onClick={() => navigateProjects(-1)}
              >
                <div className="w-4 h-4 border-l-2 border-t-2 border-white/60 transform -rotate-45"></div>
              </button>
              <span className="text-white/70 text-sm">
                {currentProjectIndex + 1} / {projects.length}
              </span>
              <button 
                className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all"
                onClick={() => navigateProjects(1)}
              >
                <div className="w-4 h-4 border-r-2 border-t-2 border-white/60 transform rotate-45"></div>
              </button>
            </div>
          )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center gap-4 h-16 relative">
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
                  className={`relative text-lg font-light tracking-wider py-3 px-4 transition-all duration-500 cursor-pointer border min-w-[120px] text-center group ${getBorderRadius('button')} ${
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