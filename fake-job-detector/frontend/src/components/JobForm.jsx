import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const JobForm = ({ onAnalyze, isAnalyzing, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Sync with initialValue if it changes (for demo button)
  React.useEffect(() => {
    if (initialValue) setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Basic URL detection
    const isUrl = inputValue.trim().startsWith('http://') || inputValue.trim().startsWith('https://');

    if (isUrl) {
      onAnalyze({ url: inputValue.trim() });
    } else {
      onAnalyze({ text: inputValue.trim() });
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col relative z-10 w-full space-y-4">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="bg-[#FDF3DC] p-2 rounded-xl text-[#C9A84C] border border-[#F5E6C0]">
                  <Sparkles size={16} fill="currentColor" fillOpacity={0.3} />
               </div>
               <h3 className="text-sm font-bold text-[#1A2E25] tracking-widest uppercase">AI Job Scanner</h3>
             </div>
             
             {/* Small hidden click area for demo, or explicit button */}
             <button type="button" onClick={() => setInputValue('We are looking for a Remote Data Entry Clerk. Salary: $45/hour. No experience needed. Immediate joining. Send $50 for security clearance to HR@DataJobsGlobal.cc. Apply now!')} className="text-[10px] font-extrabold text-[#4CAF7D] uppercase tracking-widest hover:text-[#C9A84C] transition-colors">
                Load Sample
             </button>
          </div>
          
          <div className="relative group w-full">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste a job URL (LinkedIn, Indeed, etc.) or the full job description text here..."
              className="input-field min-h-[160px] md:min-h-[200px] resize-none py-4 px-5 pr-12 w-full text-sm bg-white border border-[#E8E0D0] shadow-inner focus:bg-white"
              disabled={isAnalyzing}
            />
            <div className="absolute top-4 right-4 text-[#9AB5A8] group-focus-within:text-[#C9A84C] transition-colors">
              <Search size={20} />
            </div>
            {inputValue.length > 0 && (
              <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#9AB5A8]">
                {inputValue.length} chars
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 w-full">
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className="w-full bg-[#C9A84C] text-white font-bold py-3.5 rounded-xl shadow-md transition-all hover:bg-[#B8943D] hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {isAnalyzing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Analyze Posting ✨</>
            )}
          </button>
          <p className="text-center text-[#9AB5A8] text-[9px] uppercase font-bold tracking-[0.2em] mt-3 animate-pulse">
            Deep AI analysis may take up to 10 seconds
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
