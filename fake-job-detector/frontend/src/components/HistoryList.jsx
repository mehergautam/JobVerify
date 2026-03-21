import React from 'react';
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryList = ({ history, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-20 bg-[#131316] rounded-[2.5rem] border border-white/5 border-dashed">
        <div className="w-10 h-10 rounded-full border-t-2 border-[#6366f1] animate-spin"></div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="bg-[#131316] text-center py-24 px-8 border border-white/5 border-dashed rounded-[2.5rem]">
        <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#55555f] border border-white/5">
          <Clock size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No history detected</h3>
        <p className="text-[#8b8b99] max-w-sm mx-auto font-medium">
          Your previous job posting analyses will appear here. Analyze a job posting to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item, i) => {
        const { trustScore } = item;
        let StatusIcon = ShieldCheck;
        let statusColor = 'text-[#22d3a5]';
        let statusBg = 'bg-[#22d3a5]/10';
        let statusBorder = 'border-[#22d3a5]/20';

        if (trustScore < 40) {
          StatusIcon = ShieldAlert;
          statusColor = 'text-red-400';
          statusBg = 'bg-red-400/10';
          statusBorder = 'border-red-400/20';
        } else if (trustScore < 75) {
          StatusIcon = AlertTriangle;
          statusColor = 'text-amber-400';
          statusBg = 'bg-amber-400/10';
          statusBorder = 'border-amber-400/20';
        }

        const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, {
          month: 'short', day: 'numeric', year: 'numeric'
        });

        // Snippet of text
        const snippet = item.originalText.length > 120 
          ? item.originalText.substring(0, 120) + '...'
          : item.originalText;

        return (
          <motion.div 
            key={item._id} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#131316] p-6 hover:bg-white/[0.04] transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center border border-white/5 rounded-3xl group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${statusColor.replace('text', 'bg')} opacity-40`} />
            
            <div className={`w-16 h-16 rounded-2xl ${statusBg} border ${statusBorder} flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
              <span className={`text-2xl font-['JetBrains_Mono'] font-bold tracking-tighter ${statusColor}`}>{trustScore}</span>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${statusColor} opacity-70 mt-[-2px]`}>Score</span>
            </div>

            <div className="flex-grow space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-3 mb-1">
                <StatusIcon className={`${statusColor}`} size={16} />
                <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar size={12} /> {dateStr}
                </span>
                {item.companyName && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#6366f1]/10 text-[#a5b4fc] font-bold border border-[#6366f1]/20 uppercase tracking-tight">
                    {item.companyName} {item.companyVerified ? '✓' : ''}
                  </span>
                )}
              </div>
              <p className="text-[#f2f2f5] font-medium line-clamp-2 truncate whitespace-normal text-sm leading-relaxed italic">
                "{snippet}"
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="text-[10px] text-[#55555f] uppercase font-bold tracking-widest">AI Verdict:</span>
                <span className="text-xs text-[#8b8b99] font-medium line-clamp-1">{item.reason}</span>
              </div>
            </div>

            {item.url && (
              <div className="shrink-0 mt-4 sm:mt-0">
                <a 
                  href={item.url} target="_blank" rel="noopener noreferrer" 
                  className="text-[10px] font-bold text-[#8b8b99] hover:text-white bg-white/5 border border-white/5 px-4 py-2 rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest"
                >
                  Source <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default HistoryList;
