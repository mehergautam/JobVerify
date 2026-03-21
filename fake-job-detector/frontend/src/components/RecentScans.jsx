import React from 'react';

const RecentScans = ({ history }) => {
  const recentJobs = history.slice(0, 3); // Get top 3

  if (recentJobs.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500 text-sm font-medium">
        No recent scans. Analyze a job to see it here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentJobs.map((job) => {
        const { trustScore } = job;
        
        let scoreColorClass = "text-emerald-400";
        let scoreBgClass = "bg-emerald-500/10";
        let borderColor = "border-emerald-500/10";

        if (trustScore < 40) {
          scoreColorClass = "text-red-400";
          scoreBgClass = "bg-red-500/10";
          borderColor = "border-red-500/10";
        } else if (trustScore < 75) {
          scoreColorClass = "text-amber-400";
          scoreBgClass = "bg-amber-500/10";
          borderColor = "border-amber-500/10";
        }

        const dateStr = new Date(job.createdAt).toLocaleDateString(undefined, {
          month: 'short', day: 'numeric'
        });

        return (
          <div key={job._id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group">
            <div className="flex-1 truncate pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{dateStr}</span>
                {job.companyName && (
                  <span className="text-[9px] font-black bg-violet-600 text-white px-2 py-0.5 rounded uppercase tracking-widest leading-none">
                    {job.companyName}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-white truncate group-hover:text-violet-400 transition-colors">
                {job.reason.split('.')[0]}
              </p>
            </div>
            
            <div className={`shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-xl font-black text-xs border ${scoreBgClass} ${scoreColorClass} ${borderColor} shadow-lg group-hover:scale-110 transition-transform`}>
              {trustScore}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentScans;
