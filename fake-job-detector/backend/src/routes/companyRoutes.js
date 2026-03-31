const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let companiesData = [];
try {
  const dataPath = path.join(__dirname, '../data/indian_companies.json');
  companiesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error("Could not load indian_companies.json", err);
}

router.post('/', (req, res) => {
  const { companyName } = req.body;
  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  const query = companyName.toLowerCase().trim();

  // Try exact match first
  let match = companiesData.find(c => c.companyName.toLowerCase() === query);

  // If no exact match, try fuzzy (includes)
  if (!match) {
    match = companiesData.find(c => c.companyName.toLowerCase().includes(query) || query.includes(c.companyName.toLowerCase()));
  }

  if (match) {
    return res.json({
      isVerified: true,
      companyName: match.companyName,
      CIN: match.CIN,
      status: match.status,
      verificationScore: match.verificationScore
    });
  }

  return res.json({
    isVerified: false,
    warning: "Company not found in verified Indian database. Proceed with caution."
  });
});

module.exports = router;
