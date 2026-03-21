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
    <div className="bg-[#131316] rounded-[2.5rem] p-10 border border-white/5 shadow-xl relative overflow-hidden flex-1 h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#6366f1]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/5 rounded-bl-full pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-[#6366f1]/10 p-2.5 rounded-xl text-[#6366f1] border border-[#6366f1]/20">
                <Sparkles size={20} fill="currentColor" fillOpacity={0.2} />
             </div>
             <h3 className="text-xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">AI Job Scanner</h3>
          </div>
          
          <div className="relative group">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste a job URL (LinkedIn, Indeed, etc.) or the full job description text here..."
              className="input-field min-h-[260px] md:min-h-[300px] resize-none py-6 pr-14"
              disabled={isAnalyzing}
            />
            <div className="absolute top-6 right-8 text-[#55555f] group-focus-within:text-[#6366f1] transition-colors">
              <Search size={24} />
            </div>
            {inputValue.length > 0 && (
              <div className="absolute bottom-6 right-8 text-[10px] font-bold uppercase tracking-widest text-[#55555f]">
                {inputValue.length} chars
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
          >
            {isAnalyzing ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>Analyze Posting ✨</>
            )}
          </button>
          <p className="text-center text-[#55555f] text-[10px] uppercase font-bold tracking-[0.2em] mt-6 italic animate-pulse">
            Deep AI analysis may take up to 10 seconds
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
