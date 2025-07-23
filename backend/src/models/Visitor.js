const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: String,
  firstVisit: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 1
  },
  projectViews: [{
    projectName: String,
    viewCount: { type: Number, default: 1 },
    lastViewed: { type: Date, default: Date.now }
  }],
  sectionViews: [{
    sectionName: String,
    viewCount: { type: Number, default: 1 },
    lastViewed: { type: Date, default: Date.now }
  }],
  referrer: String,
  country: String,
  region: String,
  city: String
}, {
  timestamps: true
});

// Index for performance
visitorSchema.index({ sessionId: 1 });
visitorSchema.index({ ipAddress: 1 });
visitorSchema.index({ firstVisit: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);