import React, { useState, useEffect, useRef } from 'react';
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
  const [demoValue, setDemoValue] = useState('');
  const resultRef = useRef(null);

  const loadingMessages = [
    "Checking company registration...",
    "Scanning for fraud signals...",
    "Comparing salary benchmarks...",
    "Analyzing recruiter sentiment...",
    "Verifying location authenticity...",
    "Neutral scanning in progress..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  useEffect(() => {
    if (currentResult && resultRef.current) {
      setTimeout(() => {
        const element = resultRef.current;
        if (element) {
          const yOffset = -100; // Adding a bit of padding above
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    }
  }, [currentResult]);

  const fillDemo = () => {
    setDemoValue("We are looking for a Remote Data Entry Clerk. Salary: $45/hour. No experience needed. Immediate joining. Send $50 for security clearance to HR@DataJobsGlobal.cc. Apply now!");
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] border border-[#E8E0D0] shadow-sm p-6 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF7F2] rounded-bl-full border-l border-b border-[#E8E0D0]/30 -z-0" />
                <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} initialValue={demoValue} />

                <AnimatePresence mode="wait">
                  {isAnalyzing && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#1A2E25] rounded-xl border border-[#2D4A3E] flex flex-col items-center justify-center py-8 mt-6 shadow-md relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-bl-full pointer-events-none" />
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#0D1813] overflow-hidden">
                          <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="w-1/3 h-full bg-[#C9A84C]" />
                       </div>

                      <div className="relative w-12 h-12 mb-4 z-10">
                        <div className="absolute inset-0 rounded-full border-[3px] border-[#0D1813]" />
                        <div className="absolute inset-0 rounded-full border-[3px] border-[#C9A84C] border-t-transparent animate-spin" />
                        <ShieldCheck className="absolute inset-0 m-auto text-[#C9A84C]" size={20} />
                      </div>
                      
                      <h3 className="text-sm font-bold text-[#F5F0E8] mb-1 z-10">Deep Forensic Scan</h3>
                      <AnimatePresence mode="wait">
                         <motion.p 
                            key={messageIndex}
                            initial={{ opacity:0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[#C9A84C] font-black text-[9px] uppercase tracking-[0.2em] h-3 z-10"
                         >
                            {loadingMessages[messageIndex]}
                         </motion.p>
                      </AnimatePresence>
                    </motion.div>
                  )}
                  {currentResult && !isAnalyzing && (
                    <motion.div 
                      key="result" 
                      ref={resultRef} 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6"
                    >
                      <AnalysisResult result={currentResult} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
