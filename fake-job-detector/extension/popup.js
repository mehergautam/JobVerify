document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['currentJobScore', 'redFlags'], (data) => {
    const app = document.getElementById('app');
    
    if (data.currentJobScore === undefined) {
      app.innerHTML = `<div class="loading" style="padding: 20px;">No job posting detected.<br/><br/>Open a job on LinkedIn, Naukri, Indeed, or Internshala.</div>`;
      return;
    }
    
    const isSafe = data.currentJobScore >= 60;
    
    let html = `
      <div class="status-card ${isSafe ? 'safe' : 'danger'}">
        <div style="font-size: 36px; margin-bottom: 8px;">${isSafe ? '🛡️' : '⚠️'}</div>
        <div class="score">${data.currentJobScore}/100</div>
        <div style="font-size: 14px; font-weight: bold; color: ${isSafe ? '#4CAF7D' : '#E05C5C'}">${isSafe ? 'Likely Authentic' : 'Suspicious Job'}</div>
      </div>
    `;
    
    if (!isSafe && data.redFlags && data.redFlags.length > 0) {
      // deduplicate array if needed
      const uniqueFlags = [...new Set(data.redFlags)];
      
      html += `
        <h4 style="margin: 0 0 10px 0; color: #E05C5C; font-size: 12px; text-transform: uppercase;">Detected Red Flags:</h4>
        <ul class="red-flags">
          ${uniqueFlags.map(flag => `<li>• ${flag}</li>`).join('')}
        </ul>
      `;
    } else if (isSafe) {
      html += `
        <div style="text-align: center; color: #9AB5A8; font-size: 13px;">
          This job posting exhibits typical patterns of a legitimate listing.
        </div>
      `;
    }
    
    html += `
      <div style="margin-top: 20px;">
        <a href="https://jobverify-goz7.onrender.com" target="_blank" class="btn">
          Full Analysis on JobVerify
        </a>
      </div>
    `;
    
    app.innerHTML = html;
  });
});
