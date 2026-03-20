import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import JobForm from './components/JobForm';
import AnalysisResult from './components/AnalysisResult';
import HistoryList from './components/HistoryList';
import VerificationStats from './components/VerificationStats';
import RecentScans from './components/RecentScans';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await axios.get(`${API_URL}/jobs/history`);
      setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load analysis history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAnalyze = async (data) => {
    setIsAnalyzing(true);
    setCurrentResult(null);
    try {
      const res = await axios.post(`${API_URL}/jobs/analyze`, data);
      setCurrentResult(res.data);
      toast.success('Analysis complete!');
      // Refresh history silently so stats/recent update
      fetchHistory();
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.response?.data?.error || 'Failed to analyze job posting');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <Toaster position="top-right" />
      
      {activeTab === 'dashboard' || activeTab === 'analyze' ? (
        <div className="animate-fade-in pb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Top Left - The Scanner (Span 8) */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <JobForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Top Right - Stats Card (Span 4) */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <VerificationStats history={history} />
            </div>

            {/* Bottom Left - Recent Scans (Span 4) */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <div className="glass-card p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-6 text-navy">Recent Scans</h3>
                <div className="flex-1 overflow-y-auto pr-1">
                  <RecentScans history={history} />
                </div>
              </div>
            </div>

            {/* Bottom Right - Analysis Report (Span 8) */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              {isAnalyzing ? (
                <div className="glass-card flex-1 flex flex-col items-center justify-center p-12 space-y-6 min-h-[400px]">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-navy font-bold animate-pulse text-xl">Analyzing job posting for red flags...</p>
                </div>
              ) : currentResult ? (
                <div className="animate-slide-up h-full">
                  <AnalysisResult result={currentResult} />
                </div>
              ) : (
                <div className="glass-card flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400 min-h-[400px]">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">No Active Report</h3>
                  <p className="max-w-sm">Use the Scanner above to paste a job description or URL. Your detailed analysis report will appear here.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="max-w-5xl animate-fade-in pb-12 pt-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-navy mb-2">Analysis History</h2>
            <p className="text-slate-500 font-medium">Review your complete log of past job posting analyses.</p>
          </div>
          
          <HistoryList history={history} isLoading={isLoadingHistory} />
        </div>
      )}
    </Layout>
  );
}

export default App;
