const express = require('express');
const Visitor = require('../models/Visitor');
const router = express.Router();

// Get visitor info (for admin/debugging)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const visitors = await Visitor.find()
      .sort({ lastVisit: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Visitor.countDocuments();

    res.json({
      visitors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

module.exports = router;