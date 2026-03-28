import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, CheckCircle, AlertTriangle, ShieldAlert, Building2, 
  BadgeCheck, BadgeX, MailCheck, MailWarning, IndianRupee, Info,
  TrendingUp, ExternalLink
} from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { trustScore, reason, redFlags, companyDetailsMissing } = result;

  // Determine styles and messages based on score
  let ScoreIcon = CheckCircle;
  let scoreColor = 'text-[#4CAF7D]';
  let scoreBgClass = 'bg-[#183626]';
  let scoreBorder = 'border-[#2D6A4F]';
  let badgeColor = 'bg-[#183626] text-[#4CAF7D] border-[#2D6A4F]';
  let scoreLabel = 'High Trust Rating';

  if (trustScore < 40) {
    ScoreIcon = ShieldAlert;
    scoreColor = 'text-[#E05C5C]';
    scoreBgClass = 'bg-[#3A1818]';
    scoreBorder = 'border-[#702525]';
    badgeColor = 'bg-[#3A1818] text-[#E05C5C] border-[#702525]';
    scoreLabel = 'Critical Risk Detected';
  } else if (trustScore < 75) {
    ScoreIcon = AlertTriangle;
    scoreColor = 'text-[#E09B3D]';
    scoreBgClass = 'bg-[#362612]';
    scoreBorder = 'border-[#6B4B22]';
    badgeColor = 'bg-[#362612] text-[#E09B3D] border-[#6B4B22]';
    scoreLabel = 'Moderate Caution';
  }

  return (
    <div className="bg-[#1A2E25] rounded-2xl overflow-hidden border border-[#2D4A3E] shadow-2xl relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-bl-[100px] pointer-events-none" />
      
      {/* Header/Score Section */}
      <div className={`px-8 py-10 relative overflow-hidden bg-[#0D1813] border-b border-[#2D4A3E]`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className={`text-xl font-bold flex items-center justify-center md:justify-start gap-2.5 text-[#F5F0E8] tracking-tight`}>
                <div className={`p-2 rounded-xl ${scoreBgClass} border ${scoreBorder} ${scoreColor}`}>
                  <ScoreIcon size={22} />
                </div>
                SCAN RESULTS - ANALYZED JOB POSTING
              </h2>
              <div className={`inline-flex px-3 py-1 rounded-full text-[10px] items-center gap-1.5 font-bold uppercase tracking-widest border ${badgeColor} self-center md:self-auto`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${scoreColor.replace('text-', 'bg-')}`} />
                {scoreLabel}
              </div>
            </div>
            <p className="text-[#9AB5A8] max-w-xl leading-relaxed text-sm font-medium italic bg-[#1A2E25]/80 p-5 rounded-xl border border-[#2D4A3E]">
              "{reason}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <div className={`relative w-36 h-36 rounded-full flex items-center justify-center bg-[#0D1813] border ${scoreBorder} shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path
                  className="stroke-[#2D4A3E]"
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
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center mt-1">
                <span className="text-[9px] font-bold block text-[#9AB5A8] uppercase tracking-widest opacity-60">FRAUD RISK SCORE</span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-4xl font-['JetBrains_Mono'] font-bold tracking-tighter ${scoreColor} block leading-tight pt-1`}
                >
                  {trustScore}%
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8 space-y-8 relative z-10">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[#F5F0E8]">
          
          {/* Company Verification Card */}
          <div className="bg-[#0D1813]/60 p-6 rounded-2xl border border-[#2D4A3E] flex flex-col hover:border-[#C9A84C] transition-all group relative overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
               <Building2 size={80} className="text-[#F5F0E8]" />
            </div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1A2E25] text-[#C9A84C] flex items-center justify-center border border-[#3D5A4F]">
                  <Building2 size={18} />
                </div>
                <h3 className="font-bold text-[#6B8A7A] text-[10px] uppercase tracking-widest">Company Identity</h3>
              </div>
              <ExternalLink size={15} className="text-[#6B8A7A] group-hover:text-[#C9A84C] transition-colors cursor-pointer" />
            </div>

            {result.companyName ? (
              <div className="space-y-3 relative z-10">
                <p className="text-[#C9A84C] font-bold text-xl tracking-tight">{result.companyName}</p>
                
                {result.companyVerified ? (
                  <div className="flex items-start gap-2.5 text-[#4CAF7D] text-xs bg-[#183626] px-3 py-2.5 rounded-xl border border-[#2D6A4F] font-medium">
                    <BadgeCheck size={16} className="shrink-0" />
                    <span>Legitimate organization detected with active digital presence.</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-[#E05C5C] text-xs bg-[#3A1818] px-3 py-2.5 rounded-xl border border-[#702525] font-medium">
                    <BadgeX size={16} className="shrink-0" />
                    <span>Unverified identity. No reliable records found for this entity.</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-1">
                  {result.companyDomainMatch === true ? (
                    <div className="flex items-center gap-2 text-[#4CAF7D] text-[10px] font-bold uppercase tracking-widest bg-[#0D1813] px-2 py-1 border border-[#2D6A4F] rounded-md">
                       <MailCheck size={13} /> <span>Domain Valid</span>
                    </div>
                  ) : result.companyDomainMatch === false ? (
                    <div className="flex items-center gap-2 text-[#E05C5C] text-[10px] font-bold uppercase tracking-widest bg-[#0D1813] px-2 py-1 border border-[#702525] rounded-md">
                       <MailWarning size={13} /> <span>Invalid Domain</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="p-4 bg-[#1A2E25] rounded-xl border border-[#2D4A3E] text-[#6B8A7A] text-xs font-medium text-center italic">
                Scanning engine was unable to identify a clear company name.
              </p>
            )}
          </div>

          {/* Salary Reality Check Card */}
          <div className="bg-[#0D1813]/60 p-6 rounded-2xl border border-[#2D4A3E] flex flex-col hover:border-[#4CAF7D] transition-all group relative overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
               <IndianRupee size={80} className="text-[#F5F0E8]" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1A2E25] text-[#C9A84C] flex items-center justify-center border border-[#3D5A4F]">
                  <IndianRupee size={18} />
                </div>
                <h3 className="font-bold text-[#6B8A7A] text-[10px] uppercase tracking-widest">Market Benchmarks</h3>
              </div>
              <TrendingUp size={15} className="text-[#6B8A7A] group-hover:text-[#4CAF7D] transition-colors" />
            </div>

            {result.salaryReport ? (
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between bg-[#1A2E25] p-4 rounded-xl border border-[#3D5A4F] shadow-inner">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest">Extracted</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#F5F0E8]">{result.salaryReport.extractedSalary || '---'}</span>
                  </div>
                  <div className="h-10 w-px bg-[#3D5A4F]" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest">Market Avg</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#C9A84C]">{result.salaryReport.expectedRange || 'Varies'}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl border font-medium text-sm leading-relaxed ${
                  result.salaryReport.isRealistic 
                    ? 'bg-[#183626] border-[#2D6A4F] text-[#4CAF7D]' 
                    : 'bg-[#3A1818] border-[#702525] text-[#E05C5C]'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <Info size={16} className="shrink-0 mt-0.5 opacity-80" />
                    <p>{result.salaryReport.analysis}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-4 bg-[#1A2E25] rounded-xl border border-[#2D4A3E] text-[#6B8A7A] text-xs font-medium text-center italic">
                No salary data was detected for market comparison.
              </p>
            )}
          </div>
        </div>

        {/* Detailed Analysis Breakdown */}
        <div className="pt-6 border-t border-[#3D5A4F]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-[#F5F0E8] tracking-tight flex items-center gap-2.5 uppercase tracking-widest">
              WHY IS THIS {scoreLabel.toUpperCase()}? - DETAILED ANALYSIS
            </h3>
            {redFlags?.length > 0 && (
              <span className="text-[10px] bg-[#E05C5C] border border-[#FF8888] text-white font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(224,92,92,0.3)]">
                {redFlags.length} CRITICAL WARNINGS
              </span>
            )}
          </div>

          <div className="space-y-4">
            {companyDetailsMissing && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-[#362612] border border-[#6B4B22] text-[#F5D89A] p-5 rounded-xl text-sm flex items-start gap-3.5 font-medium shadow-md"
              >
                <div className="p-1.5 bg-[#1F1608] rounded-xl shrink-0 border border-[#6B4B22]">
                   <AlertTriangle size={18} className="text-[#E09B3D]" />
                </div>
                <p className="mt-0.5 text-[#E09B3D]">Company details are insufficient. This prevents full algorithmic verification of the poster's identity. Proceed with high caution.</p>
              </motion.div>
            )}

            {redFlags && redFlags.length > 0 ? (
              <div className="bg-[#0D1813] border border-[#2D4A3E] rounded-2xl p-6 shadow-md">
                <ul className="space-y-4">
                  {redFlags.map((flag, index) => {
                    const [title, ...descArr] = flag.split(':');
                    const desc = descArr.join(':');
                    return (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-start gap-3.5 text-sm"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#E05C5C] shadow-[0_0_8px_#E05C5C] shrink-0" />
                      <div className="font-medium leading-relaxed">
                        {desc ? (
                           <><span className="text-[#C9A84C] font-bold">{title}:</span><span className="text-[#9AB5A8] ml-1">{desc}</span></>
                        ) : (
                           <span className="text-[#9AB5A8]">{flag}</span>
                        )}
                      </div>
                    </motion.li>
                  )})}
                </ul>
              </div>
            ) : !companyDetailsMissing && (
              <div className="bg-[#0D1813] border border-[#2D4A3E] rounded-2xl p-6 shadow-md">
                <ul className="space-y-4">
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3.5 text-sm"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#4CAF7D] shadow-[0_0_8px_#4CAF7D] shrink-0" />
                      <div className="font-medium leading-relaxed">
                          <span className="text-[#C9A84C] font-bold">Standard Formatting:</span><span className="text-[#9AB5A8] ml-1">No unusual capitalization or punctuation detected.</span>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3.5 text-sm"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#4CAF7D] shadow-[0_0_8px_#4CAF7D] shrink-0" />
                      <div className="font-medium leading-relaxed">
                          <span className="text-[#C9A84C] font-bold">Requirements:</span><span className="text-[#9AB5A8] ml-1">Listed skills and experience align logically with expected industry standards.</span>
                      </div>
                    </motion.li>
                </ul>
              </div>
            )}
            
            <p className="text-[#3D5A4F] text-[10px] uppercase tracking-widest font-bold mt-4 border-t border-[#3D5A4F] pt-4 flex items-center gap-2">
               <ShieldAlert size={12} className="text-[#6B8A7A]" /> 
               JobVerify Algorithm applies multi-point cross reference validation. Always perform your own research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
