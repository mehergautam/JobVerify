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
  let scoreColor = 'text-[#4CAF7D]';
  let scoreBgClass = 'bg-[#EDFAF3]';
  let scoreBorder = 'border-[#A8DFC4]';
  let badgeColor = 'bg-[#EDFAF3] text-[#4CAF7D] border-[#A8DFC4]';
  let scoreLabel = 'High Trust Rating';

  if (trustScore < 40) {
    ScoreIcon = ShieldAlert;
    scoreColor = 'text-[#E05C5C]';
    scoreBgClass = 'bg-[#FDEFEF]';
    scoreBorder = 'border-[#F5BABA]';
    badgeColor = 'bg-[#FDEFEF] text-[#E05C5C] border-[#F5BABA]';
    scoreLabel = 'Critical Risk Detected';
  } else if (trustScore < 75) {
    ScoreIcon = AlertTriangle;
    scoreColor = 'text-[#E09B3D]';
    scoreBgClass = 'bg-[#FEF6E7]';
    scoreBorder = 'border-[#F5D89A]';
    badgeColor = 'bg-[#FEF6E7] text-[#E09B3D] border-[#F5D89A]';
    scoreLabel = 'Moderate Caution';
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E0D0] shadow-sm">
      {/* Header/Score Section */}
      <div className={`px-8 py-10 relative overflow-hidden ${scoreBgClass} border-b ${scoreBorder}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className={`text-xl font-bold flex items-center justify-center md:justify-start gap-2.5 text-[#1A2E25] tracking-tight`}>
                <div className={`p-2 rounded-xl ${scoreBgClass} border ${scoreBorder} ${scoreColor}`}>
                  <ScoreIcon size={22} />
                </div>
                AI Analysis Report
              </h2>
              <div className={`inline-flex px-3 py-1 rounded-full text-[10px] items-center gap-1.5 font-bold uppercase tracking-widest border ${badgeColor} self-center md:self-auto`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${scoreColor.replace('text-', 'bg-')}`} />
                {scoreLabel}
              </div>
            </div>
            <p className="text-[#6B8A7A] max-w-xl leading-relaxed text-base font-medium italic bg-white/70 p-4 rounded-xl border border-[#E8E0D0]">
              "{reason}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <div className={`relative w-36 h-36 rounded-full flex items-center justify-center bg-white border ${scoreBorder}`}>
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path
                  className={scoreBorder.replace('border-', 'stroke-')}
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
                  className={`text-4xl font-['JetBrains_Mono'] font-bold tracking-tighter ${scoreColor} block`}
                >
                  {trustScore}%
                </motion.span>
                <span className="text-[10px] font-bold block text-[#9AB5A8] uppercase tracking-widest mt-1">Trust Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8 space-y-8">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Company Verification Card */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E0D0] flex flex-col hover:border-[#C9A84C] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Building2 size={70} className="text-[#2D4A3E]" />
            </div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F0F5F3] text-[#2D4A3E] flex items-center justify-center border border-[#C4D8D0]">
                  <Building2 size={18} />
                </div>
                <h3 className="font-bold text-[#9AB5A8] text-[10px] uppercase tracking-widest">Company Identity</h3>
              </div>
              <ExternalLink size={15} className="text-[#9AB5A8] group-hover:text-[#C9A84C] transition-colors cursor-pointer" />
            </div>

            {result.companyName ? (
              <div className="space-y-3 relative z-10">
                <p className="text-[#1A2E25] font-bold text-xl tracking-tight">{result.companyName}</p>
                
                {result.companyVerified ? (
                  <div className="flex items-start gap-2.5 text-[#4CAF7D] text-xs bg-[#EDFAF3] px-3 py-2.5 rounded-xl border border-[#A8DFC4] font-medium">
                    <BadgeCheck size={16} className="shrink-0" />
                    <span>Legitimate organization detected with active digital presence.</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-[#E05C5C] text-xs bg-[#FDEFEF] px-3 py-2.5 rounded-xl border border-[#F5BABA] font-medium">
                    <BadgeX size={16} className="shrink-0" />
                    <span>Unverified identity. No reliable records found for this entity.</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-1">
                  {result.companyDomainMatch === true ? (
                    <div className="flex items-center gap-2 text-[#4CAF7D] text-[10px] font-bold uppercase tracking-widest">
                       <MailCheck size={13} /> <span>Domain Valid</span>
                    </div>
                  ) : result.companyDomainMatch === false ? (
                    <div className="flex items-center gap-2 text-[#E05C5C] text-[10px] font-bold uppercase tracking-widest">
                       <MailWarning size={13} /> <span>Invalid Domain</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="p-4 bg-white rounded-xl border border-[#E8E0D0] text-[#9AB5A8] text-xs font-medium text-center italic">
                Scanning engine was unable to identify a clear company name.
              </p>
            )}
          </div>

          {/* Salary Reality Check Card */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E0D0] flex flex-col hover:border-[#4CAF7D] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <IndianRupee size={70} className="text-[#4CAF7D]" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EDFAF3] text-[#4CAF7D] flex items-center justify-center border border-[#A8DFC4]">
                  <IndianRupee size={18} />
                </div>
                <h3 className="font-bold text-[#9AB5A8] text-[10px] uppercase tracking-widest">Market Benchmarks</h3>
              </div>
              <TrendingUp size={15} className="text-[#9AB5A8] group-hover:text-[#4CAF7D] transition-colors" />
            </div>

            {result.salaryReport ? (
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E8E0D0]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest">Extracted</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#1A2E25]">{result.salaryReport.extractedSalary || '---'}</span>
                  </div>
                  <div className="h-10 w-px bg-[#E8E0D0]" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest">Market Avg</span>
                    <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#1A2E25]">{result.salaryReport.expectedRange || 'Varies'}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl border font-medium text-sm leading-relaxed ${
                  result.salaryReport.isRealistic 
                    ? 'bg-[#EDFAF3] border-[#A8DFC4] text-[#4CAF7D]' 
                    : 'bg-[#FDEFEF] border-[#F5BABA] text-[#E05C5C]'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p>{result.salaryReport.analysis}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-4 bg-white rounded-xl border border-[#E8E0D0] text-[#9AB5A8] text-xs font-medium text-center italic">
                No salary data was detected for market comparison.
              </p>
            )}
          </div>
        </div>

        {/* Scanner Flags */}
        <div className="pt-6 border-t border-[#E8E0D0]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#1A2E25] tracking-tight flex items-center gap-2.5">
              <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#6B8A7A] border border-[#E8E0D0]">
                <AlertCircle size={18} />
              </div>
              Scanner Audit Results
            </h3>
            {redFlags?.length > 0 && (
              <span className="text-[10px] bg-[#E05C5C] text-white font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {redFlags.length} Issues Detected
              </span>
            )}
          </div>

          <div className="space-y-3">
            {companyDetailsMissing && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-[#FEF6E7] border border-[#F5D89A] text-[#E09B3D] p-5 rounded-2xl text-sm flex items-start gap-3.5 font-medium"
              >
                <div className="p-1.5 bg-white rounded-xl shrink-0 border border-[#F5D89A]">
                   <AlertTriangle size={18} />
                </div>
                <p className="mt-0.5">Company details are insufficient. This prevents full algorithmic verification of the poster's identity. Proceed with high caution.</p>
              </motion.div>
            )}

            {redFlags && redFlags.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {redFlags.map((flag, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3.5 px-5 py-3.5 rounded-xl bg-[#FDEFEF] border border-[#F5BABA] text-[#6B8A7A] group hover:border-[#E05C5C] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#E05C5C] flex items-center justify-center shrink-0 border border-[#F5BABA] group-hover:scale-110 transition-transform">
                      <ShieldAlert size={15} />
                    </div>
                    <span className="font-medium text-sm leading-tight text-[#C04040] group-hover:text-[#A03030] transition-colors">{flag}</span>
                  </motion.div>
                ))}
              </div>
            ) : !companyDetailsMissing && (
              <div className="bg-[#EDFAF3] p-10 rounded-2xl border border-[#A8DFC4] text-center relative overflow-hidden">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white text-[#4CAF7D] rounded-full flex items-center justify-center mb-4 border border-[#A8DFC4] relative">
                    <div className="absolute inset-0 bg-[#4CAF7D] rounded-full animate-ping opacity-10" />
                    <CheckCircle size={28} />
                  </div>
                  <p className="text-[#4CAF7D] font-bold uppercase tracking-widest text-xs mb-2">Clean Security Report</p>
                  <p className="text-[#6B8A7A] font-medium text-sm max-w-sm leading-relaxed">No significant red flags were detected. This posting appears legitimate based on current analysis parameters.</p>
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
