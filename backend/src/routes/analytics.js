const express = require('express');
const Visitor = require('../models/Visitor');
const router = express.Router();

// Generate session ID
const generateSessionId = () => {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Track visitor/session
router.post('/track-visit', async (req, res) => {
  try {
    const { sessionId: clientSessionId } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const referrer = req.get('Referrer');

    let sessionId = clientSessionId;
    
    // If no session ID provided, generate one
    if (!sessionId) {
      sessionId = generateSessionId();
    }

    // Check if visitor exists
    let visitor = await Visitor.findOne({ sessionId });
    
    if (visitor) {
      // Update existing visitor
      visitor.lastVisit = new Date();
      visitor.visitCount += 1;
      await visitor.save();
    } else {
      // Create new visitor
      visitor = new Visitor({
        sessionId,
        ipAddress,
        userAgent,
        referrer
      });
      await visitor.save();
    }

    res.json({ 
      success: true, 
      sessionId: visitor.sessionId,
      visitCount: visitor.visitCount 
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Track project view
router.post('/track-project', async (req, res) => {
  try {
    const { sessionId, projectName } = req.body;
    
    if (!sessionId || !projectName) {
      return res.status(400).json({ error: 'Session ID and project name required' });
    }

    const visitor = await Visitor.findOne({ sessionId });
    if (!visitor) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Find existing project view or create new one
    const existingView = visitor.projectViews.find(view => view.projectName === projectName);
    
    if (existingView) {
      existingView.viewCount += 1;
      existingView.lastViewed = new Date();
    } else {
      visitor.projectViews.push({
        projectName,
        viewCount: 1,
        lastViewed: new Date()
      });
    }

    await visitor.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking project view:', error);
    res.status(500).json({ error: 'Failed to track project view' });
  }
});

// Track section view
router.post('/track-section', async (req, res) => {
  try {
    const { sessionId, sectionName } = req.body;
    
    if (!sessionId || !sectionName) {
      return res.status(400).json({ error: 'Session ID and section name required' });
    }

    const visitor = await Visitor.findOne({ sessionId });
    if (!visitor) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Find existing section view or create new one
    const existingView = visitor.sectionViews.find(view => view.sectionName === sectionName);
    
    if (existingView) {
      existingView.viewCount += 1;
      existingView.lastViewed = new Date();
    } else {
      visitor.sectionViews.push({
        sectionName,
        viewCount: 1,
        lastViewed: new Date()
      });
    }

    await visitor.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking section view:', error);
    res.status(500).json({ error: 'Failed to track section view' });
  }
});

// Get analytics data
router.get('/stats', async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const totalSessions = await Visitor.aggregate([
      { $group: { _id: null, totalVisits: { $sum: '$visitCount' } } }
    ]);

    // Get top projects
    const topProjects = await Visitor.aggregate([
      { $unwind: '$projectViews' },
      { 
        $group: { 
          _id: '$projectViews.projectName', 
          totalViews: { $sum: '$projectViews.viewCount' }
        }
      },
      { $sort: { totalViews: -1 } },
      { $limit: 10 }
    ]);

    // Get top sections
    const topSections = await Visitor.aggregate([
      { $unwind: '$sectionViews' },
      { 
        $group: { 
          _id: '$sectionViews.sectionName', 
          totalViews: { $sum: '$sectionViews.viewCount' }
        }
      },
      { $sort: { totalViews: -1 } },
      { $limit: 10 }
    ]);

    // Recent visitors
    const recentVisitors = await Visitor.find()
      .sort({ lastVisit: -1 })
      .limit(10)
      .select('firstVisit lastVisit visitCount country region city');

    res.json({
      totalVisitors,
      totalSessions: totalSessions[0]?.totalVisits || 0,
      topProjects: topProjects.map(p => ({ name: p._id, views: p.totalViews })),
      topSections: topSections.map(s => ({ name: s._id, views: s.totalViews })),
      recentVisitors
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get analytics data' });
  }
});

module.exports = router;