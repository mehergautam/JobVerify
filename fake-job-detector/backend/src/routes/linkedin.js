const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

router.post('/analyze', protect, async (req, res) => {
  const { headline, about, skills, connections, hasPhoto, hasFeatured, recentActivity } = req.body;
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `Analyze this LinkedIn profile for Indian job market. Return ONLY valid JSON, no other text:
Headline: ${headline}
About: ${about}
Skills: ${skills}
Connections: ${connections}
Has Photo: ${hasPhoto}
Has Featured: ${hasFeatured}
Recent Activity: ${recentActivity}

Return this exact structure:
{
  "overallScore": 0-100,
  "categories": {
    "headlineStrength": 0-100,
    "aboutSection": 0-100,
    "skillsRelevance": 0-100,
    "recruiterVisibility": 0-100,
    "profileCompleteness": 0-100,
    "engagementPotential": 0-100
  },
  "recommendations": [
    {"tip": "specific actionable tip", "impact": "High", "category": "Headline"}
  ]
}`
      }],
      max_tokens: 1000
    });
    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;
