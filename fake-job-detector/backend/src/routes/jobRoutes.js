const express = require('express');
const router = express.Router();
const { analyzeJob, getHistory } = require('../controllers/jobController');
const { optionalAuth } = require('../middleware/authMiddleware');

// POST /api/jobs/analyze
router.post('/analyze', optionalAuth, analyzeJob);

// GET /api/jobs/history
router.get('/history', getHistory);

module.exports = router;
