import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, ShieldCheck, FileText, BrainCircuit, ScrollText, 
  DollarSign, RefreshCw, Calendar, ArrowRight, Zap, Target, Search, Sparkles
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-400', bg: 'bg-teal-500/10' },
};

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/auth/profile`);
      setHistory((res.data.history || []).slice().reverse());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const filtered = filter === 'all' ? history : history.filter(h => h.tool === filter);

  return (
    <Layout pageTitle="Activity Log">
      <div className="space-y-8 pb-12 animate-fade-in text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/5">
              <History size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Activity <span className="gradient-text">Log</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest leading-none">Your AI Verification Journey</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={fetchHistory} 
                disabled={loading}
                className="glass-card px-4 py-2 border-white/10 flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors text-xs font-black uppercase tracking-widest disabled:opacity-50"
             >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Sync Data
             </button>
          </div>
        </div>

        {/* Stats & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap bg-[#0a0a14] p-1.5 rounded-2xl border border-white/5">
                <button 
                  onClick={() => setFilter('all')} 
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-500 hover:text-white'}`}
                >
                    All Logs
                </button>
                {Object.entries(TOOL_MAP).map(([key, t]) => (
                    <button 
                      key={key} 
                      onClick={() => setFilter(key)} 
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === key ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-500 hover:text-white'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-4 px-4 py-2 glass-card bg-white/5 border-white/5">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage Status</span>
                    <span className="text-xs font-bold text-white uppercase">{history.length} / 1000 Records</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400">
                    <Search size={18} />
                </div>
            </div>
        </div>

        <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
             key="loading"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="glass-card p-24 flex flex-col items-center justify-center text-center space-y-6 border-white/5"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
              <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Syncing encrypted logs...</p>
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-24 text-center border-white/5 bg-white/[0.02]"
          >
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-700">
                <History size={40} />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mb-2 uppercase">No Frequency Detected</h3>
            <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto mb-8">Your activity logs will appear here once you start using the JobVerify toolkit.</p>
            <button className="btn-primary px-8 py-3 text-xs font-black">EXPLORE TOOLS</button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item, i) => {
              const t = TOOL_MAP[item.tool];
              if (!t) return null;
              const Icon = t.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={i} 
                  className="glass-card p-6 border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent via-violet-600 to-transparent" />
                  
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg border border-white/5`}>
                        <Icon size={24} className={t.color} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-black text-white uppercase tracking-wider text-sm">{t.label}</h4>
                        <div className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-black text-slate-500 uppercase border border-white/5">Verified</div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                         <Calendar size={12} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{new Date(item.date).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 pr-4">
                    <div className="flex flex-wrap gap-3 md:justify-end">
                        {item.data?.role && (
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                                <Target size={12} className="text-slate-600" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.data.role}</span>
                             </div>
                        )}
                         {item.data?.jobRole && (
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                                <Target size={12} className="text-slate-600" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.data.jobRole}</span>
                             </div>
                        )}
                        {item.result?.atsScore != null && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-xl border border-blue-500/10">
                                <Zap size={12} className="text-blue-400" />
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">ATS: {item.result.atsScore}%</span>
                            </div>
                        )}
                        {item.result?.trustScore != null && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                                <ShieldCheck size={12} className="text-emerald-400" />
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">TRUST: {item.result.trustScore}%</span>
                            </div>
                        )}
                        {item.result?.median != null && (
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 rounded-xl border border-teal-500/10">
                                <DollarSign size={12} className="text-teal-400" />
                                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">MDN: {item.result.currency === 'INR' ? `₹${(item.result.median/100000).toFixed(1)}L` : `$${(item.result.median/1000).toFixed(0)}K`}</span>
                             </div>
                        )}
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-white/5 group-hover:bg-violet-600 group-hover:text-white text-slate-700 transition-all">
                      <ArrowRight size={18} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        </AnimatePresence>

        {/* Footer Info */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-slate-600">
                <Sparkles size={16} />
                <p className="text-[10px] font-black uppercase tracking-widest">End-to-end encrypted activity tracking</p>
            </div>
            <div className="flex gap-4">
               <span className="text-[10px] font-black text-slate-700 uppercase cursor-help hover:text-slate-400">Clear History</span>
               <span className="text-[10px] font-black text-slate-700 uppercase cursor-help hover:text-slate-400">Export CSV</span>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default HistoryPage;
