const mongoose = require('mongoose');

const JobAnalysisSchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: null,
  },
  trustScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  reason: {
    type: String,
    required: true,
  },
  redFlags: {
    type: [String],
    default: [],
  },
  companyDetailsMissing: {
    type: Boolean,
    default: false,
  },
  companyName: {
    type: String,
    default: null,
  },
  companyVerified: {
    type: Boolean,
    default: false,
  },
  companyDomainMatch: {
    type: Boolean,
    default: null, // null means not checked or could not test
  },
  salaryReport: {
    extractedSalary: String,
    expectedRange: String,
    isRealistic: Boolean,
    analysis: String
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('JobAnalysis', JobAnalysisSchema);
