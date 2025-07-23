const express = require('express');
const GlobalStats = require('../models/GlobalStats');
const router = express.Router();

// Track visitor/session - NO personal data stored
router.post('/track-visit', async (req, res) => {
  try {
    // Get or create global stats document
    let globalStats = await GlobalStats.findById('global');
    
    if (!globalStats) {
      globalStats = new GlobalStats({
        _id: 'global',
        siteHits: 1,
        totalSessions: 1
      });
    } else {
      globalStats.siteHits += 1;
      globalStats.totalSessions += 1;
      globalStats.lastUpdated = new Date();
    }
    
    await globalStats.save();

    res.json({ 
      success: true,
      siteHits: globalStats.siteHits
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    // Don't fail silently - still return success for client
    res.json({ success: true, siteHits: 0 });
  }
});

// Track project view - Global stats only
router.post('/track-project', async (req, res) => {
  try {
    const { projectName } = req.body;
    
    if (!projectName) {
      return res.status(400).json({ error: 'Project name required' });
    }

    // Get or create global stats document
    let globalStats = await GlobalStats.findById('global');
    if (!globalStats) {
      globalStats = new GlobalStats({ _id: 'global' });
    }

    // Find existing project or create new one
    const existingProject = globalStats.projectViews.find(p => p.name === projectName);
    
    if (existingProject) {
      existingProject.views += 1;
    } else {
      globalStats.projectViews.push({
        name: projectName,
        views: 1
      });
    }

    globalStats.lastUpdated = new Date();
    await globalStats.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking project view:', error);
    res.json({ success: true }); // Don't fail silently
  }
});

// Track section view - Global stats only
router.post('/track-section', async (req, res) => {
  try {
    const { sectionName } = req.body;
    
    if (!sectionName) {
      return res.status(400).json({ error: 'Section name required' });
    }

    // Get or create global stats document
    let globalStats = await GlobalStats.findById('global');
    if (!globalStats) {
      globalStats = new GlobalStats({ _id: 'global' });
    }

    // Find existing section or create new one
    const existingSection = globalStats.sectionViews.find(s => s.name === sectionName);
    
    if (existingSection) {
      existingSection.views += 1;
    } else {
      globalStats.sectionViews.push({
        name: sectionName,
        views: 1
      });
    }

    globalStats.lastUpdated = new Date();
    await globalStats.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking section view:', error);
    res.json({ success: true }); // Don't fail silently
  }
});

// Get analytics data - Global stats only
router.get('/stats', async (req, res) => {
  try {
    // Get global stats document
    const globalStats = await GlobalStats.findById('global');
    
    if (!globalStats) {
      // Return default stats if none exist yet
      return res.json({
        totalVisitors: 0,
        totalSessions: 0,
        topProjects: [],
        topSections: [],
        recentVisitors: []
      });
    }

    // Sort projects and sections by views
    const topProjects = globalStats.projectViews
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
      
    const topSections = globalStats.sectionViews
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    res.json({
      totalVisitors: globalStats.siteHits,
      totalSessions: globalStats.totalSessions,
      topProjects,
      topSections,
      recentVisitors: [] // No longer tracking individual visitors
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    // Return empty stats instead of failing
    res.json({
      totalVisitors: 0,
      totalSessions: 0,
      topProjects: [],
      topSections: [],
      recentVisitors: []
    });
  }
});

module.exports = router;