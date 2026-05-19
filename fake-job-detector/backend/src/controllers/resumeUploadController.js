const multer = require('multer');
const pdfParseLib = require('pdf-parse');
const axios = require('axios');
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
    }

    if (!resumeText || resumeText.trim().length < 50) {
      console.log('PDF text not found or too short. Attempting OCR...');
      try {
        const base64pdf = 'data:application/pdf;base64,' + req.file.buffer.toString('base64');
        const params = new URLSearchParams();
        params.append('apikey', 'helloworld');
        params.append('base64Image', base64pdf);
        params.append('language', 'eng');
        const ocrRes = await axios.post('https://api.ocr.space/parse/image', params);
        if (ocrRes.data && ocrRes.data.ParsedResults && ocrRes.data.ParsedResults.length > 0) {
          resumeText = ocrRes.data.ParsedResults.map(p => p.ParsedText).join('\n');
        }
      } catch (ocrError) {
        console.error('OCR Error:', ocrError.message);
      }
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text even with OCR. Try RAW TEXT option instead.' });
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
