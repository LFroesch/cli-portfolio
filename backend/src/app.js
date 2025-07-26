const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5011;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 500 : 1000 // Increased for production
});
app.use(limiter);

// Stricter rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact submissions per hour
  message: { error: 'Too many contact submissions, please try again later' }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoURI);
    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error('L MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/contact', contactLimiter, require('./routes/contact'));
app.use('/api/github', require('./routes/github'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendPath));
  
  // Handle React routing, return index.html for non-API routes
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/health') || req.path.startsWith('/assets/')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=� Server running on port ${PORT}`);
    console.log(`=� Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

module.exports = app;