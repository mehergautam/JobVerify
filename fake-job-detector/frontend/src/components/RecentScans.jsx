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
        
        // Define color based on score
        let scoreColorClass = "text-emerald";
        let scoreBgClass = "bg-emerald/10";
        if (trustScore < 40) {
          scoreColorClass = "text-coral";
          scoreBgClass = "bg-coral/10";
        } else if (trustScore < 75) {
          scoreColorClass = "text-amber-800";
          scoreBgClass = "bg-amber/10";
        }

        const dateStr = new Date(job.createdAt).toLocaleDateString(undefined, {
          month: 'short', day: 'numeric'
        });

        return (
          <div key={job._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
            <div className="flex-1 truncate pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400 uppercase">{dateStr}</span>
                {job.companyName && (
                  <span className="text-[10px] font-bold bg-white border border-slate-200 text-navy px-1.5 py-0.5 rounded">
                    {job.companyName}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-navy truncate">
                {job.reason.split('.')[0]}
              </p>
            </div>
            
            <div className={`shrink-0 flex items-center justify-center px-4 py-2 rounded-xl font-black text-lg ${scoreBgClass} ${scoreColorClass}`}>
              {trustScore}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentScans;
