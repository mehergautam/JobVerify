import React from 'react';
import { Target, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const VerificationStats = ({ history }) => {
  const total = history.length;
  const legitimate = history.filter(item => item.trustScore >= 75).length;
  const warnings = history.filter(item => item.trustScore >= 40 && item.trustScore < 75).length;
  const fake = history.filter(item => item.trustScore < 40).length;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-6 text-navy">Verification Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Total Scans */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
            <Target size={20} />
          </div>
          <span className="text-2xl font-black text-navy">{total}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Jobs Scanned</span>
        </div>

        {/* Legitimate */}
        <div className="bg-emerald/10 rounded-2xl p-4 border border-emerald/20 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-light/20 text-emerald-dark flex items-center justify-center mb-2">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-2xl font-black text-emerald-dark">{legitimate}</span>
          <span className="text-xs font-semibold text-emerald-dark/80 uppercase tracking-wider mt-1">Legitimate</span>
        </div>

        {/* Warnings */}
        <div className="bg-amber/10 rounded-2xl p-4 border border-amber/20 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-amber-light/20 text-amber-800 flex items-center justify-center mb-2">
            <AlertTriangle size={20} />
          </div>
          <span className="text-2xl font-black text-amber-800">{warnings}</span>
          <span className="text-xs font-semibold text-amber-800/80 uppercase tracking-wider mt-1">Warning</span>
        </div>

        {/* Fake */}
        <div className="bg-coral/10 rounded-2xl p-4 border border-coral/20 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-coral-light/20 text-coral flex items-center justify-center mb-2">
            <ShieldAlert size={20} />
          </div>
          <span className="text-2xl font-black text-coral">{fake}</span>
          <span className="text-xs font-semibold text-coral/80 uppercase tracking-wider mt-1">Fake</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationStats;
