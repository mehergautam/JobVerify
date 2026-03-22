import React from 'react';
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryList = ({ history, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-16 bg-white rounded-2xl border-2 border-dashed border-[#E8E0D0]">
        <div className="w-10 h-10 rounded-full border-t-2 border-[#C9A84C] animate-spin"></div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="bg-white text-center py-20 px-8 border-2 border-dashed border-[#E8E0D0] rounded-2xl hover:border-[#C9A84C] transition-colors">
        <div className="bg-[#FAF7F2] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[#9AB5A8] border border-[#E8E0D0]">
          <Clock size={30} />
        </div>
        <h3 className="text-lg font-bold text-[#1A2E25] mb-2">No history detected</h3>
        <p className="text-[#6B8A7A] max-w-sm mx-auto text-sm font-medium">
          Your previous job posting analyses will appear here. Analyze a job posting to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item, i) => {
        const { trustScore } = item;
        let StatusIcon = ShieldCheck;
        let statusColor = 'text-[#4CAF7D]';
        let statusBg = 'bg-[#EDFAF3]';
        let statusBorder = 'border-[#A8DFC4]';
        let leftBarColor = 'bg-[#4CAF7D]';

        if (trustScore < 40) {
          StatusIcon = ShieldAlert;
          statusColor = 'text-[#E05C5C]';
          statusBg = 'bg-[#FDEFEF]';
          statusBorder = 'border-[#F5BABA]';
          leftBarColor = 'bg-[#E05C5C]';
        } else if (trustScore < 75) {
          StatusIcon = AlertTriangle;
          statusColor = 'text-[#E09B3D]';
          statusBg = 'bg-[#FEF6E7]';
          statusBorder = 'border-[#F5D89A]';
          leftBarColor = 'bg-[#E09B3D]';
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
            className="bg-white p-5 hover:bg-[#FAF7F2] transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center border border-[#E8E0D0] rounded-2xl group relative overflow-hidden hover:border-[#C9A84C]"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${leftBarColor} opacity-50`} />
            
            <div className={`w-14 h-14 rounded-xl ${statusBg} border ${statusBorder} flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <span className={`text-xl font-['JetBrains_Mono'] font-bold tracking-tighter ${statusColor}`}>{trustScore}</span>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${statusColor} opacity-70 mt-[-2px]`}>Score</span>
            </div>

            <div className="flex-grow space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <StatusIcon className={`${statusColor}`} size={15} />
                <span className="text-[10px] font-bold text-[#9AB5A8] uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar size={11} /> {dateStr}
                </span>
                {item.companyName && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F0F5F3] text-[#2D4A3E] font-bold border border-[#C4D8D0] uppercase tracking-tight">
                    {item.companyName} {item.companyVerified ? '✓' : ''}
                  </span>
                )}
              </div>
              <p className="text-[#3D5A4F] font-medium line-clamp-2 truncate whitespace-normal text-sm leading-relaxed italic">
                "{snippet}"
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="text-[10px] text-[#9AB5A8] uppercase font-bold tracking-widest">AI Verdict:</span>
                <span className="text-xs text-[#6B8A7A] font-medium line-clamp-1">{item.reason}</span>
              </div>
            </div>

            {item.url && (
              <div className="shrink-0 mt-3 sm:mt-0">
                <a 
                  href={item.url} target="_blank" rel="noopener noreferrer" 
                  className="text-[10px] font-bold text-[#9AB5A8] hover:text-[#2D4A3E] bg-[#FAF7F2] border border-[#E8E0D0] px-4 py-2 rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest hover:border-[#C9A84C]"
                >
                  Source <ExternalLink size={11} />
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
