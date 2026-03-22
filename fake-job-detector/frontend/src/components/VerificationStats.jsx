import React from 'react';
import { Target, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const VerificationStats = ({ history = [] }) => {
  const total = history.length;
  const legitimate = history.filter(item => item.trustScore >= 75).length;
  const warnings = history.filter(item => item.trustScore >= 40 && item.trustScore < 75).length;
  const fake = history.filter(item => item.trustScore < 40).length;

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E8E0D0] shadow-sm transition-all">
      <h3 className="text-[10px] font-bold text-[#9AB5A8] tracking-[0.2em] mb-5 uppercase pl-1">Global Insights</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Total Scans */}
        <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E8E0D0] flex flex-col items-center justify-center text-center group hover:border-[#C9A84C] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-[#F5E6C0]">
            <Target size={18} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#1A2E25]">{total}</span>
          <span className="text-[9px] font-bold text-[#9AB5A8] uppercase tracking-widest mt-1">Total Scans</span>
        </div>

        {/* Legitimate */}
        <div className="bg-[#EDFAF3] rounded-xl p-4 border border-[#A8DFC4] flex flex-col items-center justify-center text-center group hover:border-[#4CAF7D] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#EDFAF3] text-[#4CAF7D] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-[#A8DFC4]">
            <CheckCircle2 size={18} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#4CAF7D]">{legitimate}</span>
          <span className="text-[9px] font-bold text-[#4CAF7D]/70 uppercase tracking-widest mt-1">Legit</span>
        </div>

        {/* Warnings */}
        <div className="bg-[#FEF6E7] rounded-xl p-4 border border-[#F5D89A] flex flex-col items-center justify-center text-center group hover:border-[#E09B3D] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#FEF6E7] text-[#E09B3D] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-[#F5D89A]">
            <AlertTriangle size={18} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#E09B3D]">{warnings}</span>
          <span className="text-[9px] font-bold text-[#E09B3D]/70 uppercase tracking-widest mt-1">Caution</span>
        </div>

        {/* Fake */}
        <div className="bg-[#FDEFEF] rounded-xl p-4 border border-[#F5BABA] flex flex-col items-center justify-center text-center group hover:border-[#E05C5C] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#FDEFEF] text-[#E05C5C] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-[#F5BABA]">
            <ShieldAlert size={18} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#E05C5C]">{fake}</span>
          <span className="text-[9px] font-bold text-[#E05C5C]/70 uppercase tracking-widest mt-1">Fraud</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationStats;
