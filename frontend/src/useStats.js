import { useState, useEffect, useRef, useCallback } from 'react';
import apiService from './services/api';

// Custom hook for tracking and managing stats
export const useStats = () => {
  const [stats, setStats] = useState({
    siteHits: 0,
    projectViews: {},
    sectionViews: {},
    lastVisit: null,
    totalSessions: 0
  });
  
  const [serverStats, setServerStats] = useState({
    totalVisitors: 0,
    totalSessions: 0,
    topProjects: [],
    topSections: [],
    recentVisitors: []
  });
  
  const [isOnline, setIsOnline] = useState(true);
  const [localStats, setLocalStats] = useState({
    projectViews: {},
    sectionViews: {}
  });
  
  // Debouncing refs
  const projectViewTimeouts = useRef({});
  const sectionViewTimeouts = useRef({});

  // Initialize stats and track visit on mount
  useEffect(() => {
    initializeStats();
  }, []);

  // Save local stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-local-stats', JSON.stringify(localStats));
  }, [localStats]);

  const initializeStats = async () => {
    // Load local backup stats
    const savedLocalStats = localStorage.getItem('portfolio-local-stats');
    if (savedLocalStats) {
      try {
        const parsedStats = JSON.parse(savedLocalStats);
        setLocalStats(parsedStats);
      } catch (error) {
        console.error('Error loading local stats:', error);
      }
    }

    // Load old localStorage stats for migration
    const savedStats = localStorage.getItem('portfolio-stats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    
    // Check if backend is available and track visit
    const healthCheck = await apiService.healthCheck();
    setIsOnline(healthCheck);
    
    if (healthCheck) {
      // Track the visit
      await apiService.trackVisit();
      // Load server stats
      await loadServerStats();
    } else {
      // Fallback to local stats
      trackSiteHitLocal();
    }
  };

  const loadServerStats = async () => {
    try {
      const data = await apiService.getStats();
      setServerStats(data);
    } catch (error) {
      console.error('Failed to load server stats:', error);
    }
  };

  const trackSiteHitLocal = () => {
    setStats(prev => ({
      ...prev,
      siteHits: prev.siteHits + 1,
      totalSessions: prev.totalSessions + 1,
      lastVisit: new Date().toISOString()
    }));
  };

  const trackProjectView = useCallback(async (projectName) => {
    // Always track locally for immediate feedback
    setLocalStats(prev => ({
      ...prev,
      projectViews: {
        ...prev.projectViews,
        [projectName]: (prev.projectViews[projectName] || 0) + 1
      }
    }));

    if (isOnline) {
      // Clear existing timeout for this project
      if (projectViewTimeouts.current[projectName]) {
        clearTimeout(projectViewTimeouts.current[projectName]);
      }
      
      // Debounce server tracking by 1 second
      projectViewTimeouts.current[projectName] = setTimeout(async () => {
        try {
          console.log('Tracking project view:', projectName);
          await apiService.trackProjectView(projectName);
          // Refresh server stats periodically
          if (Math.random() < 0.1) { // 10% chance to refresh
            loadServerStats();
          }
        } catch (error) {
          console.error('Failed to track project view:', error);
        }
        delete projectViewTimeouts.current[projectName];
      }, 1000);
    } else {
      // Fallback to old local method
      setStats(prev => ({
        ...prev,
        projectViews: {
          ...prev.projectViews,
          [projectName]: (prev.projectViews[projectName] || 0) + 1
        }
      }));
    }
  }, [isOnline]);

  const trackSectionView = useCallback(async (sectionName) => {
    // Always track locally for immediate feedback
    setLocalStats(prev => ({
      ...prev,
      sectionViews: {
        ...prev.sectionViews,
        [sectionName]: (prev.sectionViews[sectionName] || 0) + 1
      }
    }));

    if (isOnline) {
      // Clear existing timeout for this section
      if (sectionViewTimeouts.current[sectionName]) {
        clearTimeout(sectionViewTimeouts.current[sectionName]);
      }
      
      // Debounce server tracking by 1 second
      sectionViewTimeouts.current[sectionName] = setTimeout(async () => {
        try {
          console.log('Tracking section view:', sectionName);
          await apiService.trackSectionView(sectionName);
          // Refresh server stats periodically
          if (Math.random() < 0.1) { // 10% chance to refresh
            loadServerStats();
          }
        } catch (error) {
          console.error('Failed to track section view:', error);
        }
        delete sectionViewTimeouts.current[sectionName];
      }, 1000);
    } else {
      // Fallback to old local method
      setStats(prev => ({
        ...prev,
        sectionViews: {
          ...prev.sectionViews,
          [sectionName]: (prev.sectionViews[sectionName] || 0) + 1
        }
      }));
    }
  }, [isOnline]);

  const resetStats = () => {
    const emptyStats = {
      siteHits: 0,
      projectViews: {},
      sectionViews: {},
      lastVisit: null,
      totalSessions: 0
    };
    setStats(emptyStats);
    setLocalStats({ projectViews: {}, sectionViews: {} });
    localStorage.setItem('portfolio-stats', JSON.stringify(emptyStats));
    localStorage.setItem('portfolio-local-stats', JSON.stringify({ projectViews: {}, sectionViews: {} }));
  };

  const getTopProjects = (limit = 5) => {
    if (isOnline && serverStats.topProjects.length > 0) {
      return serverStats.topProjects.slice(0, limit);
    }
    
    // Fallback to local stats
    const projectViews = { ...stats.projectViews, ...localStats.projectViews };
    const projectEntries = Object.entries(projectViews);
    return projectEntries
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([name, views]) => ({ name, views }));
  };

  const getTopSections = (limit = 5) => {
    if (isOnline && serverStats.topSections.length > 0) {
      return serverStats.topSections.slice(0, limit);
    }
    
    // Fallback to local stats
    const sectionViews = { ...stats.sectionViews, ...localStats.sectionViews };
    const sectionEntries = Object.entries(sectionViews);
    return sectionEntries
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([name, views]) => ({ name, views }));
  };

  const getTotalProjectViews = () => {
    if (isOnline) {
      return serverStats.topProjects.reduce((total, project) => total + project.views, 0);
    }
    
    const projectViews = { ...stats.projectViews, ...localStats.projectViews };
    return Object.values(projectViews).reduce((total, views) => total + views, 0);
  };

  const getTotalSectionViews = () => {
    if (isOnline) {
      return serverStats.topSections.reduce((total, section) => total + section.views, 0);
    }
    
    const sectionViews = { ...stats.sectionViews, ...localStats.sectionViews };
    return Object.values(sectionViews).reduce((total, views) => total + views, 0);
  };

  // Create combined stats object for display
  const displayStats = {
    siteHits: isOnline ? serverStats.totalVisitors : stats.siteHits,
    totalSessions: isOnline ? serverStats.totalSessions : stats.totalSessions,
    lastVisit: stats.lastVisit,
    isOnline
  };

  return {
    stats: displayStats,
    serverStats,
    trackProjectView,
    trackSectionView,
    resetStats,
    getTopProjects,
    getTopSections,
    getTotalProjectViews,
    getTotalSectionViews,
    loadServerStats,
    isOnline
  };
};