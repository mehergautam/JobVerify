import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Loader2, TrendingUp, TrendingDown, Minus, 
  Sparkles, Zap, MapPin, Briefcase, ChevronDown, Info, ArrowUpRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EXPERIENCE_OPTIONS = [
  'Fresher (0-1 yr)', 
  'Junior (1-3 yrs)', 
  'Mid-level (3-6 yrs)', 
  'Senior (6-10 yrs)', 
  'Lead/Principal (10+ yrs)'
];

function DemandBadge({ demand }) {
  const map = {
    High: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: TrendingUp },
    Medium: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Minus },
    Low: { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: TrendingDown },
  };
  const s = map[demand] || map.Medium;
  const Icon = s.icon;
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg ${s.color}`}
    >
      <Icon size={12} strokeWidth={3} />
      {demand} Demand
    </motion.span>
  );
}

function SalaryChecker() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[2]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatSalary = (val, currency) => {
    if (!val) return 'N/A';
    if (currency === 'INR') return `₹${(val / 100000).toFixed(1)}L`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  const handleCheck = async () => {
    if (!role.trim() || !location.trim()) return toast.error('Role and location are required');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/tools/salary-check`, { role, location, experience });
      setResult(res.data);
      toast.success('Salary benchmarks retrieved!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch salary data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Salary AI">
      <div className="space-y-8 pb-12 animate-fade-in text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-lg shadow-teal-500/5">
              <DollarSign size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Salary <span className="gradient-text">Engine</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Global Market Compensation Data</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="glass-card px-4 py-2 border-white/5 flex items-center gap-2 bg-white/5">
                <Sparkles size={16} className="text-teal-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Live Benchmarking</span>
             </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="glass-card p-8 border-white/5 bg-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Job Designation</label>
                <div className="relative group">
                  <input
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-teal-500/50 transition-all text-sm font-bold text-white placeholder:text-slate-700 group-hover:border-white/20"
                    placeholder="e.g. Backend Engineer"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  />
                  <Briefcase size={18} className="absolute right-5 top-4 text-slate-700 group-hover:text-teal-400 transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Geo Location</label>
                <div className="relative group">
                  <input
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-teal-500/50 transition-all text-sm font-bold text-white placeholder:text-slate-700 group-hover:border-white/20"
                    placeholder="e.g. Bangalore"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                  <MapPin size={18} className="absolute right-5 top-4 text-slate-700 group-hover:text-teal-400 transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Seniority Level</label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 rounded-2xl bg-[#0a0a14] border border-white/10 focus:outline-none focus:border-teal-500/50 transition-all text-sm font-bold text-white appearance-none cursor-pointer"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                  >
                    {EXPERIENCE_OPTIONS.map(o => <option key={o} className="bg-[#0f0f1a]">{o}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-4 text-slate-600 pointer-events-none" />
                </div>
              </div>
           </div>

           <button
             onClick={handleCheck}
             disabled={isLoading}
             className="btn-primary-teal w-full py-4 text-lg font-black group overflow-hidden relative shadow-teal-500/10"
           >
             {isLoading ? (
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="animate-pulse tracking-widest">QUERYING GLOBAL DATABASE...</span>
                </div>
             ) : (
                <div className="flex items-center justify-center gap-3">
                    <Zap size={22} className="group-hover:scale-110 transition-transform" />
                    FETCH COMPENSATION DATA
                </div>
             )}
           </button>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
               key="loading"
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.98 }}
               className="glass-card p-16 flex flex-col items-center justify-center text-center space-y-8 border-teal-500/20 min-h-[400px]"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
                <DollarSign className="absolute inset-0 m-auto text-teal-400 animate-pulse-glow" size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight text-glow-teal">Market Analysis</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Aggregating salary bands from various regional sources and adjusting based on experience level demand.</p>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div 
               key="results"
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="space-y-8"
            >
              {/* Main Salary Card */}
              <div className="glass-card p-8 border-white/5 bg-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Market Breakdown</span>
                         <ArrowUpRight size={14} className="text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">{role} <span className="text-slate-600 font-medium text-lg">in</span> {location}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{experience}</p>
                  </div>
                  {result.marketDemand && <DemandBadge demand={result.marketDemand} />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                  {[
                    { label: 'Market Low', val: result.lowEnd, icon: TrendingDown, color: 'text-slate-400', bg: 'bg-white/5' },
                    { label: 'Median Pay', val: result.median, icon: DollarSign, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/10', active: true },
                    { label: 'High Potential', val: result.highEnd, icon: TrendingUp, color: 'text-white', bg: 'bg-white/5' },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center transition-all ${item.bg} ${item.active ? 'shadow-2xl shadow-teal-500/5 scale-105 z-20' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color} mb-4`}>
                        <item.icon size={20} />
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                      <p className={`font-black tracking-tighter sm:text-3xl text-2xl mb-1 ${item.color}`}>
                        {formatSalary(item.val, result.currency)}
                      </p>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{result.currency} / ANNUM</p>
                    </motion.div>
                  ))}
                </div>

                {/* Range Visualizer */}
                <div className="space-y-4 px-4">
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-teal-800 via-teal-500 to-teal-300 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.3)]" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                        <span>{formatSalary(result.lowEnd, result.currency)}</span>
                        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-slate-400">MARKET DISTRIBUTION</div>
                        <span>{formatSalary(result.highEnd, result.currency)}</span>
                    </div>
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {result.growthOutlook && (
                  <motion.div whileHover={{ x: 5 }} className="glass-card p-8 border-white/5 bg-white/5 group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <TrendingUp size={22} />
                        </div>
                        <h4 className="font-black text-white uppercase tracking-widest text-sm">Industry Trajectory</h4>
                    </div>
                    <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                        {result.growthOutlook}
                    </p>
                  </motion.div>
                )}
                
                {result.factors?.length > 0 && (
                  <motion.div whileHover={{ x: -5 }} className="glass-card p-8 border-white/5 bg-white/5 group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400">
                          <Info size={22} />
                        </div>
                        <h4 className="font-black text-white uppercase tracking-widest text-sm">Key Pay Drivers</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {result.factors.map((f, i) => (
                        <div key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-black text-slate-400 hover:text-teal-400 hover:border-teal-500/30 transition-all cursor-default">
                            {f.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default SalaryChecker;
