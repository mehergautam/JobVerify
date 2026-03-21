const express = require('express');
const router = express.Router();
const { resumeAnalyze, interviewPrep, offerVerify, salaryCheck } = require('../controllers/toolController');
const { resumeUploadMiddleware, resumeUploadAnalyze } = require('../controllers/resumeUploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/resume-analyze', protect, resumeAnalyze);
router.post('/resume-upload', protect, resumeUploadMiddleware, resumeUploadAnalyze);
router.post('/interview-prep', protect, interviewPrep);
router.post('/offer-verify', protect, offerVerify);
router.post('/salary-check', protect, salaryCheck);

module.exports = router;
