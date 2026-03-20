import React from 'react';
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const HistoryList = ({ history, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 rounded-full border-t-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="glass-panel text-center py-20 px-6">
        <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Clock className="text-slate-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No History Yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto font-medium">
          Your previous job posting analyses will appear here. Analyze a job posting to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => {
        const { trustScore } = item;
        let StatusIcon = ShieldCheck;
        let statusColor = 'text-teal';

        if (trustScore < 40) {
          StatusIcon = ShieldAlert;
          statusColor = 'text-coral';
        } else if (trustScore < 75) {
          StatusIcon = AlertTriangle;
          statusColor = 'text-gold';
        }

        const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, {
          month: 'short', day: 'numeric', year: 'numeric'
        });

        // Snippet of text
        const snippet = item.originalText.length > 120 
          ? item.originalText.substring(0, 120) + '...'
          : item.originalText;

        return (
          <div key={item._id} className="bg-white p-5 sm:p-6 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start sm:items-center border border-slate-100 rounded-3xl mb-4 group">
            
            <div className={`w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:bg-teal/5 transition-colors`}>
              <span className={`text-2xl font-black tracking-tight ${statusColor}`}>{trustScore}</span>
            </div>

            <div className="flex-grow space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <StatusIcon className={`${statusColor}`} size={18} />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  {dateStr}
                </span>
                {item.companyName && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-navy ml-2 font-semibold border border-slate-200">
                    {item.companyName} {item.companyVerified ? <span className="text-teal">✓</span> : ''}
                  </span>
                )}
              </div>
              <p className="text-navy/80 font-medium line-clamp-2 truncate whitespace-normal text-[15px] leading-relaxed">
                "{snippet}"
              </p>
              <div className="pt-2">
                <span className="text-sm text-slate-500 font-medium line-clamp-1">
                  <span className="text-navy font-semibold">Diagnosis:</span> {item.reason}
                </span>
              </div>
            </div>

            {item.url && (
              <div className="shrink-0 mt-4 sm:mt-0">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-teal hover:text-teal-dark bg-teal/10 px-5 py-2.5 rounded-full truncate max-w-[150px] inline-block shadow-sm transition-colors">
                  View Source
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;
