import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScrollText, Loader2, CheckCircle2, XCircle, AlertCircle, 
  ShieldCheck, Sparkles, Zap, Info, ShieldAlert, FileSearch, ArrowRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreBadge({ score }) {
  const isGood = score >= 70;
  const isMed = score >= 40;
  const color = isGood ? 'text-emerald-400' : isMed ? 'text-amber-400' : 'text-red-400';
  const bg = isGood ? 'bg-emerald-500/10 border-emerald-500/20' : isMed ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20';
  const label = isGood ? 'Highly Legitimate' : isMed ? 'Somewhat Suspicious' : 'Likely Fraudulent';
  const Icon = isGood ? CheckCircle2 : isMed ? AlertCircle : ShieldAlert;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border font-black uppercase tracking-widest text-xs shadow-lg ${bg} ${color}`}
    >
      <Icon size={16} strokeWidth={3} />
      {label} · {score}%
    </motion.div>
  );
}

function OfferVerifier() {
  const [offerText, setOfferText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!offerText.trim()) return toast.error('Please paste your offer letter text');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/tools/offer-verify`, { offerText });
      setResult(res.data);
      toast.success('Offer letter analyzed!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to verify offer letter.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Offer Verifier">
      <div className="space-y-8 pb-12 animate-fade-in text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/5">
              <ShieldCheck size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Offer <span className="gradient-text">Validator</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Fraud Detection & Term Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="glass-card px-4 py-2 border-white/5 flex items-center gap-2 bg-white/5">
                <Sparkles size={16} className="text-violet-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">AI Risk Assessment</span>
             </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 border-white/5 bg-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Paste Offer Letter Text</label>
                  <div className="relative group">
                    <textarea
                      className="w-full px-6 py-5 rounded-3xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all text-sm font-medium text-white placeholder:text-slate-700 min-h-[400px] resize-none pr-12 custom-scrollbar group-hover:border-white/20"
                      placeholder="Paste the complete text content of the offer letter you received..."
                      value={offerText}
                      onChange={e => setOfferText(e.target.value)}
                    />
                    <div className="absolute top-5 right-6 text-slate-700 group-hover:text-violet-500 transition-colors">
                        <ScrollText size={20} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="btn-primary w-full py-4 text-lg font-black group overflow-hidden relative"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                         <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                         <span className="animate-pulse">RUNNING HEURISTICS...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                        <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
                        INITIATE VERIFICATION
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 border-white/5 bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <FileSearch size={18} />
                 </div>
                 <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">Verification Logic</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Standard legal clauses',
                  'Company information completeness',
                  'Suspicious payment requests',
                  'Missing details',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-emerald-500/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 bg-red-500/5 border border-red-500/10">
               <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="text-red-400" size={18} />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Scam Patterns</span>
               </div>
               <ul className="space-y-3">
                  {['Upfront fees', 'Immediate start', 'Unreal salary'].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <ArrowRight size={12} className="text-red-500/50" />
                      {t}
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
               key="loading"
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.98 }}
               className="glass-card p-16 flex flex-col items-center justify-center text-center space-y-8 border-violet-500/20 min-h-[400px]"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
                <ShieldCheck className="absolute inset-0 m-auto text-violet-400 animate-pulse-glow" size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight">AI Audit in Progress</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Evaluating document structure, legal vocabulary, and known fraudulent contact signatures.</p>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div 
               key="results"
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="space-y-8"
            >
              {/* Score Header */}
              <div className="glass-card p-8 border-white/5 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                      <ScrollText size={30} className="text-slate-400" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-wider">Analysis Report</h3>
                      <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest leading-none">JobVerify Security Clearance</p>
                   </div>
                </div>
                <ScoreBadge score={result.trustScore || 0} />
              </div>

              {/* Key Terms Grid */}
              {result.keyTerms && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Identified Role', val: result.keyTerms.role, icon: Target, color: 'text-violet-400' },
                    { label: 'Compensation', val: result.keyTerms.salary, icon: Zap, color: 'text-amber-400' },
                    { label: 'Standard Benefits', val: result.keyTerms.benefits?.join(', '), icon: Sparkles, color: 'text-blue-400' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="glass-card p-6 border-white/5 bg-white/5 group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                         <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon size={16} />
                         </div>
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="font-black text-white text-lg tracking-tight group-hover:text-violet-400 transition-colors">{item.val || 'Undisclosed'}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Red Flags & Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Red Flags */}
                 <motion.div whileHover={{ y: -5 }} className="glass-card p-8 border-white/5 bg-white/5 md:col-span-2 group border-red-500/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shadow-lg group-hover:scale-110 transition-transform">
                          <XCircle size={24} strokeWidth={2.5} />
                       </div>
                       <h3 className="font-black text-white uppercase tracking-widest text-sm">Identified Anomalies</h3>
                    </div>
                    <span className="text-[10px] font-black text-red-500">{result.redFlags?.length || 0} RISKS FOUND</span>
                  </div>
                  
                  {result.redFlags?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.redFlags.map((f, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-red-500/[0.03] border border-red-500/10 rounded-2xl hover:bg-red-500/[0.08] transition-all group/item">
                          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                          <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{f}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                        <CheckCircle2 size={30} className="text-emerald-400 mx-auto mb-3" />
                        <p className="text-sm font-black text-white uppercase tracking-widest">No major red flags detected</p>
                    </div>
                  )}
                </motion.div>

                {/* Recommendation */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-8 bg-gradient-to-br from-violet-600/20 to-transparent border-violet-500/20 h-full">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
                         <Info size={24} />
                      </div>
                      <h3 className="font-black text-white uppercase tracking-widest text-sm">AI Guidance</h3>
                   </div>
                   <div className="space-y-4">
                      <p className="text-sm font-bold text-slate-300 leading-relaxed italic border-l-2 border-violet-500 pl-4 py-1">
                        "{result.recommendation}"
                      </p>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Suggested Next Step</p>
                        <div className="px-4 py-3 bg-white/5 rounded-xl text-xs font-black text-violet-400 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                           VERIFY COMPANY
                           <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default OfferVerifier;
