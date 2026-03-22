import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const JobForm = ({ onAnalyze, isAnalyzing }) => {
  const [inputValue, setInputValue] = useState('');

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
    <div className="bg-white rounded-2xl p-8 border border-[#E8E0D0] shadow-sm relative overflow-hidden flex-1 h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#C9A84C]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-bl-full pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
             <div className="bg-[#FDF3DC] p-2.5 rounded-xl text-[#C9A84C] border border-[#F5E6C0]">
                <Sparkles size={20} fill="currentColor" fillOpacity={0.3} />
             </div>
             <h3 className="text-lg font-bold text-[#1A2E25] tracking-tight">AI Job Scanner</h3>
          </div>
          
          <div className="relative group">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste a job URL (LinkedIn, Indeed, etc.) or the full job description text here..."
              className="input-field min-h-[260px] md:min-h-[300px] resize-none py-5 pr-14"
              disabled={isAnalyzing}
            />
            <div className="absolute top-5 right-4 text-[#9AB5A8] group-focus-within:text-[#C9A84C] transition-colors">
              <Search size={22} />
            </div>
            {inputValue.length > 0 && (
              <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#9AB5A8]">
                {inputValue.length} chars
              </div>
            )}
          </div>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className="w-full bg-[#C9A84C] text-white font-bold py-4 rounded-xl shadow-[0_4px_12px_rgba(201,168,76,0.25)] transition-all hover:bg-[#B8943D] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 text-base"
          >
            {isAnalyzing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Analyze Posting ✨</>
            )}
          </button>
          <p className="text-center text-[#9AB5A8] text-[10px] uppercase font-bold tracking-[0.2em] mt-4 animate-pulse">
            Deep AI analysis may take up to 10 seconds
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
