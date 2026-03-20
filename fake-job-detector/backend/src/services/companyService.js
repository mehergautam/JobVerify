const axios = require('axios');

/**
 * Checks if a company exists using the free Clearbit Autocomplete API
 * @param {string} companyName - Name of the company to search
 * @returns {Promise<Object|null>} - Returns the matched company object or null
 */
const verifyCompany = async (companyName) => {
  if (!companyName) return null;
  
  try {
    const encodedName = encodeURIComponent(companyName);
    const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodedName}`);
    
    const results = response.data;
    if (results && results.length > 0) {
      // The first result is usually the best match
      return results[0];
    }
    return null;
  } catch (error) {
    console.error(`Company Verification API Error for ${companyName}:`, error.message);
    return null;
  }
};

/**
 * Verifies if the extracted email domain matches the verified company domain
 * @param {string} email - Email address from job post (e.g. hr@google.com)
 * @param {string} companyDomain - Domain from Clearbit (e.g. google.com)
 * @returns {boolean|null} - true if match, false if no match, null if data missing
 */
const verifyEmailDomain = (email, companyDomain) => {
  if (!email || !companyDomain) return null;
  
  try {
    const emailParts = email.trim().split('@');
    if (emailParts.length !== 2) return false;
    
    // Simple verification (e.g. "google.com" === "google.com")
    // Note: Could be improved to handle subdomains if needed
    return emailParts[1].toLowerCase() === companyDomain.toLowerCase();
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyCompany,
  verifyEmailDomain
};
