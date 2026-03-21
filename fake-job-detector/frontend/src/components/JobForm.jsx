import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
    <div className="glass-card p-8 relative overflow-hidden flex-1 h-full border-white/5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-teal-500"></div>

      <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
        <div className="flex-1">
          <label className="block text-lg font-black text-white mb-4 tracking-tight">
            Job Source Details
          </label>
          <div className="relative group">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste a job URL (LinkedIn, Indeed, etc.) or the full job description text here..."
              className="input-field min-h-[220px] md:min-h-[260px] bg-white/5 border-white/10 hover:border-violet-500/30 focus:border-violet-500/50 transition-all duration-300 pr-12"
              disabled={isAnalyzing}
            />
            <div className="absolute top-4 right-4 text-slate-600">
              <Search size={20} />
            </div>
            {inputValue.length > 0 && (
              <div className="absolute bottom-4 right-5 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-[#0f0f1a] px-2 py-0.5 rounded border border-white/5">
                {inputValue.length} CHARS
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className="btn-primary w-full py-4 text-lg font-bold group"
          >
            {isAnalyzing ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Analyze Posting
                <Search size={20} className="ml-2 group-hover:scale-110 transition-transform" strokeWidth={3} />
              </>
            )}
          </button>
          <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest mt-4">
            AI analysis may take up to 10 seconds
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
