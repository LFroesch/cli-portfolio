const mongoose = require('mongoose');

const globalStatsSchema = new mongoose.Schema({
  // Single document to store all global stats
  _id: {
    type: String,
    default: 'global'
  },
  siteHits: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  projectViews: [{
    name: String,
    views: { type: Number, default: 0 }
  }],
  sectionViews: [{
    name: String,
    views: { type: Number, default: 0 }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GlobalStats', globalStatsSchema);