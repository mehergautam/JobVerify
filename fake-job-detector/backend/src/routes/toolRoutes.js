const express = require('express');
const router = express.Router();
const { resumeAnalyze, interviewPrep, offerVerify, salaryCheck } = require('../controllers/toolController');
const { protect } = require('../middleware/authMiddleware');

// Using optional protect. If we want history to be saved only for logged in users, we can just optionally pass req.user.
// But we used `protect` which block unauthorized. Let's make a soft protect if we want anonymous users to use tools without history.
// However, the prompt says "Dashboard show kare user ke all tool results" and "Login/Signup system", 
// implying users should be logged in to use the platform. Let's enforce auth.

router.post('/resume-analyze', protect, resumeAnalyze);
router.post('/interview-prep', protect, interviewPrep);
router.post('/offer-verify', protect, offerVerify);
router.post('/salary-check', protect, salaryCheck);

module.exports = router;
