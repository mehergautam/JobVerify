const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', auth, async (req, res) => {
  const { jobTitle, company, jobDescription, skills, experience, tone } = req.body;
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `Write a ${tone} cover letter for ${experience} candidate applying for ${jobTitle} at ${company}.
Job Description: ${jobDescription}
Candidate Skills: ${skills}
Requirements:
- India-specific professional tone
- 3 paragraphs: intro + why I fit + closing
- 250-300 words exactly
- Start with "Dear Hiring Manager,"
- No placeholders, write complete letter`
      }],
      max_tokens: 1000
    });
    res.json({ coverLetter: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Generation failed' });
  }
});

module.exports = router;
