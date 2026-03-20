const Groq = require('groq-sdk');

const analyzeJobPosting = async (jobText) => {
  try {
    const groq = new Groq({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
    Analyze the following job posting and determine its legitimacy. Look for common red flags such as:
    - Salaries that are unusually high for the role
    - Vague or generic job descriptions
    - Suspicious or missing company details
    - Poor grammar or unprofessional language
    - Requests for personal information early on
    
    In addition, extract the company name, the contact email (if present), the job role name, and the stated salary.
    Perform a "Salary Reality Check": evaluate if the extracted salary is realistic for that role based on industry standards in India.
    
    You must output ONLY valid JSON matching this exact structure:
    {
      "score": <number between 0 and 100, where 100 is highly trustworthy and 0 is complete scam>,
      "reason": "<A 2-3 sentence explanation for your score>",
      "redFlags": ["<flag 1>", "<flag 2>"],
      "companyDetailsMissing": <boolean>,
      "companyName": "<extracted company name, or null if missing>",
      "companyEmail": "<extracted company email, or null if missing>",
      "roleName": "<extracted job role/title, or null if missing>",
      "salaryReport": {
        "extractedSalary": "<the exact salary mentioned, or null if missing>",
        "expectedRange": "<expected salary range for this role in India, or null if unknown>",
        "isRealistic": <boolean, true if salary is realistic or if salary is missing>,
        "analysis": "<1-2 sentence analysis comparing the extracted salary vs reality in India>"
      }
    }
    
    Job Posting Details:
    """
    ${jobText}
    """
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert fraud detection AI specialized in identifying fake job postings. You only respond with strictly formatted JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Low temperature for more deterministic outputs
    });

    const resultString = response.choices[0]?.message?.content;
    const parsedResult = JSON.parse(resultString || "{}");

    return parsedResult;
  } catch (error) {
    console.error("Groq API Error:", error);
    return null;
  }
};

module.exports = {
  analyzeJobPosting
};
