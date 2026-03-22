import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Loader2, TrendingUp, TrendingDown, Minus,
  Zap, MapPin, Briefcase, ChevronDown, Info, ChevronRight
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
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-[#1A2E25] mb-4 text-sm uppercase tracking-wide">Check Market Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Job Role</label>
              <div className="relative">
                <input className="input-field pl-10" placeholder="e.g. Backend Engineer" value={role} onChange={e => setRole(e.target.value)} />
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Location</label>
              <div className="relative">
                <input className="input-field pl-10" placeholder="e.g. Bangalore, India" value={location} onChange={e => setLocation(e.target.value)} />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Experience</label>
              <div className="relative">
                <select className="input-field appearance-none cursor-pointer pr-9" value={experience} onChange={e => setExperience(e.target.value)}>
                  {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] pointer-events-none" />
              </div>
            </div>
          </div>
          <button
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg text-base shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading
              ? <><Loader2 size={18} className="animate-spin" /><span>Fetching Market Data...</span></>
              : <><Zap size={18} /><span>Check Salary</span></>
            }
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Main Card */}
              <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-[#1A2E25]">{role} in {location}</h3>
                    <p className="text-[#9AB5A8] text-sm mt-0.5">{experience}</p>
                  </div>
                  {result.marketDemand && <DemandBadge demand={result.marketDemand} />}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Market Low', val: result.lowEnd, color: 'text-[#9AB5A8]', border: 'border-[#E8E0D0]' },
                    { label: 'Median Pay', val: result.median, color: 'text-[#4CAF7D]', border: 'border-[#A8DFC4]', highlight: true },
                    { label: 'High Potential', val: result.highEnd, color: 'text-[#2D4A3E]', border: 'border-[#E8E0D0]' },
                  ].map((item, i) => (
                    <div key={i} className={`rounded-xl border p-4 text-center ${item.border} ${item.highlight ? 'bg-[#EDFAF3]' : 'bg-[#FAF7F2]'}`}>
                      <p className="text-xs font-semibold text-[#9AB5A8] uppercase tracking-wide mb-2">{item.label}</p>
                      <p className={`font-mono text-2xl font-bold ${item.color}`}>{formatSalary(item.val, result.currency)}</p>
                      <p className="text-xs text-[#9AB5A8] mt-0.5">{result.currency}/ann</p>
                    </div>
                  ))}
                </div>

                {/* Range Bar */}
                <div className="h-2 bg-[#F0EBE0] rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-[#9AB5A8] via-[#4CAF7D] to-[#2D4A3E] rounded-full" />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-[#9AB5A8]">
                  <span>{formatSalary(result.lowEnd, result.currency)}</span>
                  <span>AI Market Spread</span>
                  <span>{formatSalary(result.highEnd, result.currency)}</span>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {result.growthOutlook && (
                  <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#EDFAF3] text-[#4CAF7D] flex items-center justify-center">
                        <TrendingUp size={16} />
                      </div>
                      <h4 className="font-semibold text-sm text-[#1A2E25]">Market Trajectory</h4>
                    </div>
                    <p className="text-sm text-[#6B8A7A] leading-relaxed italic">"{result.growthOutlook}"</p>
                  </div>
                )}
                {result.factors?.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#F0F5F3] text-[#2D4A3E] flex items-center justify-center">
                        <Info size={16} />
                      </div>
                      <h4 className="font-semibold text-sm text-[#1A2E25]">Pricing Factors</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.factors.map((f, i) => (
                        <span key={i} className="badge-forest">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center pt-2">
                <button onClick={() => { setResult(null); setRole(''); setLocation(''); }}
                  className="btn-secondary text-sm"
                >Check Another Role</button>
              </div>
            </motion.div>
          )}
          {!result && !isLoading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-2xl p-14 flex flex-col items-center justify-center text-center hover:border-[#C9A84C] transition-colors group"
            >
              <div className="w-14 h-14 bg-[#EDFAF3] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <IndianRupee size={26} className="text-[#4CAF7D]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A2E25] mb-1">Ready for Market Valuations</h3>
              <p className="text-[#9AB5A8] text-sm max-w-xs">Enter a role and location to get high-precision salary benchmarks.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SalaryChecker;
