import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, CheckCircle, AlertTriangle, ShieldAlert, Building2, 
  BadgeCheck, BadgeX, MailCheck, MailWarning, MapPin, IndianRupee, Info,
  TrendingUp, TrendingDown, ExternalLink, Sparkles, ChevronRight
} from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { trustScore, reason, redFlags, companyDetailsMissing } = result;

  // Determine styles and messages based on score
  let ScoreIcon = CheckCircle;
  let scoreColor = 'text-[#22d3a5]';
  let badgeColor = 'bg-[#22d3a5]/10 text-[#22d3a5] border-[#22d3a5]/20';
  let scoreLabel = 'High Trust Rating';

  if (trustScore < 40) {
    ScoreIcon = ShieldAlert;
    scoreColor = 'text-red-500';
    badgeColor = 'bg-red-500/10 text-red-500 border-red-500/20';
    scoreLabel = 'Critical Risk Detected';
  } else if (trustScore < 75) {
    ScoreIcon = AlertTriangle;
    scoreColor = 'text-amber-500';
    badgeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    scoreLabel = 'Moderate Caution';
  }

  return (
    <div className="bg-[#131316] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl font-['Inter']">
      {/* Header/Score Section */}
      <div className="px-10 py-12 relative overflow-hidden bg-white/[0.02] border-b border-white/5">
        <div className={`absolute top-[-20%] right-[-10%] w-80 h-80 ${scoreColor.replace('text-', 'bg-')}/10 blur-[100px] rounded-full pointer-events-none`}></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10 w-full">
          <div className="space-y-6 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h2 className="text-2xl font-['Cabinet_Grotesk'] font-bold flex items-center justify-center md:justify-start gap-3 text-white tracking-tight">
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${scoreColor}`}>
                  <ScoreIcon size={24} />
                </div>
                AI Analysis Report
              </h2>
              <div className={`inline-flex px-3 py-1 rounded-full text-[10px] items-center gap-1.5 font-bold uppercase tracking-widest border ${badgeColor} self-center md:self-auto`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${scoreColor.replace('text-', 'bg-')}`} />
                {scoreLabel}
              </div>
            </div>
            <p className="text-[#8b8b99] max-w-xl leading-relaxed text-lg font-medium italic bg-white/5 p-5 rounded-2xl border border-white/5">
              "{reason}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <div className={`relative w-44 h-44 rounded-full flex items-center justify-center bg-white/5 border border-white/10`}>
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path
                  className="stroke-white/5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="2.5"
                />
                <motion.path
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - trustScore }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeDasharray="100, 100"
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
                  className="text-5xl font-['JetBrains_Mono'] font-bold tracking-tighter text-white block"
                >
                  {trustScore}%
                </motion.span>
                <span className="text-[10px] font-bold block text-[#55555f] uppercase tracking-widest mt-1">Trust Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-10 space-y-10">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Company Verification Card */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/5 flex flex-col hover:border-[#6366f1]/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Building2 size={80} className="text-white" />
            </div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20">
                  <Building2 size={20} />
                </div>
                <h3 className="font-bold text-[#8b8b99] text-[10px] uppercase tracking-widest">Company Identity</h3>
              </div>
              <ExternalLink size={16} className="text-[#55555f] group-hover:text-[#6366f1] transition-colors cursor-pointer" />
            </div>

            {result.companyName ? (
              <div className="space-y-4 relative z-10">
                <p className="text-white font-bold text-2xl tracking-tight">{result.companyName}</p>
                
                {result.companyVerified ? (
                  <div className="flex items-start gap-3 text-[#22d3a5] text-xs bg-[#22d3a5]/10 px-4 py-3 rounded-2xl border border-[#22d3a5]/20 font-medium">
                    <BadgeCheck size={18} className="shrink-0" />
                    <span>Legitimate organization detected with active digital presence.</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-red-400 text-xs bg-red-400/10 px-4 py-3 rounded-2xl border border-red-400/20 font-medium">
                    <BadgeX size={18} className="shrink-0" />
                    <span>Unverified identity. No reliable records found for this entity.</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  {result.companyDomainMatch === true ? (
                    <div className="flex items-center gap-2 text-[#22d3a5] text-[10px] font-bold uppercase tracking-widest">
                       <MailCheck size={14} /> <span>Domain Valid</span>
                    </div>
                  ) : result.companyDomainMatch === false ? (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                       <MailWarning size={14} /> <span>Invalid Domain</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="p-5 bg-white/5 rounded-2xl border border-white/5 text-[#55555f] text-xs font-medium text-center italic">
                Scanning engine was unable to identify a clear company name.
              </p>
            )}
          </div>

          {/* Salary Reality Check Card */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/5 flex flex-col hover:border-[#22d3a5]/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <IndianRupee size={80} className="text-white" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] flex items-center justify-center border border-[#22d3a5]/20">
                  <IndianRupee size={20} />
                </div>
                <h3 className="font-bold text-[#8b8b99] text-[10px] uppercase tracking-widest">Market Benchmarks</h3>
              </div>
              <TrendingUp size={16} className="text-[#55555f] group-hover:text-[#22d3a5] transition-colors" />
            </div>

            {result.salaryReport ? (
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#55555f] font-bold uppercase tracking-widest">Extracted</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-white">{result.salaryReport.extractedSalary || '---'}</span>
                  </div>
                  <div className="h-10 w-px bg-white/5" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#55555f] font-bold uppercase tracking-widest">Market Avg</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-white">{result.salaryReport.expectedRange || 'Varies'}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-2xl border font-medium text-sm leading-relaxed ${
                  result.salaryReport.isRealistic 
                    ? 'bg-[#22d3a5]/10 border-[#22d3a5]/20 text-[#22d3a5]' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p>{result.salaryReport.analysis}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-5 bg-white/5 rounded-2xl border border-white/5 text-[#55555f] text-xs font-medium text-center italic">
                No salary data was detected for market comparison.
              </p>
            )}
          </div>
        </div>

        {/* Scanner Flags */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-[#8b8b99] border border-white/10">
                <AlertCircle size={20} />
              </div>
              Scanner Audit Results
            </h3>
            {redFlags?.length > 0 && (
              <span className="text-[10px] bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg shadow-red-500/20 uppercase tracking-widest">
                {redFlags.length} Issues Detected
              </span>
            )}
          </div>

          <div className="space-y-4">
            {companyDetailsMissing && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-6 rounded-2xl text-sm flex items-start gap-4 font-medium"
              >
                <div className="p-2 bg-white/5 rounded-xl shadow-sm shrink-0 border border-amber-500/30">
                   <AlertTriangle size={20} />
                </div>
                <p className="mt-1">Company details are insufficient. This prevents full algorithmic verification of the poster's identity. Proceed with high caution.</p>
              </motion.div>
            )}

            {redFlags && redFlags.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redFlags.map((flag, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-[#8b8b99] group hover:border-red-500/30 hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:scale-110 transition-transform">
                      <ShieldAlert size={16} />
                    </div>
                    <span className="font-medium text-sm leading-tight group-hover:text-white transition-colors">{flag}</span>
                  </motion.div>
                ))}
              </div>
            ) : !companyDetailsMissing && (
              <div className="bg-[#22d3a5]/5 p-12 rounded-[2.5rem] border border-[#22d3a5]/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid opacity-5" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#22d3a5]/10 text-[#22d3a5] rounded-full flex items-center justify-center mb-6 border border-[#22d3a5]/20 relative">
                    <div className="absolute inset-0 bg-[#22d3a5] rounded-full animate-ping opacity-10" />
                    <CheckCircle size={32} />
                  </div>
                  <p className="text-[#22d3a5] font-bold uppercase tracking-widest text-xs mb-2">Clean Security Report</p>
                  <p className="text-[#8b8b99] font-medium text-sm max-w-sm leading-relaxed">No significant red flags were detected. This posting appears legitimate based on current analysis parameters.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
