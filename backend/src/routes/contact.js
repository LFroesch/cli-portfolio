const express = require('express');
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

// Cookie-based rate limiter middleware (1 submission per 5 minutes)
const cookieRateLimit = (req, res, next) => {
  const lastSubmission = req.cookies.lastContactSubmission;
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  if (lastSubmission && (now - parseInt(lastSubmission)) < fiveMinutes) {
    const timeLeft = Math.ceil((fiveMinutes - (now - parseInt(lastSubmission))) / 1000);
    return res.status(429).json({ 
      error: `Please wait ${Math.ceil(timeLeft / 60)} more minute(s) before submitting again` 
    });
  }
  
  next();
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact message
router.post('/send', cookieRateLimit, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return res.status(400).json({ error: 'Content too long' });
    }

    // Save to database
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

    await contactMessage.save();

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_EMAIL || 'lucas.froeschner@gmail.com',
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
                <h3 style="color: #495057; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
                <p><strong>Submission Details:</strong></p>
                <p>Time: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
          replyTo: email
        };

        await transporter.sendMail(mailOptions);
        
        contactMessage.status = 'sent';
        contactMessage.sentAt = new Date();
        await contactMessage.save();
        
        // Set cookie after successful submission
        res.cookie('lastContactSubmission', Date.now().toString(), {
          maxAge: 5 * 60 * 1000, // 5 minutes
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        res.json({ 
          success: true, 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        
        contactMessage.status = 'failed';
        contactMessage.failedReason = emailError.message;
        await contactMessage.save();
        
        // Set cookie even if email fails (message was saved)
        res.cookie('lastContactSubmission', Date.now().toString(), {
          maxAge: 5 * 60 * 1000, // 5 minutes
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        res.json({ 
          success: true, 
          message: 'Message received! There was an issue sending the email, but I\'ve saved your message and will respond soon.' 
        });
      }
    } else {
      // No email configured, just save the message
      res.cookie('lastContactSubmission', Date.now().toString(), {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      res.json({ 
        success: true, 
        message: 'Message saved! I\'ll review it and get back to you soon.' 
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process your message. Please try again.' });
  }
});

// Get contact messages (admin endpoint)
router.get('/messages', async (req, res) => {
  try {
    // Basic auth check (you might want to implement proper auth)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await ContactMessage.countDocuments();

    res.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;