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
    <div className="glass-card p-6 sm:p-8 transform transition-transform duration-300 relative overflow-hidden flex-1 h-full">
      {/* Subtle top border decorative bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-light via-emerald to-emerald-dark"></div>

      <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
        <div className="flex-1">
          <label className="block text-lg font-bold text-navy mb-3">
            Paste Job Description or URL Here
          </label>
          <div className="relative group">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter job URL or description..."
              className="input-field min-h-[160px] md:min-h-[200px]"
              disabled={isAnalyzing}
            />
            {inputValue.length > 0 && !inputValue.trim().startsWith('http') && (
              <div className="absolute bottom-4 right-5 text-sm font-semibold text-slate-400">
                {inputValue.length} chars
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className={`btn-primary w-full text-lg ${
              (isAnalyzing || !inputValue.trim()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? 'Scanning...' : 'Scan Now (Free)'}
            {!isAnalyzing && <Search size={22} className="ml-1" strokeWidth={2.5} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
