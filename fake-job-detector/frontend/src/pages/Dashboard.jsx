import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, FileText, BrainCircuit, ScrollText, DollarSign,
  Clock, Zap, LayoutDashboard, History, FileEdit,
  Linkedin, Bell, Calendar, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOOL_MAP = {
  'fake-job-detector': { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10', path: '/detect' },
  'resume-analyzer': { label: 'Resume Analyzer', icon: FileText, color: 'text-[#22d3a5]', bg: 'bg-[#22d3a5]/10', path: '/resume' },
  'interview-prep': { label: 'Interview Prep', icon: BrainCircuit, color: 'text-violet-400', bg: 'bg-violet-400/10', path: '/interview' },
  'offer-verifier': { label: 'Offer Verifier', icon: ScrollText, color: 'text-orange-400', bg: 'bg-orange-400/10', path: '/offer' },
  'salary-checker': { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-400', bg: 'bg-teal-400/10', path: '/salary' },
  'cover-letter': { label: 'Cover Letter', icon: FileEdit, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10', path: '/cover-letter' },
  'linkedin-analyzer': { label: 'LinkedIn Analyzer', icon: Linkedin, color: 'text-sky-400', bg: 'bg-sky-400/10', path: '/linkedin-analyzer' },
};

const QUICK_ACCESS = [
  { label: 'Fake Job Detector', icon: ShieldCheck, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10', path: '/detect', desc: 'Scan for fraud' },
  { label: 'Resume Analyzer', icon: FileText, color: 'text-[#22d3a5]', bg: 'bg-[#22d3a5]/10', path: '/resume', desc: 'ATS scoring' },
  { label: 'Interview Prep', icon: BrainCircuit, color: 'text-violet-400', bg: 'bg-violet-400/10', path: '/interview', desc: 'AI Coaching' },
  { label: 'Salary Checker', icon: DollarSign, color: 'text-teal-400', bg: 'bg-teal-400/10', path: '/salary', desc: 'Market rates' },
  { label: 'Offer Verifier', icon: ScrollText, color: 'text-orange-400', bg: 'bg-orange-400/10', path: '/offer', desc: 'Validate offers' },
  { label: 'Cover Letter', icon: FileEdit, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10', path: '/cover-letter', desc: 'Auto-generate', isNew: true },
  { label: 'LinkedIn Analyzer', icon: Linkedin, color: 'text-sky-400', bg: 'bg-sky-400/10', path: '/linkedin-analyzer', desc: 'Profile score', isNew: true },
  { label: 'History', icon: History, color: 'text-[#8b8b99]', bg: 'bg-white/5', path: '/history', desc: 'All your scans' },
];

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-[#131316] p-6 rounded-2xl border border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${color.replace('text-', 'bg-').split(' ')[0]}/10 ${color}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-[#22d3a5] bg-[#22d3a5]/10 px-2 py-0.5 rounded-md border border-[#22d3a5]/20 uppercase tracking-widest">
          +{trend}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-3xl font-['JetBrains_Mono'] font-bold text-[#f2f2f5] tracking-tighter mb-1">{value}</h4>
      <p className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-[0.2em] leading-none">{label}</p>
    </div>
  </motion.div>
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
  const resumeScore = history.find(h => h.tool === 'resume-analyzer')?.result?.atsScore || 0;
  const interviewsCount = history.filter(h => h.tool === 'interview-prep').length;
  const offersCount = history.filter(h => h.tool === 'offer-verifier').length;

  return (
    <div className="animate-fade-in text-[#f2f2f5]">
      {/* Top Greeting Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-5 border-b border-white/5">
         <div>
            <h2 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">
              Good morning, {user?.name || user?.email?.split('@')[0]}! 👋
            </h2>
            <p className="text-[#8b8b99] font-medium text-sm mt-1">Here's your job search overview for today.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs font-bold text-[#8b8b99] shadow-sm">
               <Calendar size={14} className="mr-2 text-[#6366f1]" /> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] border border-[#22d3a5]/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#22d3a5] animate-pulse" />
               System Active
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[#8b8b99] hover:text-white transition-all relative">
               <Bell size={18} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0c0c0f]" />
            </button>
         </div>
      </header>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         <StatCard label="Total Scans" value={totalScans} icon={ShieldCheck} color="text-[#6366f1]" trend="12% this week" />
         <StatCard label="Resume Score" value={`${resumeScore}/100`} icon={FileText} color="text-[#22d3a5]" trend="5%" />
         <StatCard label="Interviews" value={interviewsCount} icon={BrainCircuit} color="text-violet-400" trend="2" />
         <StatCard label="Offers" value={offersCount} icon={ScrollText} color="text-orange-400" trend="1" />
      </div>

      {/* Quick Access Tools */}
      <div className="mb-12">
         <h3 className="text-xs font-bold text-[#55555f] tracking-[0.2em] mb-4 uppercase">Quick Access</h3>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACCESS.map((tool, i) => (
              <Link 
                key={i} 
                to={tool.path}
                className="group bg-[#131316] p-5 rounded-2xl border border-white/5 hover:border-[#6366f1]/30 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                {tool.isNew && (
                  <div className="absolute top-3 right-3 text-[8px] font-bold uppercase tracking-tighter bg-[#6366f1] text-white px-1.5 py-0.5 rounded">NEW</div>
                )}
                <div className={`w-10 h-10 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#6366f1] transition-colors">{tool.label}</h4>
                <p className="text-[10px] font-medium text-[#8b8b99]">{tool.desc}</p>
              </Link>
            ))}
         </div>
      </div>

      {/* Recent Activity Table */}
      <div className="pb-12">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-[#55555f] tracking-[0.2em] uppercase">Recent Activity</h3>
            {history.length > 0 && <Link to="/history" className="text-[10px] font-bold uppercase tracking-widest text-[#8b8b99] hover:text-[#6366f1] transition-colors">View All →</Link>}
         </div>
         
         <div className="bg-[#131316] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                     <th className="px-6 py-4 text-[10px] font-bold text-[#55555f] uppercase tracking-widest">Tool</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-[#55555f] uppercase tracking-widest">Result</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-[#55555f] uppercase tracking-widest">Score</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-[#55555f] uppercase tracking-widest">Date</th>
                     <th className="px-6 py-4 text-center"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                     <tr><td colSpan="5" className="p-12 text-center text-[#55555f] font-medium uppercase tracking-widest text-xs animate-pulse italic">Scanning insights...</td></tr>
                  ) : history.length === 0 ? (
                     <tr>
                        <td colSpan="5" className="p-20 text-center">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5 text-[#55555f]">
                              <Clock size={32} />
                           </div>
                           <p className="text-white font-bold mb-1">No activity yet</p>
                           <p className="text-xs text-[#8b8b99] mb-8">Try a tool above to start your safety audit.</p>
                           <Link to="/detect" className="btn-primary text-xs inline-flex py-2 px-6">Get Started 🛡️</Link>
                        </td>
                     </tr>
                  ) : (
                     history.slice().reverse().slice(0, 5).map((item, i) => {
                        const t = TOOL_MAP[item.tool];
                        const score = item.result?.trustScore || item.result?.atsScore || 0;
                        return (
                           <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${t?.bg || 'bg-white/5'} ${t?.color || 'text-[#8b8b99]'} shadow-sm`}>
                                       {t ? <t.icon size={16} /> : <Zap size={16} />}
                                    </div>
                                    <span className="text-sm font-bold text-white">{t?.label || 'Digital Scan'}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="text-xs font-medium text-[#8b8b99] truncate max-w-[150px] block uppercase opacity-80">
                                    {item.tool === 'fake-job-detector' ? item.result?.jobTitle || 'Unstructured scan' : 
                                     item.tool === 'resume-analyzer' ? 'Professional Resume' : 
                                     item.tool === 'salary-checker' ? `Salary Check` : 'Secure audit'}
                                 </span>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <span className={`text-sm font-['JetBrains_Mono'] font-bold ${score >= 80 ? 'text-[#22d3a5]' : score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                       {score ? `${score}%` : '---'}
                                    </span>
                                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         whileInView={{ width: `${score}%` }}
                                         className={`h-full ${score >= 80 ? 'bg-[#22d3a5]' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                       />
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-xs font-medium text-[#8b8b99]">
                                 {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Link to={t?.path || '/history'} className="p-2 rounded-lg bg-white/5 text-[#55555f] group-hover:bg-[#6366f1] group-hover:text-white transition-all inline-block shadow-sm">
                                    <ChevronRight size={16} />
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
  );
}

export default Dashboard;
