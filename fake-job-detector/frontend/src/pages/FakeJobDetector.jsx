import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import JobForm from '../components/JobForm';
import AnalysisResult from '../components/AnalysisResult';
import HistoryList from '../components/HistoryList';
import VerificationStats from '../components/VerificationStats';
import RecentScans from '../components/RecentScans';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Search } from 'lucide-react';

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
      <div className="pb-12">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setView('analyze')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'analyze' ? 'bg-navy text-white' : 'bg-white text-slate-500 hover:text-navy border border-slate-200'}`}>Analyze</button>
          <button onClick={() => setView('history')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'history' ? 'bg-navy text-white' : 'bg-white text-slate-500 hover:text-navy border border-slate-200'}`}>History</button>
        </div>

        {view === 'history' ? (
          <div>
            <HistoryList history={history} isLoading={isLoadingHistory} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <VerificationStats history={history} />
              <div className="glass-card p-5 flex flex-col">
                <h3 className="text-base font-bold mb-4 text-navy">Recent Scans</h3>
                <div className="flex-1 overflow-y-auto">
                  <RecentScans history={history} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-12">
              {isAnalyzing ? (
                <div className="glass-card flex flex-col items-center justify-center p-12 space-y-4 min-h-[300px]">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-navy font-bold animate-pulse">Analyzing job posting for red flags...</p>
                </div>
              ) : currentResult ? (
                <div className="animate-slide-up">
                  <AnalysisResult result={currentResult} />
                </div>
              ) : (
                <div className="glass-card flex flex-col items-center justify-center p-12 text-center text-slate-400 min-h-[280px]">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Search size={28} className="text-slate-300" />
                  </div>
                  <h3 className="text-base font-bold text-slate-700 mb-1">No Active Report</h3>
                  <p className="max-w-sm text-sm">Paste a job description above to see your analysis here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FakeJobDetector;
