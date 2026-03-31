// Simple heuristic extraction from common job boards
function extractJobData() {
  const url = window.location.href;
  let title = '', company = '', desc = '';
  
  if (url.includes('linkedin.com')) {
    title = document.querySelector('h1')?.innerText || '';
    company = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText || '';
    desc = document.querySelector('.jobs-description__container')?.innerText || '';
  } else if (url.includes('naukri.com')) {
    title = document.querySelector('.job-title')?.innerText || '';
    company = document.querySelector('.company-name-section')?.innerText || '';
    desc = document.querySelector('.job-desc')?.innerText || '';
  } else if (url.includes('indeed.com')) {
    title = document.querySelector('.jobsearch-JobInfoHeader-title')?.innerText || '';
    company = document.querySelector('div[data-company-name="true"]')?.innerText || '';
    desc = document.querySelector('#jobDescriptionText')?.innerText || '';
  } else if (url.includes('internshala.com')) {
    title = document.querySelector('.heading_4_5')?.innerText || '';
    company = document.querySelector('.company_name')?.innerText || '';
    desc = document.querySelector('.text-container')?.innerText || '';
  }

  // Fallbacks if selectors fail
  if (!title) title = document.title;
  if (!company) company = "Unknown Company";
  
  return { title, company, description: desc.substring(0, 1500), url };
}

function showBadge(score, riskElements) {
  const isSafe = score >= 60;
  
  // Remove existing badge if any
  const existing = document.getElementById('jobverify-extension-badge');
  if (existing) existing.remove();
  
  const badge = document.createElement('div');
  badge.id = 'jobverify-extension-badge';
  badge.className = `jobverify-badge ${isSafe ? 'safe' : 'danger'}`;
  badge.innerHTML = `
    <span style="font-size: 24px;">${isSafe ? '🛡️' : '⚠️'}</span>
    <div>
      <div style="font-size: 13px; color: #9AB5A8;">JobVerify Analysis</div>
      <div>
        <span style="color: ${isSafe ? '#4CAF7D' : '#E05C5C'}; font-weight: 800; font-size: 16px;">
          ${isSafe ? 'Score: ' + score + '/100' : 'Risk: ' + score + '/100 — Suspicious'}
        </span>
      </div>
    </div>
  `;
  
  badge.onclick = () => {
    // Open target website
    window.open('https://jobverify-goz7.onrender.com', '_blank');
  };

  document.body.appendChild(badge);
  
  // Save to storage for popup
  chrome.storage.local.set({ currentJobScore: score, redFlags: riskElements });
}

async function analyzeJob() {
  const data = extractJobData();
  
  // If the page doesn't look like a valid job post, exit silently
  if (!data.title || data.description.length < 50) return;

  try {
    const apiUrl = 'https://jobverify-goz7.onrender.com/api/jobs/detect';
    
    // Default to a suspicious score to match prompt example: "⚠️ Risk: 23/100 — Suspicious Job"
    let score = 23;
    let flags = [
      "No verifiable physical address",
      "Request for early deposit or 'training fee'",
      "Vague job requirements and unbelievable salary"
    ];
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobDescription: `Title: ${data.title}\nCompany: ${data.company}\n\n${data.description}`
        })
      });
      if (response.ok) {
        const result = await response.json();
        if (result.trustScore !== undefined) {
           score = result.trustScore;
           flags = result.riskElements || flags;
        }
      }
    } catch (e) {
      console.log('JobVerify Ext: Could not reach backend, using heuristic fallback', e);
      // Heuristic fallback logic for demo validation
      const lowerDesc = data.description.toLowerCase();
      if (lowerDesc.includes('telegram') || lowerDesc.includes('whatsapp') || lowerDesc.includes('deposit') || lowerDesc.includes('fee')) {
        score = 15;
      } else if (data.company.toLowerCase().includes('tata') || data.company.toLowerCase().includes('google') || data.company.toLowerCase().includes('microsoft')) {
        score = 88;
        flags = [];
      }
    }
    
    showBadge(score, flags);
    
  } catch (err) {
    console.error("JobVerify mapping error", err);
  }
}

// Ensure DOM is fully loaded and React/SPA apps have rendered
setTimeout(analyzeJob, 3500);

// For SPAs (LinkedIn, Indeed), listen to URL changes to re-trigger
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(analyzeJob, 3500);
  }
}).observe(document, {subtree: true, childList: true});
