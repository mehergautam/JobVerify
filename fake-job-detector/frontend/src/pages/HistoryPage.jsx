import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, ShieldCheck, FileText, BrainCircuit, ScrollText, 
  DollarSign, RefreshCw, Calendar, ArrowRight, Zap, Target, Search, Sparkles, ChevronLeft, Trash2, Download, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#22d3a5]', bg: 'bg-[#22d3a5]/10' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
  'cover-letter': { label: 'Cover Letter', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  'linkedin-analyzer': { label: 'LinkedIn Audit', icon: Search, color: 'text-sky-400', bg: 'bg-sky-400/10' },
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
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
           
           {/* Header Section */}
           <header className="mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
                 Dashboard <ChevronRight size={10} /> Activity Log
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10 shadow-xl">
                    <History size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">Activity Log</h2>
                    <p className="text-[#8b8b99] font-medium mt-1">Your AI Verification Journey • Secure Archive</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                      onClick={fetchHistory} 
                      disabled={loading}
                      className="bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 shadow-sm flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#8b8b99] hover:text-white hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                   >
                      <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                      Sync Data
                   </button>
                </div>
              </div>
           </header>

           {/* Filter Bar */}
           <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-10">
               <div className="flex gap-2 flex-wrap bg-white/5 p-1 rounded-2xl border border-white/5 shadow-inner">
                   <button 
                     onClick={() => setFilter('all')} 
                     className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white hover:bg-white/5'}`}
                   >
                       All Logs
                   </button>
                   {Object.entries(TOOL_MAP).map(([key, t]) => (
                       <button 
                         key={key} 
                         onClick={() => setFilter(key)} 
                         className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === key ? 'bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white hover:bg-white/5'}`}
                       >
                           {t.label}
                       </button>
                   ))}
               </div>
               <div className="flex items-center gap-6 px-8 py-3.5 bg-[#131316] rounded-2xl border border-white/5 shadow-xl group">
                   <div className="flex flex-col items-end">
                       <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-[0.2em]">Archive Capacity</span>
                       <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#8b8b99]">{history.length} / 1000 Records</span>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-white/5 text-[#8b8b99] flex items-center justify-center border border-white/5 group-hover:bg-[#6366f1] group-hover:text-white transition-all">
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
                className="bg-[#131316] rounded-[3rem] p-32 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 shadow-xl min-h-[500px] relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-dot-grid opacity-10 animate-pulse" />
                <div className="relative z-10 w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin"></div>
                  <History className="absolute inset-0 m-auto text-[#6366f1] animate-pulse" size={32} />
                </div>
                <p className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-[0.3em] animate-pulse relative z-10">Syncing secure activity logs...</p>
             </motion.div>
           ) : filtered.length === 0 ? (
             <motion.div 
               key="empty"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-[#131316] rounded-[3rem] p-32 text-center border-2 border-dashed border-white/5"
             >
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#55555f] border border-white/5 shadow-sm transition-transform hover:scale-110">
                    <History size={48} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 italic">Empty Data Pipeline</h3>
                <p className="text-sm font-medium text-[#8b8b99] max-w-sm mx-auto mb-10 uppercase tracking-widest text-[10px] leading-relaxed">Your activity logs will appear here once you initialize our high-precision AI verification toolkit.</p>
                <Link to="/dashboard" className="px-10 py-4 bg-[#6366f1] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:shadow-[#6366f1]/20 transition-all active:scale-95 italic">
                  Explore AI Tools 🛰️
                </Link>
             </motion.div>
           ) : (
             <div className="space-y-4">
                <div className="flex items-center justify-between px-4 mb-2">
                   <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-[0.2em]">{filtered.length} Results Filtered</span>
                   <div className="flex items-center gap-4 text-[#55555f] font-bold text-[10px] uppercase tracking-widest">
                      <span>Tool Type</span>
                      <span>|</span>
                      <span>Status</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 pb-20">
                  {filtered.map((item, i) => {
                    const t = TOOL_MAP[item.tool];
                    if (!t) return null;
                    const Icon = t.icon;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        key={i} 
                        className="bg-[#131316] p-6 rounded-2xl border border-white/5 shadow-xl hover:bg-white/[0.04] transition-all group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8"
                      >
                        <div className="flex items-center gap-6 relative z-10">
                          <div className={`w-14 h-14 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-white/5`}>
                              <Icon size={24} className={t.color} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <h4 className="font-bold text-white uppercase tracking-wider text-sm">{t.label}</h4>
                              <div className="px-2 py-0.5 rounded-full bg-[#22d3a5]/10 text-[8px] font-bold text-[#22d3a5] uppercase border border-[#22d3a5]/20">Secure Record</div>
                            </div>
                            <div className="flex items-center gap-2 text-[#55555f]">
                               <Calendar size={12} />
                               <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-widest">{new Date(item.date).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:items-end gap-3 relative z-10 pr-4">
                          <div className="flex flex-wrap gap-2 md:justify-end">
                              {(item.data?.role || item.data?.jobRole) && (
                                   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                                      <Target size={12} className="text-[#55555f]" />
                                      <span className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest">{item.data.role || item.data.jobRole}</span>
                                   </div>
                              )}
                              {item.result?.atsScore != null && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                      <Zap size={12} className="text-blue-400" />
                                      <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-blue-400">ATS: {item.result.atsScore}%</span>
                                  </div>
                              )}
                              {item.result?.trustScore != null && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22d3a5]/10 rounded-lg border border-[#22d3a5]/20">
                                      <ShieldCheck size={12} className="text-[#22d3a5]" />
                                      <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#22d3a5]">TRUST: {item.result.trustScore}%</span>
                                  </div>
                              )}
                              {item.result?.median != null && (
                                   <div className="flex items-center gap-2 px-3 py-1.5 bg-[#10b981]/10 rounded-lg border border-[#10b981]/20">
                                      <DollarSign size={12} className="text-[#10b981]" />
                                      <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#10b981]">{item.result.currency === 'INR' ? `₹${(item.result.median/100000).toFixed(1)}L` : `$${(item.result.median/1000).toFixed(0)}K`}</span>
                                   </div>
                              )}
                          </div>
                        </div>

                        <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#6366f1] group-hover:text-white text-[#55555f] transition-all duration-300 border border-white/5">
                            <ArrowRight size={18} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
             </div>
           )}
           </AnimatePresence>

           {/* Footer Info */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
                <div className="flex items-center gap-4 text-[#55555f]">
                    <Sparkles size={18} />
                    <p className="text-[10px] font-bold uppercase tracking-widest italic opacity-60">End-to-end encrypted activity tracking • JobVerify Security Protocol</p>
                </div>
                <div className="flex gap-10">
                   <button className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase hover:text-red-500 transition-colors">
                      <Trash2 size={14} /> Clear Archive
                   </button>
                   <button className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase hover:text-[#6366f1] transition-colors">
                      <Download size={14} /> Export Dataset
                   </button>
                </div>
           </div>
    </div>
  );
}

export default HistoryPage;
