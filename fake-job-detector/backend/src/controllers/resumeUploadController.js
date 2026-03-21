const multer = require('multer');
const pdfParse = require('pdf-parse');
const { analyzeResume } = require('../services/toolService');
const User = require('../models/User');

// Store PDF in memory (no disk), max 10MB
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

const resumeUploadMiddleware = upload.single('resume');

const resumeUploadAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF buffer
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text from the PDF. Try pasting the resume text instead.' });
    }

    const jobRole = req.body.jobRole || '';

    // Call AI
    const result = await analyzeResume(resumeText, jobRole);

    // Save to user history if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          history: {
            tool: 'resume-analyzer',
            data: { jobRole, source: 'pdf', filename: req.file.originalname },
            result,
            date: new Date(),
          },
        },
      });
    }

    res.json({ ...result, extractedTextPreview: resumeText.slice(0, 300) });
  } catch (error) {
    console.error('PDF Analysis error:', error);
    if (error.message?.includes('Only PDF')) {
      return res.status(400).json({ error: 'Only PDF files are supported.' });
    }
    res.status(500).json({ error: 'Failed to parse or analyze the PDF.' });
  }
};

module.exports = { resumeUploadMiddleware, resumeUploadAnalyze };
