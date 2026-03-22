import React from 'react';
import { motion } from 'framer-motion';

const RecentScans = ({ history = [] }) => {
  const recentJobs = history.slice(0, 3); // Get top 3

  if (recentJobs.length === 0) {
    return (
      <div className="text-center py-10 text-[#9AB5A8] text-xs font-medium italic">
        No recent scans detected.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentJobs.map((job, i) => {
        const { trustScore } = job;
        
        let scoreColorClass = 'text-[#4CAF7D]';
        let scoreBgClass = 'bg-[#EDFAF3]';
        let borderColor = 'border-[#A8DFC4]';

        if (trustScore < 40) {
          scoreColorClass = 'text-[#E05C5C]';
          scoreBgClass = 'bg-[#FDEFEF]';
          borderColor = 'border-[#F5BABA]';
        } else if (trustScore < 75) {
          scoreColorClass = 'text-[#E09B3D]';
          scoreBgClass = 'bg-[#FEF6E7]';
          borderColor = 'border-[#F5D89A]';
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
            className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E0D0] hover:border-[#C9A84C] hover:bg-[#FDF3DC] transition-all group"
          >
            <div className="flex-1 truncate pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold text-[#9AB5A8] uppercase tracking-widest">{dateStr}</span>
                {job.companyName && (
                  <span className="text-[8px] font-bold bg-[#F0F5F3] text-[#2D4A3E] px-1.5 py-0.5 rounded tracking-tighter uppercase border border-[#C4D8D0]">
                    {job.companyName}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#1A2E25] truncate group-hover:text-[#C9A84C] transition-colors uppercase tracking-tight">
                {job.reason.split('.')[0]}
              </p>
            </div>
            
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl font-['JetBrains_Mono'] font-bold text-[10px] border ${scoreBgClass} ${scoreColorClass} ${borderColor} group-hover:scale-110 transition-transform`}>
              {trustScore}%
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecentScans;
