import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DollarSign, Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EXPERIENCE_OPTIONS = ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Mid-level (3-6 yrs)', 'Senior (6-10 yrs)', 'Lead/Principal (10+ yrs)'];

function DemandBadge({ demand }) {
  const map = {
    High: { color: 'text-emerald bg-emerald/10', icon: TrendingUp },
    Medium: { color: 'text-amber-500 bg-amber-50', icon: Minus },
    Low: { color: 'text-red-500 bg-red-50', icon: TrendingDown },
  };
  const s = map[demand] || map.Medium;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${s.color}`}>
      <Icon size={14} />{demand} Demand
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
      const res = await axios.post(`${API_URL}/tools/salary-check`, { role, location, experience });
      setResult(res.data);
      toast.success('Salary data fetched!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch salary data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Salary Checker">
      <div className="space-y-6 pb-10">
        <div className="glass-card p-6 border-l-4 border-teal-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
              <DollarSign size={22} className="text-teal-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Salary Checker</h2>
              <p className="text-slate-500 text-sm mt-1">Get real-time market salary data based on your role, location, and experience level.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Job Role <span className="text-red-400">*</span></label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                placeholder="e.g. Software Engineer, Data Analyst"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location <span className="text-red-400">*</span></label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                placeholder="e.g. Bangalore, New York"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Experience Level</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm bg-white"
                value={experience}
                onChange={e => setExperience(e.target.value)}
              >
                {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleCheck}
            disabled={isLoading}
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-teal-400 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? <><Loader2 size={18} className="animate-spin" /> Checking...</> : <><DollarSign size={18} /> Check Salary</>}
          </button>
        </div>

        {isLoading && (
          <div className="glass-card p-12 flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="font-bold text-navy animate-pulse">Fetching market salary data...</p>
          </div>
        )}

        {result && (
          <div className="space-y-5 animate-fade-in">
            {/* Salary range bar */}
            <div className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-navy">{role} — {location}</h3>
                  <p className="text-slate-500 text-sm">{experience}</p>
                </div>
                {result.marketDemand && <DemandBadge demand={result.marketDemand} />}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Low End', val: result.lowEnd, color: 'text-slate-600' },
                  { label: 'Median', val: result.median, color: 'text-teal-600', big: true },
                  { label: 'High End', val: result.highEnd, color: 'text-navy' },
                ].map(({ label, val, color, big }) => (
                  <div key={label} className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className={`font-black ${big ? 'text-3xl' : 'text-xl'} ${color}`}>
                      {formatSalary(val, result.currency)}
                    </p>
                    <p className="text-xs text-slate-400">{result.currency}/year</p>
                  </div>
                ))}
              </div>

              {/* Range bar */}
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 rounded-full" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>{formatSalary(result.lowEnd, result.currency)}</span>
                <span>{formatSalary(result.highEnd, result.currency)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {result.growthOutlook && (
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-teal-500" />
                    <h4 className="font-bold text-navy">Growth Outlook</h4>
                  </div>
                  <p className="text-sm text-slate-600">{result.growthOutlook}</p>
                </div>
              )}
              {result.factors?.length > 0 && (
                <div className="glass-card p-5">
                  <h4 className="font-bold text-navy mb-3">Pay Influencing Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.factors.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SalaryChecker;
