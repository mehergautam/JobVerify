import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrollText, Loader2, CheckCircle2, XCircle, AlertCircle,
  ShieldCheck, Sparkles, Zap, Info, ShieldAlert, FileSearch, ArrowRight, ChevronRight, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreBadge({ score }) {
  const isGood = score >= 70;
  const isMed = score >= 40;
  const color = isGood ? 'text-[#4CAF7D]' : isMed ? 'text-[#E09B3D]' : 'text-[#E05C5C]';
  const bg = isGood ? 'bg-[#EDFAF3] border-[#A8DFC4]' : isMed ? 'bg-[#FEF6E7] border-[#F5D89A]' : 'bg-[#FDEFEF] border-[#F5BABA]';
  const label = isGood ? 'Highly Legitimate' : isMed ? 'Somewhat Suspicious' : 'Likely Fraudulent';
  const Icon = isGood ? CheckCircle2 : isMed ? AlertCircle : ShieldAlert;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border font-semibold text-xs ${bg} ${color}`}
    >
      <Icon size={15} /> {label} · <span className="font-mono font-bold">{score}%</span>
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
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/tools/offer-verify`, { offerText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
      toast.success('Offer letter analyzed! 🛡️');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to verify offer letter.');
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
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Offer Verifier</span>
        </div>
        <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
          <ShieldCheck size={22} className="text-[#2D4A3E]" /> Offer Letter Verifier
        </h1>
        <p className="text-[#6B8A7A] text-sm mt-1">AI fraud detection & legal term analysis</p>
        <span className="badge-forest mt-2 inline-block">AI Risk Assessment</span>
      </div>

      <div className="px-8 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Input */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Paste Offer Letter Text</label>
                  <div className="relative">
                    <textarea
                      className="input-field min-h-[300px] resize-none py-4 pr-10"
                      placeholder="Paste the complete text of the offer letter you received..."
                      value={offerText}
                      onChange={e => setOfferText(e.target.value)}
                    />
                    <ScrollText size={18} className="absolute top-4 right-3.5 text-[#9AB5A8]" />
                  </div>
                </div>
                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg text-base shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading
                    ? <><Loader2 size={18} className="animate-spin" /><span>Running Security Analysis...</span></>
                    : <><ShieldCheck size={18} /><span>Verify Offer Letter</span></>
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#F0F5F3] text-[#2D4A3E] flex items-center justify-center">
                  <FileSearch size={16} />
                </div>
                <h3 className="font-semibold text-sm text-[#1A2E25]">What We Check</h3>
              </div>
              <ul className="space-y-2.5">
                {['Standard legal clauses', 'Company info completeness', 'Suspicious payment patterns', 'Contractual bias detection'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#6B8A7A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FDEFEF] border border-[#F5BABA] rounded-2xl p-5">
              <ShieldAlert className="text-[#E05C5C] mb-3" size={22} />
              <h4 className="font-semibold text-sm text-[#1A2E25] mb-2">Common Scam Signals</h4>
              <ul className="space-y-1.5">
                {['Upfront fees request', 'Unprofessional domains', 'Immediate start "today"'].map((t, i) => (
                  <li key={i} className="text-xs text-[#C04040] flex items-center gap-1.5">
                    <ArrowRight size={11} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Score */}
              <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#F0F5F3] rounded-xl flex items-center justify-center text-[#2D4A3E]">
                    <ScrollText size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A2E25] text-lg">AI Audit Report</h3>
                    <p className="text-xs text-[#9AB5A8]">Security Clearance Analysis</p>
                  </div>
                </div>
                <ScoreBadge score={result.trustScore || 0} />
              </div>

              {/* Key Terms */}
              {result.keyTerms && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Position', val: result.keyTerms.role, icon: Target, bg: 'bg-[#F0F5F3]', color: 'text-[#2D4A3E]' },
                    { label: 'Compensation', val: result.keyTerms.salary, icon: Zap, bg: 'bg-[#FEF6E7]', color: 'text-[#E09B3D]' },
                    { label: 'Benefits', val: result.keyTerms.benefits?.join(', '), icon: Sparkles, bg: 'bg-[#EDFAF3]', color: 'text-[#4CAF7D]' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-5">
                      <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                        <item.icon size={17} />
                      </div>
                      <p className="text-xs text-[#9AB5A8] uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="font-semibold text-[#1A2E25] text-sm">{item.val || 'Not specified'}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Red Flags + Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className={`md:col-span-2 bg-white rounded-2xl border shadow-sm p-6 ${result.redFlags?.length > 0 ? 'border-l-4 border-l-[#E05C5C] border-[#E8E0D0]' : 'border-l-4 border-l-[#4CAF7D] border-[#E8E0D0]'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <XCircle size={18} className="text-[#E05C5C]" />
                      <h3 className="font-semibold text-[#1A2E25] text-sm">Identified Anomalies</h3>
                    </div>
                    <span className="badge-danger">{result.redFlags?.length || 0} Risks</span>
                  </div>
                  {result.redFlags?.length > 0 ? (
                    <div className="space-y-2.5">
                      {result.redFlags.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-[#FDEFEF] border border-[#F5BABA] rounded-xl">
                          <AlertCircle size={15} className="text-[#E05C5C] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[#C04040]">"{f}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-8 text-center">
                      <CheckCircle2 size={36} className="text-[#4CAF7D] mb-2" />
                      <p className="font-semibold text-[#2D4A3E]">No anomalies detected</p>
                      <p className="text-xs text-[#9AB5A8] mt-0.5">Offer letter appears legitimate</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#2D4A3E] rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                      <Info size={15} />
                    </div>
                    <h4 className="font-semibold text-sm text-[#F5F0E8]">AI Recommendation</h4>
                  </div>
                  <p className="text-sm text-[#9AB5A8] leading-relaxed italic mb-4">"{result.recommendation}"</p>
                  <Link to="/detect" className="w-full bg-[#C9A84C] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-between hover:bg-[#B8943D] transition-colors">
                    Run Identity Check <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="text-center pt-2">
                <button onClick={() => { setResult(null); setOfferText(''); }} className="btn-secondary text-sm">Verify Another Document</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default OfferVerifier;
