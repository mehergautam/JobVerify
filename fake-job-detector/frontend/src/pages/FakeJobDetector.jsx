import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import AnalysisResult from '../components/AnalysisResult';
import HistoryList from '../components/HistoryList';
import VerificationStats from '../components/VerificationStats';
import RecentScans from '../components/RecentScans';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function FakeJobDetector() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [view, setView] = useState('analyze');

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
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`${API_URL}/jobs/analyze`, data, { headers });
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
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} />
          <span className="text-[#3D5A4F] font-medium">Fake Job Detector</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
              <ShieldCheck size={24} className="text-[#2D4A3E]" /> Fake Job Detector
            </h1>
            <p className="text-[#6B8A7A] text-sm mt-1">AI-powered fraud detection across 50+ signals</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8E0D0] rounded-xl p-1.5">
            <button
              onClick={() => setView('analyze')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'analyze' ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'}`}
            >New Scan</button>
            <button
              onClick={() => setView('history')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'history' ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'}`}
            >History</button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {view === 'history' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <HistoryList history={history} isLoading={isLoadingHistory} />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl border border-[#E8E0D0] flex flex-col items-center justify-center p-16 min-h-[350px] shadow-sm"
                  >
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-[#E8E0D0]" />
                      <div className="absolute inset-0 rounded-full border-4 border-[#C9A84C] border-t-transparent animate-spin" />
                      <ShieldCheck className="absolute inset-0 m-auto text-[#2D4A3E]" size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A2E25] mb-2">Scanning Posting...</h3>
                    <p className="text-[#9AB5A8] text-sm max-w-xs text-center">AI is running 50+ checks including company verification, salary benchmarks, and red flag detection.</p>
                  </motion.div>
                ) : currentResult ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                    <AnalysisResult result={currentResult} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-2xl flex flex-col items-center justify-center p-16 text-center min-h-[350px] hover:border-[#C9A84C] transition-colors group"
                  >
                    <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FDF3DC] transition-colors">
                      <Search size={28} className="text-[#9AB5A8] group-hover:text-[#C9A84C] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A2E25] mb-2">Ready for Analysis</h3>
                    <p className="max-w-xs text-[#9AB5A8] text-sm">Paste a job description to generate a comprehensive AI-powered legitimacy report instantly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <VerificationStats history={history} />
              <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xs font-bold text-[#9AB5A8] tracking-widest uppercase">Recent Scans</h3>
                  <Clock size={16} className="text-[#9AB5A8]" />
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <RecentScans history={history} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FakeJobDetector;
