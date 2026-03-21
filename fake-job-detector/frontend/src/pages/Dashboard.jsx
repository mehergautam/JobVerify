import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, FileText, BrainCircuit, ScrollText, DollarSign,
  CheckCircle2, XCircle, Clock, TrendingUp, ChevronRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', path: '/detect' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', path: '/resume' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10', path: '/interview' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-amber-400', bg: 'bg-amber-500/10', path: '/offer' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-400', bg: 'bg-teal-500/10', path: '/salary' },
};

const QUICK_TOOLS = [
  { label: 'Fake Job Detector', icon: ShieldCheck, color: 'from-emerald-500 to-teal-500', path: '/detect', desc: 'Spot scam jobs instantly' },
  { label: 'Resume Analyzer', icon: FileText, color: 'from-blue-500 to-indigo-600', path: '/resume', desc: 'Get your ATS score' },
  { label: 'Interview Prep', icon: BrainCircuit, color: 'from-purple-500 to-pink-500', path: '/interview', desc: 'AI mock interviews' },
  { label: 'Offer Verifier', icon: ScrollText, color: 'from-amber-400 to-orange-500', path: '/offer', desc: 'Validate offer letters' },
  { label: 'Salary Checker', icon: DollarSign, color: 'from-teal-400 to-cyan-600', path: '/salary', desc: 'Market rate checker' },
];

const AnimatedNumber = ({ value }) => {
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    let duration = 1.5;
    let counter = setInterval(() => {
      start += 1;
      setCurr(start);
      if (start === end) clearInterval(counter);
    }, (duration * 1000) / end);
    return () => clearInterval(counter);
  }, [value]);
  return <span>{curr}</span>;
};

const SkeletonCard = () => (
  <div className="glass-card p-4 space-y-3">
    <div className="w-10 h-10 skeleton" />
    <div className="h-6 w-8 skeleton" />
    <div className="h-3 w-20 skeleton" />
  </div>
);

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/auth/profile`)
      .then(r => {
        setProfile(r.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const history = profile?.history || [];
  const totalScans = history.length;
  const toolCounts = history.reduce((acc, h) => {
    acc[h.tool] = (acc[h.tool] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout pageTitle="Overview">
      <div className="space-y-10 pb-10">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Hello, <span className="gradient-text">{user?.email?.split('@')[0]}</span> 👋
            </h2>
            <p className="text-slate-500 mt-1 font-medium">Here's what's happening with your career security today.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <div className="glass-card px-5 py-3.5 flex items-center gap-3 border-violet-500/20 bg-violet-500/5">
              <div className="bg-violet-500 p-1.5 rounded-lg text-white">
                <Zap size={16} fill="white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Activity Score</p>
                <span className="font-black text-white text-lg leading-none">
                  {isLoading ? '...' : <AnimatedNumber value={totalScans} />}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            Object.entries(TOOL_MAP).map(([key, t], i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={t.path} className="glass-card p-5 flex flex-col gap-3 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all group border-white/5 hover:border-violet-500/30">
                    <div className={`w-12 h-12 rounded-2xl ${t.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={t.color} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white">
                        <AnimatedNumber value={toolCounts[key] || 0} />
                      </p>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{t.label}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Quick Access Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white tracking-tight">Toolkit Express</h3>
            <Link to="/detect" className="text-violet-400 text-sm font-bold hover:text-violet-300 transition-colors">View All Tools</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUICK_TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  to={tool.path}
                  key={tool.path}
                  className="glass-card-hover p-6 flex items-center gap-5 group border-white/5"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}>
                    <Icon size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-lg group-hover:text-violet-400 transition-colors">{tool.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{tool.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    <ChevronRight size={18} className="text-violet-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white tracking-tight">Recent Insights</h3>
            {history.length > 0 && <Link to="/history" className="text-slate-500 text-sm font-bold hover:text-white transition-all">Clear History</Link>}
          </div>
          
          {isLoading ? (
            <div className="glass-card p-10 space-y-4">
              <div className="h-12 w-full skeleton" />
              <div className="h-12 w-full skeleton" />
              <div className="h-12 w-full skeleton" />
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card p-16 text-center border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-slate-700" />
              </div>
              <p className="text-xl font-bold text-white mb-2">Clean Slate</p>
              <p className="text-slate-500 max-w-sm mx-auto">You haven't performed any scans yet. Start by using the Fake Job Detector to secure your first insight.</p>
              <Link to="/detect" className="btn-primary mt-8 inline-flex">Get Started</Link>
            </div>
          ) : (
            <div className="glass-card divide-y divide-white/5 border-white/10 overflow-hidden">
              <AnimatePresence>
                {history.slice().reverse().slice(0, 8).map((item, i) => {
                  const t = TOOL_MAP[item.tool];
                  if (!t) return null;
                  const Icon = t.icon;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-5 p-5 hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className={`w-11 h-11 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={20} className={t.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm group-hover:text-violet-400 transition-colors">{t.label}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">{new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.result?.atsScore != null && (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">ATS Score</span>
                            <span className="text-sm font-black text-blue-400">{item.result.atsScore}</span>
                          </div>
                        )}
                        {item.result?.trustScore != null && (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Trust</span>
                            <span className={`text-sm font-black flex items-center gap-1 ${item.result.trustScore >= 60 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {item.result.trustScore}%
                              {item.result.trustScore >= 60 ? <CheckCircle2 size={12} strokeWidth={3} /> : <XCircle size={12} strokeWidth={3} />}
                            </span>
                          </div>
                        )}
                        {item.result?.isLikelyLegitimate != null && (
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.result.isLikelyLegitimate ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-red-400 border-red-500/20 bg-red-500/5'}`}>
                            {item.result.isLikelyLegitimate ? 'Legit' : 'Scam'}
                          </span>
                        )}
                        <button className="p-2 text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

export default Dashboard;
