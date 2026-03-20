import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, ShieldAlert, Building2, BadgeCheck, BadgeX, MailCheck, MailWarning, MapPin, IndianRupee, Info } from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { trustScore, reason, redFlags, companyDetailsMissing } = result;

  // Determine styles and messages based on score
  let ScoreIcon = CheckCircle;
  let scoreColor = 'text-emerald';
  let badgeColor = 'bg-emerald/10 text-emerald-dark border-emerald/20';
  let scoreLabel = 'High Trust';

  if (trustScore < 40) {
    ScoreIcon = ShieldAlert;
    scoreColor = 'text-coral';
    badgeColor = 'bg-coral/10 text-coral-dark border-coral/20';
    scoreLabel = 'High Risk - Scam Likely';
  } else if (trustScore < 75) {
    ScoreIcon = AlertTriangle;
    scoreColor = 'text-amber-500';
    badgeColor = 'bg-amber/10 text-amber-800 border-amber/20';
    scoreLabel = 'Moderate Risk - Exercise Caution';
  }

  return (
    <div className="glass-card overflow-hidden h-full flex flex-col">
      {/* Header/Score Section */}
      <div className={`px-8 py-10 border-b border-slate-100 relative overflow-hidden bg-gradient-to-br from-white to-slate-50`}>
        {/* Background glow matching the score color */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${scoreColor.replace('text', 'bg')} opacity-[0.05] blur-3xl rounded-full pointer-events-none`}></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
          <div className="space-y-3 text-center md:text-left flex-1">
            <h2 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-2.5 text-slate-900">
              <ScoreIcon className={scoreColor} size={32} strokeWidth={2.5} />
              Analysis Result
            </h2>
            <div className={`inline-block px-3.5 py-1.5 rounded-full text-sm font-bold border ${badgeColor} shadow-sm`}>
              {scoreLabel}
            </div>
            <p className="text-slate-600 max-w-xl mt-4 leading-relaxed tracking-wide text-lg">
              {reason}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative w-40 h-40">
              {/* Circular progress could be implemented here, simple score for now */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                />
                <path
                  className={`stroke-current ${scoreColor}`}
                  strokeDasharray={`${trustScore}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-slate-900">
                <span className="text-4xl font-black tracking-tight">{trustScore}</span>
                <span className="text-sm font-semibold block text-slate-400 -mt-1 uppercase tracking-widest">Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8 bg-white space-y-8">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Company Verification Card */}
          <div className="bg-slate-50 p-5 rounded-[12px] border border-slate-100 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={20} className="text-navy" />
                <h3 className="font-bold text-navy text-base">Company Identity</h3>
              </div>
              {result.companyName ? (
                <div className="space-y-3">
                  <p className="text-navy font-bold text-lg">{result.companyName}</p>
                  
                  {result.companyVerified ? (
                    <div className="flex items-start gap-2.5 text-emerald-dark text-sm bg-emerald/10 px-3 py-2 rounded-lg border border-emerald/20 font-medium">
                      <BadgeCheck size={18} className="shrink-0 text-emerald" />
                      <span><strong>Verified:</strong> Recognized digital footprint.</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 text-amber-800 text-sm bg-amber/10 px-3 py-2 rounded-lg border border-amber/20 font-medium">
                      <BadgeX size={18} className="shrink-0 text-amber-500" />
                      <span><strong>Unverified:</strong> No reliable digital presence found.</span>
                    </div>
                  )}

                  {result.companyDomainMatch === true && (
                    <div className="flex items-center gap-2 text-emerald text-sm mt-2 font-semibold">
                       <MailCheck size={16} /> <span>Domain match.</span>
                    </div>
                  )}
                  {result.companyDomainMatch === false && (
                    <div className="flex items-center gap-2 text-coral text-sm mt-2 font-semibold">
                       <MailWarning size={16} /> <span>Mismatched or public email.</span>
                    </div>
                  )}

                </div>
              ) : (
                <p className="text-slate-500 text-sm font-medium">No company name was found in the posting.</p>
              )}
            </div>
          </div>

          {/* Salary Reality Check Card */}
          <div className="bg-slate-50 p-5 rounded-[12px] border border-slate-100 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={20} className="text-navy" />
                <h3 className="font-bold text-navy text-base">Salary Reality Check</h3>
              </div>
              {result.salaryReport ? (
                <div className="space-y-3 text-sm font-medium">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Extracted:</span>
                    <span className="font-bold text-navy">{result.salaryReport.extractedSalary || 'None stated'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mt-2">
                    <span className="text-slate-500">Expected:</span>
                    <span className="font-bold text-navy">{result.salaryReport.expectedRange || 'Unknown'}</span>
                  </div>
                  
                  <div className={`mt-3 p-3 rounded-lg border font-medium text-xs ${
                    result.salaryReport.isRealistic 
                      ? 'bg-emerald/10 border-emerald/20 text-emerald-dark' 
                      : 'bg-coral/10 border-coral/20 text-coral-dark'
                  }`}>
                    <div className="flex items-start gap-1.5">
                      <Info size={18} className="shrink-0 mt-0.5 opacity-80" />
                      <p className="leading-relaxed">{result.salaryReport.analysis}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-sm font-medium">No salary information available for verification.</p>
              )}
            </div>
          </div>

        </div>

        {/* Existing Red Flags */}
        <div className="pt-2 border-t border-slate-200">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2 mt-2">
            <AlertCircle size={20} className="text-navy" />
            Scanner Flags
          </h3>

        {companyDetailsMissing && (
          <div className="mb-4 bg-amber/10 border border-amber/20 text-amber-800 px-4 py-3 rounded-xl text-sm flex items-start gap-2.5 font-medium shadow-sm">
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={18} />
            <p><strong>Warning:</strong> Missing significant company details.</p>
          </div>
        )}

        {redFlags && redFlags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {redFlags.map((flag, index) => (
              <div key={index} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-coral border border-coral-dark text-white shadow-sm text-xs max-w-full">
                <ShieldAlert size={14} className="text-white shrink-0" />
                <span className="font-semibold whitespace-normal">{flag}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-500 font-medium">No major red flags detected. However, always exercise standard caution.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
