import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import AnalysisResult from '../components/AnalysisResult';
import HistoryList from '../components/HistoryList';
import VerificationStats from '../components/VerificationStats';
import RecentScans from '../components/RecentScans';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Clock, ChevronLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function FakeJobDetector() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [view, setView] = useState('analyze'); // 'analyze' | 'history'

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await axios.get(`${API_URL}/jobs/history`);
      setHistory(res.data);
    } catch (error) {
      toast.error('Failed to load analysis history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleAnalyze = async (data) => {
    setIsAnalyzing(true);
    setCurrentResult(null);
    try {
      const res = await axios.post(`${API_URL}/jobs/analyze`, data);
      setCurrentResult(res.data);
      toast.success('Analysis complete! ✨');
      fetchHistory();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze job posting');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5]">
        <header className="mb-10">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-[#55555f] font-bold text-[10px] uppercase tracking-widest hover:text-[#6366f1] mb-4 transition-colors group">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight flex items-center gap-3">
                      Fake Job Detector <ShieldCheck size={28} className="text-[#6366f1]" />
                    </h1>
                    <p className="text-[#8b8b99] font-medium mt-1">Cross-reference postings with AI to flag 99% of fraud.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#131316] p-1.5 rounded-2xl border border-white/5 shadow-sm">
                  <button 
                      onClick={() => setView('analyze')} 
                      className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'analyze' ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white'}`}
                  >
                      New Scan
                  </button>
                  <button 
                      onClick={() => setView('history')} 
                      className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'history' ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white'}`}
                  >
                      History
                  </button>
                </div>
            </div>
        </header>

        {view === 'history' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="animate-fade-in">
              <HistoryList history={history} isLoading={isLoadingHistory} />
            </motion.div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                  <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                  
                  <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                      <motion.div 
                        key="analyzing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-[#131316] rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center p-20 space-y-8 min-h-[450px] shadow-xl relative overflow-hidden"
                      >
                          <div className="absolute inset-0 bg-dot-grid opacity-10" />
                          <div className="relative z-10 w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin"></div>
                            <ShieldCheck className="absolute inset-0 m-auto text-[#6366f1] animate-pulse" size={32} />
                          </div>
                          <div className="text-center relative z-10">
                            <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white mb-2">Scanning Posting...</h3>
                            <p className="text-[#8b8b99] font-medium max-w-xs mx-auto text-sm">AI is running 47 checks including metadata validation, salary reality check, and company verification.</p>
                          </div>
                      </motion.div>
                  ) : currentResult ? (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AnalysisResult result={currentResult} />
                      </motion.div>
                  ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#131316] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-20 text-center min-h-[450px] group"
                      >
                          <div className="bg-white/5 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl border border-white/5 group-hover:rotate-6 transition-all duration-500">
                             <Search size={32} className="text-[#55555f] group-hover:text-[#6366f1] transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Ready for Analysis</h3>
                          <p className="max-w-xs text-[#8b8b99] font-medium text-sm">Paste a job description or URL to generate a comprehensive AI-powered legitimacy report.</p>
                      </motion.div>
                  )}
                  </AnimatePresence>
              </div>
              
              <div className="lg:col-span-4 space-y-8">
                  <VerificationStats history={history} />
                  <div className="bg-[#131316] p-8 rounded-[2rem] border border-white/5 shadow-xl">
                      <div className="flex items-center justify-between mb-8">
                          <h3 className="text-xs font-bold text-[#55555f] tracking-[0.2em] uppercase">Recent Scans</h3>
                          <Clock size={18} className="text-[#55555f]" />
                      </div>
                      <div className="max-h-[500px] overflow-y-auto pr-1-custom-scrollbar">
                          <RecentScans history={history} />
                      </div>
                  </div>
              </div>
            </div>
        )}
    </div>
  );
}

export default FakeJobDetector;
