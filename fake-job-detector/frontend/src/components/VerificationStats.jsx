import React from 'react';
import { Target, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const VerificationStats = ({ history = [] }) => {
  const total = history.length;
  const legitimate = history.filter(item => item.trustScore >= 75).length;
  const warnings = history.filter(item => item.trustScore >= 40 && item.trustScore < 75).length;
  const fake = history.filter(item => item.trustScore < 40).length;

  return (
    <div className="bg-[#131316] p-6 rounded-[2rem] border border-white/5 shadow-xl transition-all">
      <h3 className="text-[10px] font-bold text-[#55555f] tracking-[0.2em] mb-6 uppercase pl-1">Global Insights</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Total Scans */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.08] transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Target size={20} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-white">{total}</span>
          <span className="text-[9px] font-bold text-[#55555f] uppercase tracking-widest mt-1">Total Scans</span>
        </div>

        {/* Legitimate */}
        <div className="bg-[#22d3a5]/5 rounded-2xl p-4 border border-[#22d3a5]/10 flex flex-col items-center justify-center text-center group hover:bg-[#22d3a5]/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-[#22d3a5]">{legitimate}</span>
          <span className="text-[9px] font-bold text-[#22d3a5]/60 uppercase tracking-widest mt-1">Legit</span>
        </div>

        {/* Warnings */}
        <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 flex flex-col items-center justify-center text-center group hover:bg-amber-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-amber-500">{warnings}</span>
          <span className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest mt-1">Caution</span>
        </div>

        {/* Fake */}
        <div className="bg-red-500/5 rounded-2xl p-4 border border-red-500/10 flex flex-col items-center justify-center text-center group hover:bg-red-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <ShieldAlert size={20} />
          </div>
          <span className="text-xl font-['JetBrains_Mono'] font-bold text-red-400">{fake}</span>
          <span className="text-[9px] font-bold text-red-500/60 uppercase tracking-widest mt-1">Fraud</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationStats;
