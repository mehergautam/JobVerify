import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ShieldCheck, FileText, BrainCircuit, ScrollText, IndianRupee,
  Clock, Zap, History, Sparkles, Linkedin, Bell, Calendar, ChevronRight, BarChart2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]', path: '/detect' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]', path: '/resume' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-[#E09B3D]', bg: 'bg-[#FEF6E7]', path: '/interview' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]', path: '/offer' },
  'salary-checker': { label: 'Salary Checker', icon: IndianRupee, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]', path: '/salary' },
  'cover-letter': { label: 'Cover Letter', icon: Sparkles, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]', path: '/cover-letter' },
  'linkedin-analyzer': { label: 'LinkedIn Analyzer', icon: Linkedin, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]', path: '/linkedin-analyzer' },
};

const QUICK_ACCESS = [
  { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]', path: '/detect', desc: 'Scan for fraud' },
  { label: 'Resume Analyzer', icon: FileText, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]', path: '/resume', desc: 'ATS scoring' },
  { label: 'Interview Prep', icon: BrainCircuit, color: 'text-[#E09B3D]', bg: 'bg-[#FEF6E7]', path: '/interview', desc: 'AI coaching' },
  { label: 'Salary Checker', icon: IndianRupee, color: 'text-[#4CAF7D]', bg: 'bg-[#EDFAF3]', path: '/salary', desc: 'Market rates' },
  { label: 'Offer Verifier', icon: ScrollText, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]', path: '/offer', desc: 'Validate offers' },
  { label: 'Cover Letter', icon: Sparkles, color: 'text-[#C9A84C]', bg: 'bg-[#FDF3DC]', path: '/cover-letter', desc: 'Auto-generate', isNew: true },
  { label: 'LinkedIn Analyzer', icon: Linkedin, color: 'text-[#2D4A3E]', bg: 'bg-[#F0F5F3]', path: '/linkedin-analyzer', desc: 'Profile score', isNew: true },
  { label: 'History', icon: History, color: 'text-[#6B8A7A]', bg: 'bg-[#FAF7F2]', path: '/history', desc: 'All scans' },
];

