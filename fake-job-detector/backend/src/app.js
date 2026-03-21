const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const toolRoutes = require('./routes/toolRoutes');
const coverLetterRoutes = require('./routes/coverLetter');
const linkedinRoutes = require('./routes/linkedin');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/cover-letter', coverLetterRoutes);
app.use('/api/linkedin', linkedinRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

module.exports = app;
