import { useState, useEffect } from 'react';

// Custom hook for tracking and managing stats
export const useStats = () => {
  const [stats, setStats] = useState({
    siteHits: 0,
    projectViews: {},
    sectionViews: {},
    lastVisit: null,
    totalSessions: 0
  });

  // Initialize stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('portfolio-stats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    
    // Track site hit (new session)
    trackSiteHit();
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('portfolio-stats', JSON.stringify(stats));
  }, [stats]);

  const trackSiteHit = () => {
    setStats(prev => ({
      ...prev,
      siteHits: prev.siteHits + 1,
      totalSessions: prev.totalSessions + 1,
      lastVisit: new Date().toISOString()
    }));
  };

  const trackProjectView = (projectName) => {
    setStats(prev => ({
      ...prev,
      projectViews: {
        ...prev.projectViews,
        [projectName]: (prev.projectViews[projectName] || 0) + 1
      }
    }));
  };

  const trackSectionView = (sectionName) => {
    setStats(prev => ({
      ...prev,
      sectionViews: {
        ...prev.sectionViews,
        [sectionName]: (prev.sectionViews[sectionName] || 0) + 1
      }
    }));
  };

  const resetStats = () => {
    const emptyStats = {
      siteHits: 0,
      projectViews: {},
      sectionViews: {},
      lastVisit: null,
      totalSessions: 0
    };
    setStats(emptyStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(emptyStats));
  };

  const getTopProjects = (limit = 5) => {
    const projectEntries = Object.entries(stats.projectViews);
    return projectEntries
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([name, views]) => ({ name, views }));
  };

  const getTopSections = (limit = 5) => {
    const sectionEntries = Object.entries(stats.sectionViews);
    return sectionEntries
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([name, views]) => ({ name, views }));
  };

  const getTotalProjectViews = () => {
    return Object.values(stats.projectViews).reduce((total, views) => total + views, 0);
  };

  const getTotalSectionViews = () => {
    return Object.values(stats.sectionViews).reduce((total, views) => total + views, 0);
  };

  return {
    stats,
    trackSiteHit,
    trackProjectView,
    trackSectionView,
    resetStats,
    getTopProjects,
    getTopSections,
    getTotalProjectViews,
    getTotalSectionViews
  };
};