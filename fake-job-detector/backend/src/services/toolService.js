const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.OPENAI_API_KEY,
});

const callGroq = async (systemPrompt, userPrompt) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });
    return JSON.parse(response.choices[0]?.message?.content || "{}");
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error('Failed to generate AI response');
  }
};

const analyzeResume = async (resumeText, jobRole) => {
  const systemPrompt = "You are an expert ATS (Applicant Tracking System) and senior recruiter. You only respond with strictly formatted JSON.";
  const userPrompt = `
    Analyze the following resume for the role of ${jobRole || 'General Professional'}.
    Extract key information and provide an ATS score out of 100.
    
    You must output ONLY valid JSON matching this exact structure:
    {
      "atsScore": <number 0-100>,
      "summary": "<2-3 sentence summary of the candidate>",
      "strengths": ["<strength 1>", "<strength 2>"],
      "weaknesses": ["<weakness 1>", "<weakness 2>"],
      "keywordsFound": ["<kw1>", "<kw2>"],
      "recommendations": ["<rec 1>", "<rec 2>"]
    }
    
    Resume Text:
    """
    ${resumeText}
    """
  `;
  return callGroq(systemPrompt, userPrompt);
};

const prepInterview = async (role, experienceLevel) => {
  const systemPrompt = "You are an expert technical and behavioral interviewer. You only respond with strictly formatted JSON.";
  const userPrompt = `
    Generate a mock interview preparation guide for a ${role} with ${experienceLevel} level of experience.
    
    You must output ONLY valid JSON matching this exact structure:
    {
      "roleContext": "<brief context on what interviewers look for in this role>",
      "technicalQuestions": [
        { "question": "...", "hint": "..." },
        { "question": "...", "hint": "..." }
      ],
      "behavioralQuestions": [
        { "question": "...", "hint": "..." }
      ],
      "generalTips": ["<tip 1>", "<tip 2>"]
    }
  `;
  return callGroq(systemPrompt, userPrompt);
};

const verifyOffer = async (offerText) => {
  const systemPrompt = "You are a legal HR compliance expert specializing in job offer evaluations. You only respond with strictly formatted JSON.";
  const userPrompt = `
    Analyze this job offer letter text. Check for standard clauses, red flags, and overall legitimacy.
    
    You must output ONLY valid JSON matching this exact structure:
    {
      "trustScore": <number 0-100>,
      "isLikelyLegitimate": <boolean>,
      "keyTerms": {
        "salary": "<extracted salary or 'Not Found'>",
        "role": "<extracted role or 'Not Found'>",
        "benefits": ["<benefit 1>"]
      },
      "redFlags": ["<flag 1>", "Missing standard clause XYZ..."],
      "recommendation": "<short advice for the candidate>"
    }
    
    Offer Letter Text:
    """
    ${offerText}
    """
  `;
  return callGroq(systemPrompt, userPrompt);
};

const checkSalary = async (role, location, experience) => {
  const systemPrompt = "You are an expert compensation analyst. You only respond with strictly formatted JSON.";
  const userPrompt = `
    Provide a realistic salary estimate for the following profile:
    Role: ${role}
    Location: ${location}
    Experience: ${experience || 'Mid-level'}
    
    Provide the numbers in the local currency of the location (e.g. INR for India, USD for US).
    
    You must output ONLY valid JSON matching this exact structure:
    {
      "currency": "<Currency Code e.g. INR, USD>",
      "lowEnd": <number>,
      "median": <number>,
      "highEnd": <number>,
      "marketDemand": "<High/Medium/Low>",
      "growthOutlook": "<1-2 sentences on trend>",
      "factors": ["<factor influencing pay>"]
    }
  `;
  return callGroq(systemPrompt, userPrompt);
};

module.exports = {
  analyzeResume,
  prepInterview,
  verifyOffer,
  checkSalary
};
