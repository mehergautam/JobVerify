import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History, ShieldCheck, FileText, BrainCircuit, ScrollText,
  IndianRupee, RefreshCw, Calendar, ArrowRight, Zap, Target, Search, Sparkles, Trash2, Download, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-[#E09B3D]', bg: 'bg-[#FEF6E7]' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]' },
  'salary-checker': { label: 'Salary Checker', icon: IndianRupee, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]' },
  'cover-letter': { label: 'Cover Letter', icon: Sparkles, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]' },
  'linkedin-analyzer': { label: 'LinkedIn Analyzer', icon: Search, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]' },
};

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } });
      setHistory((res.data.history || []).slice().reverse());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const filtered = filter === 'all' ? history : history.filter(h => h.tool === filter);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">History</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
              <History size={22} className="text-[#2D4A3E]" /> Activity Log
            </h1>
            <p className="text-[#6B8A7A] text-sm mt-1">Your AI-powered verification history · {history.length} records</p>
          </div>
          <button onClick={fetchHistory} disabled={loading}
            className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Sync Data
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 bg-white border border-[#E8E0D0] p-1.5 rounded-xl mb-6 w-fit shadow-sm">
          <button onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'}`}
          >All</button>
          {Object.entries(TOOL_MAP).map(([key, t]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === key ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'}`}
            >{t.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-[#E8E0D0] p-16 flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="w-14 h-14 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mb-4" />
              <p className="text-[#9AB5A8] text-sm animate-pulse">Syncing activity logs...</p>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-2xl p-16 text-center hover:border-[#C9A84C] transition-colors"
            >
              <div className="w-16 h-16 bg-[#FAF7F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <History size={32} className="text-[#9AB5A8]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A2E25] mb-2">
                {filter === 'all' ? 'No activity yet' : `No ${TOOL_MAP[filter]?.label} entries`}
              </h3>
              <p className="text-[#9AB5A8] text-sm max-w-xs mx-auto mb-6">Your activity logs will appear here once you use our AI tools.</p>
              <Link to="/dashboard" className="btn-primary inline-flex text-sm py-2">Explore AI Tools →</Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-[#9AB5A8] uppercase tracking-widest font-semibold mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
              {filtered.map((item, i) => {
                const t = TOOL_MAP[item.tool];
                if (!t) return null;
                const Icon = t.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-xl border border-[#E8E0D0] shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#C9A84C] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon size={20} className={t.color} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[#1A2E25] text-sm">{t.label}</h4>
                          <span className="badge-forest">Secure Record</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#9AB5A8]">
                          <Calendar size={11} />
                          <span className="text-xs font-mono">{new Date(item.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(item.data?.role || item.data?.jobRole) && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F0E8] border border-[#E8E0D0] rounded-lg text-xs text-[#6B8A7A]">
                          <Target size={11} /> {item.data.role || item.data.jobRole}
                        </span>
                      )}
                      {item.result?.atsScore != null && (
                        <span className="flex items-center gap-1 bg-[#EDFAF3] border border-[#A8DFC4] rounded-lg px-3 py-1 text-xs font-mono font-bold text-[#4CAF7D]">
                          <Zap size={11} /> ATS: {item.result.atsScore}%
                        </span>
                      )}
                      {item.result?.trustScore != null && (
                        <span className={`flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-mono font-bold border ${
                          item.result.trustScore >= 70 ? 'bg-[#EDFAF3] border-[#A8DFC4] text-[#4CAF7D]' :
                          item.result.trustScore >= 40 ? 'bg-[#FEF6E7] border-[#F5D89A] text-[#E09B3D]' :
                          'bg-[#FDEFEF] border-[#F5BABA] text-[#E05C5C]'
                        }`}>
                          <ShieldCheck size={11} /> {item.result.trustScore}%
                        </span>
                      )}
                      {item.result?.median != null && (
                        <span className="flex items-center gap-1 bg-[#EDFAF3] border border-[#A8DFC4] rounded-lg px-3 py-1 text-xs font-mono font-bold text-[#4CAF7D]">
                          {item.result.currency === 'INR' ? `₹${(item.result.median/100000).toFixed(1)}L` : `$${(item.result.median/1000).toFixed(0)}K`}
                        </span>
                      )}
                    </div>

                    <div className="hidden md:flex w-9 h-9 rounded-lg bg-[#F5F0E8] group-hover:bg-[#C9A84C] text-[#9AB5A8] group-hover:text-white transition-all items-center justify-center flex-shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {history.length > 0 && (
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#F0EBE0]">
            <div className="flex items-center gap-2 text-[#9AB5A8] text-xs">
              <Sparkles size={14} />
              <span>End-to-end encrypted · JobVerify Security Protocol</span>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-xs text-[#9AB5A8] hover:text-[#E05C5C] transition-colors font-medium">
                <Trash2 size={13} /> Clear Archive
              </button>
              <button className="flex items-center gap-1.5 text-xs text-[#9AB5A8] hover:text-[#C9A84C] transition-colors font-medium">
                <Download size={13} /> Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
