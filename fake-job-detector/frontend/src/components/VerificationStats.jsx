import React from 'react';
import { Target, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const VerificationStats = ({ history }) => {
  const total = history.length;
  const legitimate = history.filter(item => item.trustScore >= 75).length;
  const warnings = history.filter(item => item.trustScore >= 40 && item.trustScore < 75).length;
  const fake = history.filter(item => item.trustScore < 40).length;

  return (
    <div className="glass-card p-6 border-white/5 bg-white/5">
      <h3 className="text-lg font-black mb-6 text-white uppercase tracking-widest">Global Insights</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Total Scans */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.08] transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Target size={20} />
          </div>
          <span className="text-2xl font-black text-white">{total}</span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Scans</span>
        </div>

        {/* Legitimate */}
        <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 flex flex-col items-center justify-center text-center group hover:bg-emerald-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-2xl font-black text-emerald-400">{legitimate}</span>
          <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest mt-1">Legitimate</span>
        </div>

        {/* Warnings */}
        <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 flex flex-col items-center justify-center text-center group hover:bg-amber-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} />
          </div>
          <span className="text-2xl font-black text-amber-400">{warnings}</span>
          <span className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest mt-1">Caution</span>
        </div>

        {/* Fake */}
        <div className="bg-red-500/5 rounded-2xl p-4 border border-red-500/10 flex flex-col items-center justify-center text-center group hover:bg-red-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <ShieldAlert size={20} />
          </div>
          <span className="text-2xl font-black text-red-400">{fake}</span>
          <span className="text-[10px] font-black text-red-500/80 uppercase tracking-widest mt-1">Fraudulent</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationStats;