const StatCard = ({ label, value, icon: Icon, iconBg, iconColor, trend }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-5 hover:shadow-md transition-all flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-[#4CAF7D] bg-[#EDFAF3] px-2 py-0.5 rounded-md border border-[#A8DFC4] uppercase tracking-widest flex items-center gap-1">
          ↑ {trend}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-3xl font-mono font-bold text-[#1A2E25] tracking-tight mb-1">{value}</h4>
      <p className="text-[10px] font-semibold text-[#9AB5A8] uppercase tracking-[0.2em]">{label}</p>
    </div>
  </motion.div>
);

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setProfile(r.data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const history = profile?.history || [];
  const totalScans = history.length;
  const resumeScore = history.find(h => h.tool === 'resume-analyzer')?.result?.atsScore || 0;
  const interviewsCount = history.filter(h => h.tool === 'interview-prep').length;
  const offersCount = history.filter(h => h.tool === 'offer-verifier').length;
  const userName = user?.name || user?.email?.split('@')[0] || '';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#1A2E25]">{greeting}, {userName}! 👋</h1>
          <p className="text-[#9AB5A8] text-sm mt-0.5">Here's your job search overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#F5F0E8] border border-[#E8E0D0] rounded-lg px-3 py-1.5 text-sm text-[#6B8A7A] gap-2">
            <Calendar size={14} className="text-[#C9A84C]" />
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 bg-[#EDFAF3] text-[#4CAF7D] border border-[#A8DFC4] px-3 py-1 rounded-full text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF7D] animate-pulse" />
            SYSTEM ACTIVE
          </div>
          <button className="p-2 rounded-lg bg-[#F5F0E8] border border-[#E8E0D0] text-[#9AB5A8] hover:text-[#2D4A3E] transition-colors">
            <Bell size={17} />
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Scans" value={totalScans} icon={ShieldCheck} iconBg="bg-[#F0F5F3]" iconColor="text-[#2D4A3E]" trend="today" />
          <StatCard label="Resume Score" value={resumeScore > 0 ? `${resumeScore}/100` : '--/100'} icon={FileText} iconBg="bg-[#EDFAF3]" iconColor="text-[#4CAF7D]" />
          <StatCard label="Interviews" value={interviewsCount} icon={BrainCircuit} iconBg="bg-[#FEF6E7]" iconColor="text-[#E09B3D]" />
          <StatCard label="Offers Verified" value={offersCount} icon={ScrollText} iconBg="bg-[#FDF3DC]" iconColor="text-[#C9A84C]" />
        </div>

        {/* Quick Access */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1A2E25] text-lg">Quick Access</h2>
            <Link to="/history" className="text-[#C9A84C] text-sm font-semibold hover:text-[#B8943D] transition-colors">See All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACCESS.map((tool, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => navigate(tool.path)}
                className="bg-white rounded-xl border border-[#E8E0D0] p-4 cursor-pointer hover:shadow-md hover:border-[#C9A84C] hover:bg-[#FDFAF5] transition-all relative"
              >
                {tool.isNew && (
                  <span className="absolute top-2.5 right-2.5 text-[8px] font-bold bg-[#4CAF7D] text-white px-1.5 py-0.5 rounded-full">NEW</span>
                )}
                <div className={`w-9 h-9 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-3`}>
                  <tool.icon size={18} />
                </div>
                <h4 className="text-sm font-semibold text-[#1A2E25] mb-0.5">{tool.label}</h4>
                <p className="text-xs text-[#9AB5A8]">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1A2E25] text-lg">Recent Activity</h2>
            {history.length > 0 && <Link to="/history" className="text-[#C9A84C] text-sm font-semibold hover:text-[#B8943D] transition-colors">View All →</Link>}
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E8E0D0]">
                  <th className="px-6 py-3 text-xs font-semibold text-[#9AB5A8] uppercase tracking-wide">Tool</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#9AB5A8] uppercase tracking-wide">Input</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#9AB5A8] uppercase tracking-wide">Score</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#9AB5A8] uppercase tracking-wide">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE0]">
                {isLoading ? (
                  <tr><td colSpan="5" className="p-10 text-center text-[#9AB5A8] text-sm animate-pulse">Loading activity...</td></tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <BarChart2 size={48} className="text-[#E8E0D0] mx-auto mb-3" />
                      <p className="font-semibold text-[#1A2E25] mb-1">No activity yet</p>
                      <p className="text-[#9AB5A8] text-sm mb-5">Try a tool above to get started!</p>
                      <Link to="/detect" className="btn-primary inline-flex text-sm py-2">Scan Your First Job →</Link>
                    </td>
                  </tr>
                ) : (
                  history.slice().reverse().slice(0, 5).map((item, i) => {
                    const t = TOOL_MAP[item.tool];
                    const score = item.result?.trustScore || item.result?.atsScore || 0;
                    const scoreColor = score >= 80 ? 'text-[#4CAF7D]' : score >= 50 ? 'text-[#E09B3D]' : 'text-[#E05C5C]';
                    return (
                      <tr key={i} className="hover:bg-[#FAF7F2] transition-colors group text-sm text-[#3D5A4F]">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-lg ${t?.bg || 'bg-[#FAF7F2]'} ${t?.color || 'text-[#6B8A7A]'}`}>
                              {t ? <t.icon size={15} /> : <Zap size={15} />}
                            </div>
                            <span className="font-semibold text-[#1A2E25]">{t?.label || item.tool}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-[#6B8A7A] text-xs truncate max-w-[140px]">
                          {item.tool === 'salary-checker' ? `${item.data?.role || 'Role'} • ${item.data?.location || ''}` :
                           item.tool === 'resume-analyzer' ? item.data?.jobRole || 'General' :
                           item.tool === 'interview-prep' ? item.data?.role || 'Role' : 'Analysis'}
                        </td>
                        <td className="px-6 py-3">
                          {score > 0 ? (
                            <span className={`font-mono font-bold ${scoreColor}`}>{score}%</span>
                          ) : <span className="text-[#9AB5A8]">—</span>}
                        </td>
                        <td className="px-6 py-3 text-xs text-[#9AB5A8]">
                          {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Link to={t?.path || '/history'} className="p-1.5 rounded-lg bg-[#F5F0E8] text-[#9AB5A8] group-hover:bg-[#C9A84C] group-hover:text-white transition-all inline-block">
                            <ChevronRight size={15} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
