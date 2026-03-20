const { analyzeJobPosting } = require('../services/aiService');
const { verifyCompany, verifyEmailDomain } = require('../services/companyService');
const JobAnalysis = require('../models/JobAnalysis');

const analyzeJob = async (req, res) => {
  try {
    const { text, url } = req.body;

    if (!text && !url) {
      return res.status(400).json({ error: 'Please provide either text or a url' });
    }

    // In a real app we might scrape the URL if text is empty,
    // but for MVP we expect text to be provided or scraped by frontend
    if (!text) {
      return res.status(400).json({ error: 'Text content is required for analysis' });
    }

    // Call AI Service
    const aiResult = await analyzeJobPosting(text);

    if (!aiResult) {
      return res.status(500).json({ error: 'Failed to analyze job posting' });
    }

    // Attempt Company Verification
    let companyVerified = false;
    let companyDomainMatch = null;

    if (aiResult.companyName) {
      const companyData = await verifyCompany(aiResult.companyName);
      if (companyData) {
        companyVerified = true;
        // Check email domain match if both are available
        if (aiResult.companyEmail) {
          companyDomainMatch = verifyEmailDomain(aiResult.companyEmail, companyData.domain);
        }
      }
    }

    // Save result to MongoDB
    const newAnalysis = new JobAnalysis({
      originalText: text,
      url: url || null,
      trustScore: aiResult.score,
      reason: aiResult.reason,
      redFlags: aiResult.redFlags,
      companyDetailsMissing: aiResult.companyDetailsMissing,
      companyName: aiResult.companyName || null,
      companyVerified: companyVerified,
      companyDomainMatch: companyDomainMatch,
      salaryReport: aiResult.salaryReport || null
    });

    await newAnalysis.save();

    res.status(201).json(newAnalysis);

  } catch (error) {
    console.error('Error in analyzeJob controller:', error);
    res.status(500).json({ error: 'Internal server error during analysis' });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await JobAnalysis.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch analysis history' });
  }
};

module.exports = {
  analyzeJob,
  getHistory
};
