import { useCallback } from 'react';
import { sections, projects } from '../data';

export const useNavigation = ({
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
}) => {
  // Navigation functions
  const navigateMenu = useCallback((direction) => {
    const currentIndex = sections.indexOf(currentSection);
    const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    const newSection = sections[newIndex];
    setCurrentSection(newSection);
    trackSectionView(newSection);
  }, [currentSection, setCurrentSection, trackSectionView]);

  const navigateProjects = useCallback((direction) => {
    const newIndex = (currentProjectIndex + direction + projects.length) % projects.length;
    setCurrentProjectIndex(newIndex);
    setCurrentMediaIndex(0); // Reset media index when changing projects
    trackProjectView(projects[newIndex].id);
  }, [currentProjectIndex, setCurrentProjectIndex, setCurrentMediaIndex, trackProjectView]);

  const navigateMedia = useCallback((direction) => {
    if (currentSection === 'projects' && projects[currentProjectIndex]) {
      const currentProject = projects[currentProjectIndex];
      const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
      const newIndex = (currentMediaIndex + direction + mediaArray.length) % mediaArray.length;
      setCurrentMediaIndex(newIndex);
    } else if (currentSection === 'blog' && Array.isArray(blogPosts) && blogPosts.length > 0) {
      const newIndex = (currentBlogIndex + direction + blogPosts.length) % blogPosts.length;
      setCurrentBlogIndex(newIndex);
    }
  }, [currentSection, currentProjectIndex, currentMediaIndex, setCurrentMediaIndex, currentBlogIndex, setCurrentBlogIndex]);

  // Keyboard event handler
  const handleKeyPress = useCallback((event) => {
    // Handle lightbox navigation first
    if (showLightbox) {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateLightbox(1);
      }
      return;
    }

    // Normal navigation when lightbox is closed
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (isScrolledIntoProject && currentSection === 'projects') {
        // If scrolled into project content, navigate photos instead of menu
        navigateMedia(-1);
      } else {
        navigateMenu(-1);
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (isScrolledIntoProject && currentSection === 'projects') {
        // If scrolled into project content, navigate photos instead of menu
        navigateMedia(1);
      } else {
        navigateMenu(1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (currentSection === 'projects') {
        navigateProjects(-1);
      } else if (currentSection === 'blog') {
        navigateMedia(-1);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (currentSection === 'projects') {
        navigateProjects(1);
      } else if (currentSection === 'blog') {
        navigateMedia(1);
      }
    }
  }, [
    showLightbox, 
    isScrolledIntoProject, 
    currentSection, 
    navigateMenu, 
    navigateMedia, 
    navigateProjects, 
    navigateLightbox,
    closeLightbox
  ]);

  return {
    navigateMenu,
    navigateProjects,
    navigateMedia,
    handleKeyPress
  };
};