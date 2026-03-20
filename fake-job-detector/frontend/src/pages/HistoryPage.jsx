import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { History, ShieldCheck, FileText, BrainCircuit, ScrollText, DollarSign, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-emerald', bg: 'bg-emerald/10' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-500', bg: 'bg-teal-500/10' },
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
    <Layout pageTitle="History">
      <div className="space-y-6 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-navy">Activity History</h2>
            <p className="text-slate-500 text-sm">{history.length} total records</p>
          </div>
          <button onClick={fetchHistory} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:text-navy transition-colors">
            <RefreshCw size={15} />Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-navy text-white' : 'bg-white text-slate-500 border border-slate-200 hover:text-navy'}`}>All</button>
          {Object.entries(TOOL_MAP).map(([key, t]) => (
            <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === key ? 'bg-navy text-white' : 'bg-white text-slate-500 border border-slate-200 hover:text-navy'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="glass-card p-10 flex items-center justify-center">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-navy border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-10 text-center text-slate-400">
            <History size={36} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold">No records found</p>
            <p className="text-sm mt-1">Use any tool to see your history here.</p>
          </div>
        ) : (
          <div className="glass-card divide-y divide-slate-100">
            {filtered.map((item, i) => {
              const t = TOOL_MAP[item.tool];
              if (!t) return null;
              const Icon = t.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={18} className={t.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold text-navy text-sm">{t.label}</p>
                      <p className="text-xs text-slate-400">{new Date(item.date).toLocaleString()}</p>
                    </div>
                    {item.data?.role && <p className="text-xs text-slate-500 mt-0.5">Role: {item.data.role}</p>}
                    {item.data?.jobRole && <p className="text-xs text-slate-500 mt-0.5">Role: {item.data.jobRole}</p>}
                    {item.result?.atsScore != null && <p className="text-xs text-blue-500 font-bold mt-1">ATS Score: {item.result.atsScore}/100</p>}
                    {item.result?.trustScore != null && <p className="text-xs text-emerald font-bold mt-1">Trust Score: {item.result.trustScore}/100</p>}
                    {item.result?.median != null && <p className="text-xs text-teal-600 font-bold mt-1">Median: {item.result.currency === 'INR' ? `₹${(item.result.median/100000).toFixed(1)}L` : `$${(item.result.median/1000).toFixed(0)}K`}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default HistoryPage;
