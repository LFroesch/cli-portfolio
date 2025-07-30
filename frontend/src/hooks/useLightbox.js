import { useState, useCallback } from 'react';
import { projects } from '../data';
import blogPosts from '../blogPosts.json';

export const useLightbox = (currentProjectIndex) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  // Lightbox functions - Updated to work with different image sources
  const openLightbox = useCallback((imageSource, startIndex = 0) => {
    let images = [];
    
    // Handle different image sources
    if (Array.isArray(imageSource)) {
      // Direct array of images (e.g., certificates)
      images = imageSource.map(img => ({
        url: img.url || img,
        alt: img.alt || 'Image',
        caption: img.caption
      }));
    } else if (imageSource && imageSource.url) {
      // Single image object (e.g., blog media)
      images = [{
        url: imageSource.url,
        alt: imageSource.alt || 'Image',
        caption: imageSource.caption
      }];
    } else if (typeof imageSource === 'number') {
      // Project media with media index (existing functionality)
      const currentProject = projects[currentProjectIndex];
      if (currentProject) {
        // Handle both single media objects and arrays of media
        const mediaArray = Array.isArray(currentProject.media) ? currentProject.media : [currentProject.media];
        
        // Filter to only include images (exclude videos)
        images = mediaArray.filter(media => media.type === 'image').map(media => ({
          url: media.url,
          alt: media.alt || `${currentProject.name} screenshot`,
          caption: media.caption
        }));
        
        // Find the corresponding image index for the given media index
        let imageIndex = 0;
        let mediaCount = 0;
        for (let i = 0; i < mediaArray.length; i++) {
          if (mediaArray[i].type === 'image') {
            if (mediaCount === imageSource) {
              imageIndex = images.findIndex(img => img.url === mediaArray[i].url);
              break;
            }
            mediaCount++;
          }
        }
        startIndex = Math.max(0, imageIndex);
      }
    }
    
    if (images.length > 0) {
      setLightboxImages(images);
      setLightboxImageIndex(Math.min(startIndex, images.length - 1));
      setShowLightbox(true);
    }
  }, [currentProjectIndex]);

  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
    setLightboxImages([]);
    setLightboxImageIndex(0);
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightboxImageIndex(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return lightboxImages.length - 1;
      if (newIndex >= lightboxImages.length) return 0;
      return newIndex;
    });
  }, [lightboxImages.length]);

  return {
    showLightbox,
    lightboxImages,
    lightboxImageIndex,
    openLightbox,
    closeLightbox,
    navigateLightbox
  };
};