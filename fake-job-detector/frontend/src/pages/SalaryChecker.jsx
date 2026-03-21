import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Loader2, TrendingUp, TrendingDown, Minus, 
  Sparkles, Zap, MapPin, Briefcase, ChevronDown, Info, ArrowUpRight, ChevronLeft, ChevronRight, Activity
} from 'lucide-react';
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
    High: { color: 'text-[#22d3a5] bg-[#22d3a5]/10 border-[#22d3a5]/20', icon: TrendingUp },
    Medium: { color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', icon: Minus },
    Low: { color: 'text-red-500 bg-red-500/10 border-red-500/20', icon: TrendingDown },
  };
  const s = map[demand] || map.Medium;
  const Icon = s.icon;
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border shadow-sm ${s.color}`}
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
      toast.success('Salary benchmarks retrieved! 💰');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch salary data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
           
           {/* Header Section */}
           <header className="mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
                 Dashboard <ChevronRight size={10} /> Salary Engine
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center border border-[#10b981]/20 shadow-xl shadow-[#10b981]/5">
                    <DollarSign size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">Salary Engine</h2>
                    <p className="text-[#8b8b99] font-medium mt-1">Global Market Compensation Data • Real-time Benchmarking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-[#10b981]" fill="currentColor" fillOpacity={0.2} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b8b99]">Live AI Feed</span>
                   </div>
                </div>
              </div>
           </header>

           {/* Search Card */}
           <div className="bg-[#131316] rounded-[2.5rem] p-10 border border-white/5 shadow-xl relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#10b981]/5 rounded-bl-full pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 relative z-10">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Job Designation</label>
                   <div className="relative group">
                     <input
                       className="input-field pl-12"
                       placeholder="e.g. Backend Engineer"
                       value={role}
                       onChange={e => setRole(e.target.value)}
                     />
                     <Briefcase size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#10b981] transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Geo Location</label>
                   <div className="relative group">
                     <input
                       className="input-field pl-12"
                       placeholder="e.g. Bangalore, India"
                       value={location}
                       onChange={e => setLocation(e.target.value)}
                     />
                     <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#10b981] transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Seniority Level</label>
                   <div className="relative group">
                     <select
                       className="input-field appearance-none cursor-pointer pr-10"
                       value={experience}
                       onChange={e => setExperience(e.target.value)}
                     >
                       {EXPERIENCE_OPTIONS.map(o => <option key={o} className="bg-[#131316] font-medium">{o}</option>)}
                     </select>
                     <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#10b981] transition-colors pointer-events-none" />
                   </div>
                 </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50 text-xl relative z-10"
              >
                {isLoading ? (
                   <div className="flex items-center justify-center gap-4">
                       <Loader2 size={24} className="animate-spin text-white" />
                       <span className="animate-pulse italic">AGGREGATING MARKET DATA...</span>
                   </div>
                ) : (
                   <div className="flex items-center justify-center gap-3">
                       <Zap size={24} />
                       FETCH COMPENSATION DATA ✨
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
                  exit={{ opacity: 0 }}
                  className="bg-[#131316] rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 shadow-xl min-h-[500px] relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-dot-grid opacity-10 animate-pulse" />
                 <div className="relative z-10 w-24 h-24">
                   <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-[#10b981] border-t-transparent animate-spin"></div>
                   <DollarSign className="absolute inset-0 m-auto text-[#10b981] animate-pulse" size={40} />
                 </div>
                 <div className="relative z-10 space-y-4">
                   <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white">Market Analysis in Progress</h3>
                    <p className="text-[#8b8b99] font-medium max-w-sm mx-auto text-sm">Aggregating salary bands from regional sources and adjusting for seniority demand.</p>
                 </div>
               </motion.div>
             ) : result ? (
               <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-10"
               >
                 {/* Main Salary Card */}
                 <div className="bg-[#131316] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-700 opacity-50" />
                   
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                             <div className="bg-[#10b981]/10 p-1.5 rounded-lg text-[#10b981] border border-[#10b981]/20">
                                <TrendingUp size={16} />
                             </div>
                             <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-widest italic">Global Market Alpha</span>
                        </div>
                       <h3 className="text-3xl font-['Cabinet_Grotesk'] font-bold tracking-tight text-white">{role} <span className="text-[#55555f] font-medium text-xl">in</span> {location}</h3>
                       <p className="text-[#55555f] text-[10px] font-bold uppercase tracking-[0.2em]">{experience} · Adjusted for inflation</p>
                     </div>
                     {result.marketDemand && <DemandBadge demand={result.marketDemand} />}
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative z-10">
                     {[
                       { label: 'Market Low', val: result.lowEnd, icon: TrendingDown, color: 'text-[#55555f]', bg: 'bg-white/5' },
                       { label: 'Median Pay', val: result.median, icon: DollarSign, color: 'text-[#22d3a5]', bg: 'bg-[#22d3a5]/5 border-[#22d3a5]/20', active: true },
                       { label: 'High Potential', val: result.highEnd, icon: TrendingUp, color: 'text-white', bg: 'bg-white/5' },
                     ].map((item, idx) => (
                       <motion.div 
                         key={idx}
                         whileHover={{ y: -5 }}
                         className={`p-8 rounded-[2rem] border transition-all flex flex-col items-center text-center ${item.bg} ${item.active ? 'shadow-2xl shadow-[#22d3a5]/5 scale-105 z-20 border-[#22d3a5]/30' : 'border-white/5'}`}
                       >
                         <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} mb-6 border border-white/5`}>
                           <item.icon size={24} />
                         </div>
                         <p className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-2">{item.label}</p>
                         <p className={`font-['JetBrains_Mono'] font-bold tracking-tighter sm:text-4xl text-3xl mb-1 ${item.color}`}>
                           {formatSalary(item.val, result.currency)}
                         </p>
                         <p className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">{result.currency} / ann</p>
                       </motion.div>
                     ))}
                   </div>

                   {/* Range Visualizer */}
                   <div className="space-y-4 px-4 relative z-10">
                       <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#065f46] via-[#10b981] to-[#6ee7b7] rounded-full" />
                       </div>
                       <div className="flex justify-between items-center text-[9px] font-bold text-[#55555f] uppercase tracking-widest italic">
                           <span>{formatSalary(result.lowEnd, result.currency)}</span>
                           <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[#8b8b99]">AI Estimated Market Spread</div>
                           <span>{formatSalary(result.highEnd, result.currency)}</span>
                       </div>
                   </div>
                 </div>

                 {/* Insights Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {result.growthOutlook && (
                     <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl group relative overflow-hidden flex flex-col gap-6">
                       <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                           <TrendingUp size={100} className="text-white" />
                       </div>
                       <div className="flex items-center gap-4 relative z-10">
                           <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center border border-[#10b981]/20 group-hover:scale-110 transition-transform">
                             <TrendingUp size={24} />
                           </div>
                           <h4 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Market Trajectory</h4>
                       </div>
                       <p className="text-lg font-medium text-[#8b8b99] leading-relaxed italic group-hover:text-white transition-colors relative z-10 pr-10">
                           "{result.growthOutlook}"
                       </p>
                     </div>
                   )}
                   
                   {result.factors?.length > 0 && (
                     <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl group flex flex-col gap-6">
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 group-hover:scale-110 transition-transform">
                             <Info size={24} />
                           </div>
                           <h4 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Pricing Variables</h4>
                       </div>
                       <div className="flex flex-wrap gap-2.5">
                         {result.factors.map((f, i) => (
                           <div key={i} className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-bold text-[#8b8b99] hover:bg-[#10b981] hover:text-white hover:border-[#10b981] transition-all cursor-default uppercase tracking-widest italic shadow-sm">
                                {f}
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
                 
                 <div className="text-center pt-10 pb-20">
                    <button onClick={() => {setResult(null); setRole(''); setLocation('');}} className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-white/10 transition-all active:scale-95 italic">
                       Check Another Profile 💹
                    </button>
                 </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="bg-[#131316] border-2 border-dashed border-white/5 rounded-[3rem] p-24 flex flex-col items-center justify-center text-center group"
               >
                  <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl border border-white/5 group-hover:rotate-6 transition-all duration-500">
                     <DollarSign size={44} className="text-[#55555f] group-hover:text-[#10b981] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 italic">Ready for Market Valuations</h3>
                  <p className="max-w-xs text-[#8b8b99] font-medium text-sm">Enter a role and location above to retrieve high-precision compensation benchmarks adjusted by AI.</p>
               </motion.div>
             )}
           </AnimatePresence>
    </div>
  );
}

export default SalaryChecker;
