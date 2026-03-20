import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  ShieldCheck, FileText, BrainCircuit, ScrollText, DollarSign,
  CheckCircle2, XCircle, Clock, TrendingUp, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-emerald', bg: 'bg-emerald/10', path: '/detect' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/resume' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10', path: '/interview' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-amber-500', bg: 'bg-amber-500/10', path: '/offer' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-500', bg: 'bg-teal-500/10', path: '/salary' },
};

const QUICK_TOOLS = [
  { label: 'Fake Job Detector', icon: ShieldCheck, color: 'from-emerald to-teal-500', path: '/detect', desc: 'Spot scam jobs instantly' },
  { label: 'Resume Analyzer', icon: FileText, color: 'from-blue-500 to-indigo-600', path: '/resume', desc: 'Get your ATS score' },
  { label: 'Interview Prep', icon: BrainCircuit, color: 'from-purple-500 to-pink-500', path: '/interview', desc: 'AI mock interviews' },
  { label: 'Offer Verifier', icon: ScrollText, color: 'from-amber-400 to-orange-500', path: '/offer', desc: 'Validate offer letters' },
  { label: 'Salary Checker', icon: DollarSign, color: 'from-teal-400 to-cyan-600', path: '/salary', desc: 'Market rate checker' },
];

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/auth/profile`)
      .then(r => setProfile(r.data))
      .catch(() => {});
  }, []);

  const history = profile?.history || [];
  const totalScans = history.length;
  const toolCounts = history.reduce((acc, h) => {
    acc[h.tool] = (acc[h.tool] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-8 pb-10">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              Welcome back 👋
            </h2>
            <p className="text-slate-500 mt-1">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald" />
              <span className="font-bold text-navy">{totalScans} total scans</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(TOOL_MAP).map(([key, t]) => {
            const Icon = t.icon;
            return (
              <Link to={t.path} key={key} className="glass-card p-4 flex flex-col gap-2 hover:shadow-lg transition-all group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center`}>
                  <Icon size={20} className={t.color} />
                </div>
                <p className="text-2xl font-black text-navy">{toolCounts[key] || 0}</p>
                <p className="text-xs font-medium text-slate-500 leading-tight">{t.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Access Tools */}
        <div>
          <h3 className="text-lg font-bold text-navy mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  to={tool.path}
                  key={tool.path}
                  className="glass-card p-5 flex items-center gap-4 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white flex-shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-navy">{tool.label}</p>
                    <p className="text-xs text-slate-500">{tool.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-bold text-navy mb-4">Recent Activity</h3>
          {history.length === 0 ? (
            <div className="glass-card p-8 text-center text-slate-400">
              <Clock size={36} className="mx-auto mb-3 text-slate-300" />
              <p className="font-semibold">No activity yet</p>
              <p className="text-sm mt-1">Use any tool to see your results here.</p>
            </div>
          ) : (
            <div className="glass-card divide-y divide-slate-100">
              {history.slice().reverse().slice(0, 10).map((item, i) => {
                const t = TOOL_MAP[item.tool];
                if (!t) return null;
                const Icon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-9 h-9 rounded-lg ${t.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={17} className={t.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy text-sm">{t.label}</p>
                      <p className="text-xs text-slate-400">{new Date(item.date).toLocaleString()}</p>
                    </div>
                    {item.result?.atsScore != null && (
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">ATS: {item.result.atsScore}</span>
                    )}
                    {item.result?.trustScore != null && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.result.trustScore >= 60 ? 'text-emerald bg-emerald/10' : 'text-red-500 bg-red-50'}`}>
                        {item.result.trustScore >= 60 ? <CheckCircle2 size={14} className="inline mr-1" /> : <XCircle size={14} className="inline mr-1" />}
                        {item.result.trustScore}
                      </span>
                    )}
                    {item.result?.isLikelyLegitimate != null && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.result.isLikelyLegitimate ? 'text-emerald bg-emerald/10' : 'text-red-500 bg-red-50'}`}>
                        {item.result.isLikelyLegitimate ? 'Legit' : 'Suspicious'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
