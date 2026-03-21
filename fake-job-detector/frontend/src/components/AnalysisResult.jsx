import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, CheckCircle, AlertTriangle, ShieldAlert, Building2, 
  BadgeCheck, BadgeX, MailCheck, MailWarning, MapPin, IndianRupee, Info,
  TrendingUp, TrendingDown, ExternalLink
} from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { trustScore, reason, redFlags, companyDetailsMissing } = result;

  // Determine styles and messages based on score
  let ScoreIcon = CheckCircle;
  let scoreColor = 'text-emerald-400';
  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  let scoreLabel = 'High Trust Rating';
  let glowColor = 'shadow-emerald-500/20';

  if (trustScore < 40) {
    ScoreIcon = ShieldAlert;
    scoreColor = 'text-red-400';
    badgeColor = 'bg-red-500/10 text-red-400 border-red-500/20';
    scoreLabel = 'Critical Risk Detected';
    glowColor = 'shadow-red-500/20';
  } else if (trustScore < 75) {
    ScoreIcon = AlertTriangle;
    scoreColor = 'text-amber-400';
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    scoreLabel = 'Moderate Caution Advised';
    glowColor = 'shadow-amber-500/20';
  }

  return (
    <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
      {/* Header/Score Section */}
      <div className="px-8 py-12 relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent border-b border-white/5">
        {/* Background glow matching the score color */}
        <div className={`absolute top-[-20%] right-[-10%] w-80 h-80 ${scoreColor.replace('text', 'bg')} opacity-[0.08] blur-[100px] rounded-full pointer-events-none animate-pulse-glow`}></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10 w-full">
          <div className="space-y-5 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h2 className="text-3xl font-black flex items-center justify-center md:justify-start gap-3 text-white tracking-tight">
                <ScoreIcon className={scoreColor} size={36} strokeWidth={2.5} />
                AI Analysis Report
              </h2>
              <div className={`inline-flex px-3.5 py-1.5 rounded-full text-[10px] items-center gap-1.5 font-black uppercase tracking-widest border ${badgeColor} shadow-lg self-center md:self-auto`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${scoreColor.replace('text', 'bg')}`} />
                {scoreLabel}
              </div>
            </div>
            <p className="text-slate-400 max-w-xl leading-relaxed text-lg font-medium italic">
              "{reason}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <div className={`relative w-44 h-44 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)] ${glowColor} border border-white/5`}>
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path
                  className="stroke-white/5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="2.5"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${trustScore}, 100` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`stroke-current ${scoreColor}`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-black tracking-tighter text-white block"
                >
                  {trustScore}%
                </motion.span>
                <span className="text-[10px] font-black block text-slate-500 uppercase tracking-[0.2em] mt-1">Trust Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8 space-y-10">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Company Verification Card */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col hover:bg-white/[0.07] transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <Building2 size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Company Identity</h3>
              </div>
              <ExternalLink size={14} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>

            {result.companyName ? (
              <div className="space-y-4">
                <p className="text-white font-black text-xl tracking-tight">{result.companyName}</p>
                
                {result.companyVerified ? (
                  <div className="flex items-start gap-3 text-emerald-400 text-sm bg-emerald-500/5 px-4 py-3 rounded-2xl border border-emerald-500/10 font-bold">
                    <BadgeCheck size={20} className="shrink-0 text-emerald-400" />
                    <span>Legitimate organization detected with active digital presence.</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-red-400 text-sm bg-red-500/5 px-4 py-3 rounded-2xl border border-red-500/10 font-bold">
                    <BadgeX size={20} className="shrink-0 text-red-400" />
                    <span>Unverified identity. No reliable records found for this entity.</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  {result.companyDomainMatch === true ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-black uppercase tracking-wider">
                       <MailCheck size={16} /> <span>Domain Valid</span>
                    </div>
                  ) : result.companyDomainMatch === false ? (
                    <div className="flex items-center gap-2 text-red-400 text-[11px] font-black uppercase tracking-wider">
                       <MailWarning size={16} /> <span>Mismatched Domain</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white/5 rounded-2xl text-slate-500 text-xs font-bold text-center italic">
                Scanning engine was unable to identify a clear company name.
              </div>
            )}
          </div>

          {/* Salary Reality Check Card */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col hover:bg-white/[0.07] transition-all group lg:mt-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <IndianRupee size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Market Benchmarks</h3>
              </div>
              <TrendingUp size={14} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>

            {result.salaryReport ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Extracted</span>
                    <span className="text-lg font-black text-white">{result.salaryReport.extractedSalary || 'Not Stated'}</span>
                  </div>
                  <div className="h-8 w-px bg-white/5" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Market Avg</span>
                    <span className="text-lg font-black text-white">{result.salaryReport.expectedRange || 'Varies'}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-2xl border font-bold text-sm leading-relaxed ${
                  result.salaryReport.isRealistic 
                    ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                    : 'bg-red-500/5 border-red-500/10 text-red-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <Info size={18} className="shrink-0 mt-0.5 opacity-80" />
                    <p>{result.salaryReport.analysis}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white/5 rounded-2xl text-slate-500 text-xs font-bold text-center italic">
                No salary data was detected for market comparison.
              </div>
            )}
          </div>
        </div>

        {/* Scanner Flags */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <AlertCircle size={20} className="text-violet-400" />
              Scanner Red Flags
            </h3>
            {redFlags?.length > 0 && (
              <span className="text-[10px] bg-red-500 text-white font-black px-2 py-0.5 rounded-full">
                {redFlags.length} ISSUES
              </span>
            )}
          </div>

          <div className="space-y-4">
            {companyDetailsMissing && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-amber-500/5 border border-amber-500/20 text-amber-400 px-5 py-4 rounded-2xl text-sm flex items-start gap-4 font-bold shadow-lg"
              >
                <AlertTriangle className="mt-0.5 shrink-0" size={20} />
                <p>Company details are critically insufficient. This prevents full algorithmic verification of the poster's identity.</p>
              </motion.div>
            )}

            {redFlags && redFlags.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {redFlags.map((flag, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white shadow-lg group hover:border-red-500/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 group-hover:scale-110 transition-transform">
                      <ShieldAlert size={16} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-sm leading-tight text-slate-300 group-hover:text-white transition-colors">{flag}</span>
                  </motion.div>
                ))}
              </div>
            ) : !companyDetailsMissing && (
              <div className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/10 text-center animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <CheckCircle size={24} className="text-emerald-400" />
                </div>
                <p className="text-emerald-400 font-black uppercase tracking-widest text-[11px] mb-1">Clean Report</p>
                <p className="text-slate-500 font-medium text-sm">No significant red flags were detected by the AI scanner. This posting appears legitimate based on current parameters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
