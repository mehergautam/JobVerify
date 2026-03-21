import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import JobForm from '../components/JobForm';
import AnalysisResult from '../components/AnalysisResult';
import HistoryList from '../components/HistoryList';
import VerificationStats from '../components/VerificationStats';
import RecentScans from '../components/RecentScans';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Clock } from 'lucide-react';

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
      toast.success('Analysis complete!');
      fetchHistory();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze job posting');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout pageTitle="Fake Job Detector">
      <div className="pb-12 animate-fade-in">
        <div className="flex items-center gap-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
          <button 
            onClick={() => setView('analyze')} 
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${view === 'analyze' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 hover:text-white'}`}
          >
            Analyze Job
          </button>
          <button 
            onClick={() => setView('history')} 
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${view === 'history' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 hover:text-white'}`}
          >
            Scan History
          </button>
        </div>

        {view === 'history' ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <HistoryList history={history} isLoading={isLoadingHistory} />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col space-y-8">
              <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card flex flex-col items-center justify-center p-16 space-y-6 min-h-[400px] border-violet-500/20"
                  >
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
                      <ShieldCheck className="absolute inset-0 m-auto text-violet-400 animate-pulse-glow" size={32} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Analyzing Posting...</h3>
                      <p className="text-slate-500 max-w-xs mx-auto">Our AI is scanning for red flags, verifying company data, and checking salary benchmarks.</p>
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
                    className="glass-card flex flex-col items-center justify-center p-16 text-center border-dashed border-white/10 min-h-[400px]"
                  >
                    <div className="bg-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 group hover:rotate-12 transition-transform">
                      <Search size={32} className="text-slate-700 group-hover:text-violet-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Scan</h3>
                    <p className="max-w-sm text-slate-500 font-medium">Paste a job description or URL above to generate a comprehensive legitimacy report.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-4 flex flex-col space-y-8">
              <VerificationStats history={history} />
              <div className="glass-card p-6 flex flex-col border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white tracking-tight">Recent Scans</h3>
                  <Clock size={18} className="text-slate-600" />
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 max-h-[500px]">
                  <RecentScans history={history} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FakeJobDetector;
