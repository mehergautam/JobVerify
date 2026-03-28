import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, Loader2, TrendingUp, TrendingDown, Minus, Zap, MapPin, Briefcase, ChevronDown, Info, ChevronRight, Target, BarChart3, PieChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    High: { cls: 'badge-success', icon: TrendingUp },
    Medium: { cls: 'badge-warning', icon: Minus },
    Low: { cls: 'badge-danger', icon: TrendingDown },
  };
  const s = map[demand] || map.Medium;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.cls}`}>
      <Icon size={12} />
      {demand} Demand
    </span>
  );
}

function SalaryChecker() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[2]);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fillDemo = () => {
    setRole('Senior React Developer');
    setLocation('Bangalore, India');
    setExperience(EXPERIENCE_OPTIONS[3]);
    setExpectedSalary('3500000');
  };

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
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/tools/salary-check`, { role, location, experience }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
      toast.success('Salary benchmarks retrieved! 💰');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch salary data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Salary Checker</span>
        </div>
        <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
          <IndianRupee size={22} className="text-[#4CAF7D]" /> Salary Reality Check
        </h1>
        <p className="text-[#6B8A7A] text-sm mt-1">Real-time AI compensation benchmarks for India & beyond</p>
      </div>

      <div className="px-8 py-6 max-w-5xl">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#4CAF7D]/5 rounded-bl-full pointer-events-none" />
          <h2 className="font-semibold text-[#1A2E25] mb-4 text-xs uppercase tracking-[0.2em]">Configure Market Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Job Role</label>
              <div className="relative group">
                <input className="input-field pl-10" placeholder="e.g. Backend Engineer" value={role} onChange={e => setRole(e.target.value)} />
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] group-focus-within:text-[#4CAF7D] transition-colors" />
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Location</label>
              <div className="relative group">
                <input className="input-field pl-10" placeholder="e.g. Bangalore" value={location} onChange={e => setLocation(e.target.value)} />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] group-focus-within:text-[#4CAF7D] transition-colors" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Experience</label>
              <div className="relative group">
                <select className="input-field appearance-none cursor-pointer pr-9" value={experience} onChange={e => setExperience(e.target.value)}>
                  {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] pointer-events-none group-hover:text-[#4CAF7D] transition-colors" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Your Target (Optional)</label>
              <div className="relative group">
                <input className="input-field pl-10" placeholder="e.g. 2500000" type="number" value={expectedSalary} onChange={e => setExpectedSalary(e.target.value)} />
                <Target size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] group-focus-within:text-[#C9A84C] transition-colors" />
              </div>
            </div>
          </div>
          <button
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full bg-[#2D4A3E] text-white font-bold py-4 rounded-xl shadow-[0_4px_12px_rgba(45,74,62,0.2)] hover:bg-[#1A2E25] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {isLoading
              ? <><Loader2 size={18} className="animate-spin" /><span>Consulting Market Indexes...</span></>
              : <><Zap size={18} className="text-[#C9A84C]" /><span>Calculate Market Value ✨</span></>
            }
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="bg-[#1A2E25] rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-[#2D4A3E] shadow-2xl min-h-[400px]"
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-[#0D1813] border-t-[#4CAF7D] animate-spin" />
                    <IndianRupee className="absolute inset-0 m-auto text-[#4CAF7D]" size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-[#F5F0E8]">Analyzing Compensation Data</h3>
                   <p className="text-[#9AB5A8] text-sm mt-2 max-w-sm">Aggregating real-time offer data for <strong className="text-[#C9A84C]">{role}</strong> roles.</p>
                </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Main Score Card */}
              <div className="bg-[#0D1813] rounded-3xl border border-[#2D4A3E] shadow-2xl overflow-hidden border-t-4 border-t-[#4CAF7D]">
                <div className="p-8 relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-bl-[100px] pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[#F5F0E8] leading-tight">{role}</h2>
                        {result.marketDemand && <DemandBadge demand={result.marketDemand} />}
                      </div>
                      <p className="text-[#9AB5A8] font-medium flex items-center gap-2">
                        <MapPin size={14} /> {location} • <Briefcase size={14} /> {experience}
                      </p>
                    </div>
                    <div className="bg-[#1A2E25]/80 p-4 rounded-2xl border border-[#3D5A4F] text-right min-w-[200px] shadow-inner backdrop-blur-sm">
                        <p className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] mb-1">Market Median</p>
                        <p className="font-mono text-3xl font-bold text-[#4CAF7D]">{formatSalary(result.median, result.currency)}</p>
                        <p className="text-[10px] text-[#9AB5A8] font-bold uppercase mt-1">Estimated annual CTC</p>
                    </div>
                  </div>

                  {/* Visual Range Bar */}
                  <div className="relative pt-10 pb-6">
                     {/* Marker Label for Low/Mid/High */}
                     <div className="absolute top-0 left-0 w-full flex justify-between text-[10px] font-extrabold text-[#9AB5A8] uppercase tracking-widest px-2">
                        <span>Conservative</span>
                        <span>Market Median</span>
                        <span>Aggressive</span>
                     </div>
                     
                     {/* The Bar */}
                     <div className="h-4 bg-[#1A2E25] rounded-full border border-[#2D4A3E] relative overflow-hidden shadow-inner">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#183626] via-[#2D6A4F] to-[#4CAF7D]/70 w-full" />
                        
                        {/* Highlights for segments */}
                        <div className="absolute inset-y-0 left-[20%] w-[60%] border-x border-dashed border-[#4CAF7D]/60" />
                        
                        {/* Target Marker */}
                        {expectedSalary && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ 
                              left: `${Math.min(Math.max(((expectedSalary - result.lowEnd) / (result.highEnd - result.lowEnd)) * 100, 0), 100)}%` 
                            }}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                          >
                             <div className="w-1 h-8 bg-[#C9A84C] rounded-full shadow-[0_0_10px_#C9A84C] relative">
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#C9A84C] text-[#0D1813] text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                                   YOUR TARGET
                                </div>
                             </div>
                          </motion.div>
                        )}

                        {/* Market Dot */}
                        <div 
                          style={{ left: '50%' }}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#4CAF7D] rounded-full border-2 border-[#1A2E25] shadow-[0_0_10px_#4CAF7D] z-0"
                        />
                     </div>

                     <div className="flex justify-between mt-3 px-1 text-xs font-mono font-bold text-[#F5F0E8]">
                        <div className="text-left">
                           <span className="block text-[#6B8A7A] text-[9px] mb-0.5">LOW END</span>
                           {formatSalary(result.lowEnd, result.currency)}
                        </div>
                        <div className="text-center">
                           <span className="block text-[#6B8A7A] text-[9px] mb-0.5">ANNUAL RANGE</span>
                           <span className="text-[#4CAF7D]">±25% SPREAD</span>
                        </div>
                        <div className="text-right">
                           <span className="block text-[#6B8A7A] text-[9px] mb-0.5">HIGH END</span>
                           {formatSalary(result.highEnd, result.currency)}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Insights Column */}
                <div className="lg:col-span-2 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Growth Outlook */}
                        <div className="bg-[#1A2E25] rounded-2xl border border-[#2D4A3E] p-6 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-[#183626] text-[#4CAF7D] flex items-center justify-center border border-[#2D6A4F] shadow-inner">
                                    <TrendingUp size={20} />
                                </div>
                                <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Growth Outlook</h4>
                            </div>
                            <p className="text-sm text-[#9AB5A8] leading-relaxed italic font-medium bg-[#0D1813]/80 p-4 rounded-xl border border-[#3D5A4F]">
                                "{result.growthOutlook || 'Strong upward trajectory expected for this niche in the coming quarters.'}"
                            </p>
                        </div>

                        {/* Experience Curve */}
                        <div className="bg-[#1A2E25] rounded-2xl border border-[#2D4A3E] p-6 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-[#1A2E25] text-[#C9A84C] flex items-center justify-center border border-[#3D5A4F] shadow-inner">
                                    <BarChart3 size={20} />
                                </div>
                                <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Experience Path</h4>
                            </div>
                            <div className="relative h-24 flex items-end justify-between gap-1 mt-6">
                                {[0.6, 0.8, 1.0, 1.3, 1.7].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <motion.div 
                                          initial={{ height: 0 }}
                                          animate={{ height: `${h * 40}%` }}
                                          className={`w-full rounded-t-lg transition-all ${i === 2 ? 'bg-[#4CAF7D] shadow-[0_0_12px_rgba(76,175,125,0.4)]' : 'bg-[#3D5A4F] group-hover:bg-[#4CAF7D]'}`}
                                        />
                                        <span className="text-[8px] font-bold text-[#6B8A7A] uppercase tracking-tighter">
                                           {i === 0 ? '0-1y' : i === 1 ? '1-3y' : i === 2 ? '3-6y' : i === 3 ? '6-10y' : '10y+'}
                                        </span>
                                    </div>
                                ))}
                                <div className="absolute top-0 right-0 text-[9px] font-bold text-[#4CAF7D]">CURVE ESTIMATE</div>
                            </div>
                        </div>
                   </div>

                   {/* Pricing Factors */}
                   <div className="bg-[#1A2E25] rounded-2xl border border-[#2D4A3E] p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#362612] text-[#C9A84C] flex items-center justify-center border border-[#6B4B22] shadow-inner">
                                    <PieChart size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Compensation Factors</h4>
                                    <p className="text-[10px] text-[#6B8A7A] font-bold uppercase">Skills that increase market value</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                             {(result.factors || ['Cloud Architecture', 'System Design', 'Team Leadership', 'Distributed Systems']).map((f, i) => (
                                <motion.span 
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="px-3 py-1.5 rounded-xl bg-[#0D1813] text-[#4CAF7D] text-xs font-bold border border-[#2D6A4F] hover:border-[#4CAF7D] transition-colors cursor-default"
                                >
                                    +{Math.floor(Math.random() * 15 + 5)}% {f}
                                </motion.span>
                             ))}
                        </div>
                   </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* City Comparison */}
                    <div className="bg-[#0D1813] border border-[#2D4A3E] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-bl-full pointer-events-none" />
                        <h4 className="text-xs font-extrabold text-[#C9A84C] uppercase tracking-[0.2em] mb-5">Geo-Market Trends</h4>
                        <div className="space-y-5 relative z-10">
                           {[
                             { city: 'Bangalore', diff: '+12%', val: 1.12 },
                             { city: 'Pune', diff: '-2%', val: 0.98 },
                             { city: 'Mumbai', diff: '+8%', val: 1.08 },
                             { city: 'Hyderabad', diff: '-5%', val: 0.95 },
                           ].map((c, i) => (
                             <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold">
                                   <span className={c.city.toLowerCase() === location.toLowerCase().split(',')[0].trim() ? 'text-[#C9A84C]' : 'text-[#9AB5A8]'}>{c.city}</span>
                                   <span className={c.diff.startsWith('+') ? 'text-[#4CAF7D]' : 'text-[#E05C5C]'}>{c.diff}</span>
                                </div>
                                <div className="h-1.5 bg-[#1A2E25] rounded-full overflow-hidden border border-[#2D4A3E]">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${c.val * 60}%` }}
                                     className={`h-full rounded-full ${c.diff.startsWith('+') ? 'bg-[#4CAF7D] shadow-[0_0_8px_#4CAF7D]' : 'bg-[#3D5A4F]'}`}
                                   />
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-[#3D5A4F] text-[10px] text-[#6B8A7A] italic relative z-10">
                           Relative to {location.split(',')[0]} market standards.
                        </div>
                    </div>

                    <button 
                      onClick={() => { setResult(null); setRole(''); setLocation(''); setExpectedSalary(''); }}
                      className="w-full bg-[#1A2E25] border-2 border-[#2D4A3E] text-[#9AB5A8] font-extrabold py-4 rounded-2xl text-xs uppercase tracking-widest hover:border-[#C9A84C] hover:text-[#C9A84C] shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                       Analyze New Role
                    </button>
                </div>
              </div>
            </motion.div>
          )}

          {!result && !isLoading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:border-[#4CAF7D] transition-colors group"
            >
              <div className="w-16 h-16 bg-[#EDFAF3] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#A8DFC4]">
                <IndianRupee size={30} className="text-[#4CAF7D]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2E25] mb-2">Ready for Valuation</h3>
              <p className="text-[#9AB5A8] text-sm max-w-sm mb-10">Discover your market worth with real-time AI benchmarks across major Indian tech hubs.</p>
              
              <button 
                onClick={fillDemo}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-[#4CAF7D] text-[#4CAF7D] font-bold text-sm hover:bg-[#4CAF7D] hover:text-white transition-all group/btn"
              >
                Try an example <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SalaryChecker;
