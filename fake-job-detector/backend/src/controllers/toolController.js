const User = require('../models/User');
const toolService = require('../services/toolService');

const saveToHistory = async (userId, toolName, inputData, resultData) => {
  if (!userId) return;
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        history: {
          tool: toolName,
          data: inputData,
          result: resultData,
          date: new Date()
        }
      }
    });
  } catch (error) {
    console.error("Error saving history for tool:", toolName, error);
  }
};

const resumeAnalyze = async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;
    if (!resumeText) return res.status(400).json({ error: 'Resume text is required' });
    
    const result = await toolService.analyzeResume(resumeText, jobRole);
    if (req.user) await saveToHistory(req.user.id, 'resume-analyzer', { jobRole }, result);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const interviewPrep = async (req, res) => {
  try {
    const { role, experienceLevel } = req.body;
    if (!role) return res.status(400).json({ error: 'Role is required' });
    
    const result = await toolService.prepInterview(role, experienceLevel);
    if (req.user) await saveToHistory(req.user.id, 'interview-prep', { role, experienceLevel }, result);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const offerVerify = async (req, res) => {
  try {
    const { offerText } = req.body;
    if (!offerText) return res.status(400).json({ error: 'Offer letter text is required' });
    
    const result = await toolService.verifyOffer(offerText);
    if (req.user) await saveToHistory(req.user.id, 'offer-verifier', {}, result);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const salaryCheck = async (req, res) => {
  try {
    const { role, location, experience } = req.body;
    if (!role || !location) return res.status(400).json({ error: 'Role and location are required' });
    
    const result = await toolService.checkSalary(role, location, experience);
    if (req.user) await saveToHistory(req.user.id, 'salary-checker', { role, location, experience }, result);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  resumeAnalyze,
  interviewPrep,
  offerVerify,
  salaryCheck
};
