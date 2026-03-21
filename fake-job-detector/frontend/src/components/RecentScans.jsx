import React from 'react';
import { motion } from 'framer-motion';

const RecentScans = ({ history = [] }) => {
  const recentJobs = history.slice(0, 3); // Get top 3

  if (recentJobs.length === 0) {
    return (
      <div className="text-center py-10 text-[#55555f] text-xs font-medium italic">
        No recent scans detected.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentJobs.map((job, i) => {
        const { trustScore } = job;
        
        let scoreColorClass = "text-[#22d3a5]";
        let scoreBgClass = "bg-[#22d3a5]/10";
        let borderColor = "border-[#22d3a5]/20";

        if (trustScore < 40) {
          scoreColorClass = "text-red-400";
          scoreBgClass = "bg-red-500/10";
          borderColor = "border-red-500/20";
        } else if (trustScore < 75) {
          scoreColorClass = "text-amber-400";
          scoreBgClass = "bg-amber-500/10";
          borderColor = "border-amber-500/20";
        }

        const dateStr = new Date(job.createdAt).toLocaleDateString(undefined, {
          month: 'short', day: 'numeric'
        });

        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={job._id} 
            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex-1 truncate pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold text-[#55555f] uppercase tracking-widest">{dateStr}</span>
                {job.companyName && (
                  <span className="text-[8px] font-bold bg-[#6366f1] text-white px-1.5 py-0.5 rounded tracking-tighter uppercase">
                    {job.companyName}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-white truncate group-hover:text-[#6366f1] transition-colors uppercase tracking-tight">
                {job.reason.split('.')[0]}
              </p>
            </div>
            
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl font-['JetBrains_Mono'] font-bold text-[10px] border ${scoreBgClass} ${scoreColorClass} ${borderColor} shadow-lg group-hover:scale-110 transition-transform`}>
              {trustScore}%
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecentScans;
