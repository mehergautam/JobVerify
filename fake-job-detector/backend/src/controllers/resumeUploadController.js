const multer = require('multer');
const pdfParseLib = require('pdf-parse');
const { analyzeResume } = require('../services/toolService');
const User = require('../models/User');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  },
});

const resumeUploadMiddleware = upload.single('resume');

const resumeUploadAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    let resumeText = '';
    try {
      const pdfData = await pdfParseLib(req.file.buffer);
      resumeText = pdfData.text;
    } catch (parseError) {
      console.error('PDF parse error:', parseError);
      return res.status(400).json({ error: 'Failed to extract text from PDF.' });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text. Try RAW TEXT option instead.' });
    }

    const jobRole = req.body.jobRole || '';
    const result = await analyzeResume(resumeText, jobRole);

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
    res.status(500).json({ error: 'Unexpected error. Please try again.' });
  }
};

module.exports = { resumeUploadMiddleware, resumeUploadAnalyze };
