const express = require('express');
const router = express.Router();
const { analyzeJob, getHistory } = require('../controllers/jobController');

// POST /api/jobs/analyze
router.post('/analyze', analyzeJob);

// GET /api/jobs/history
router.get('/history', getHistory);

module.exports = router;
