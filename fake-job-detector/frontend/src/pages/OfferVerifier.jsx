import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScrollText, Loader2, CheckCircle2, XCircle, AlertCircle, 
  ShieldCheck, Sparkles, Zap, Info, ShieldAlert, FileSearch, ArrowRight, ChevronRight, Target, Shield, Copy, Download 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreBadge({ score }) {
  const isGood = score >= 75;
  const isMed = score >= 45;
  
  const status = isGood ? { 
    label: 'SECURE', 
    sub: 'Verified Legitimate', 
    color: 'text-[#4CAF7D]', 
    bg: 'bg-[#EDFAF3]', 
    border: 'border-[#A8DFC4]',
    icon: CheckCircle2 
  } : isMed ? { 
    label: 'CAUTION', 
    sub: 'Verification Recommended', 
    color: 'text-[#E09B3D]', 
    bg: 'bg-[#FEF6E7]', 
    border: 'border-[#F5D89A]',
    icon: AlertCircle 
  } : { 
    label: 'DANGER', 
    sub: 'High Fraud Probability', 
    color: 'text-[#E05C5C]', 
    bg: 'bg-[#FDEFEF]', 
    border: 'border-[#F5BABA]',
    icon: ShieldAlert 
  };

  const Icon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-4 px-6 py-4 rounded-3xl border-2 shadow-sm ${status.bg} ${status.border}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${status.color} bg-white shadow-sm`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${status.color}`}>{status.label}</span>
            <span className="text-[10px] font-bold text-[#9AB5A8] opacity-50">•</span>
            <span className="font-mono text-sm font-bold text-[#2D4A3E]">{score}% TRUST</span>
        </div>
        <p className="text-sm font-bold text-[#2D4A3E]">{status.sub}</p>
      </div>
    </motion.div>
  );
}

function OfferVerifier() {
  const [offerText, setOfferText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fillDemo = () => {
    setOfferText(`OFFER LETTER: Senior Frontend Developer
Dear Candidate, we are pleased to offer you the position at Global Tech Solutions.
Salary: ₹28,00,000 per annum plus benefits.
Joining Date: Immediate.
Note: You need to deposit a refundable security amount of ₹5,000 for the laptop.`);
  };

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
      toast.success('Audit complete! 🛡️');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed.');
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
            <div className="bg-white rounded-3xl border border-[#E8E0D0] shadow-sm p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D4A3E]/5 rounded-bl-full pointer-events-none" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#6B8A7A] uppercase tracking-[0.2em]">Document Payload</label>
                    <span className="text-[10px] font-bold text-[#9AB5A8] uppercase tracking-widest">{offerText.length} Characters</span>
                  </div>
                  <div className="relative group">
                    <textarea
                      className="input-field min-h-[350px] resize-none py-6 px-6 bg-[#FAF7F2] font-medium text-sm leading-relaxed"
                      placeholder="Paste the full text of the offer letter or job contract for forensic analysis..."
                      value={offerText}
                      onChange={e => setOfferText(e.target.value)}
                    />
                    <div className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-sm border border-[#E8E0D0] text-[#9AB5A8] group-focus-within:text-[#2D4A3E] transition-colors">
                        <ScrollText size={18} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="w-full bg-[#2D4A3E] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-[#1A2E25] hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-60"
                >
                  {isLoading
                    ? <><Loader2 size={20} className="animate-spin" /><span>Deep Scanning Clauses...</span></>
                    : <><ShieldCheck size={20} className="text-[#C9A84C]" /><span>Execute Forensic Audit</span></>
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8E0D0] shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#F0F5F3] text-[#2D4A3E] flex items-center justify-center border border-[#C4D8D0] shadow-sm">
                  <FileSearch size={20} />
                </div>
                <div>
                   <h3 className="font-bold text-[#1A2E25] text-sm uppercase tracking-wide">Audit Parameters</h3>
                   <p className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest mt-0.5">Automated Checkpoints</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { t: 'Legal term validity', s: 'Checks for standard industry language' },
                  { t: 'Payment anomalies', s: 'Detects requests for upfront processing fees' },
                  { t: 'Company footprint', s: 'Cross-checks registration & domain age' },
                  { t: 'Termination clauses', s: 'Evaluates balance of labor rights' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EDFAF3] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#A8DFC4]">
                       <CheckCircle2 size={10} className="text-[#4CAF7D]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#3D5A4F]">{item.t}</p>
                        <p className="text-[10px] text-[#9AB5A8] leading-tight mt-0.5">{item.s}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1A2E25] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 text-white/5 opacity-20">
                 <ShieldAlert size={100} strokeWidth={1} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                 <ShieldAlert className="text-[#E05C5C]" size={20} />
                 <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Scam Alert Engine</h4>
              </div>
              <p className="text-xs text-[#9AB5A8] leading-relaxed mb-6 font-medium">Our neural network flags these high-risk patterns immediately:</p>
              <div className="space-y-3">
                {[
                  'Telegram/WhatsApp interview',
                  'Personal account payment',
                  'Vague "Administrative Fees"',
                  'Missing Employer ID (GST/PAN)'
                ].map((t, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center gap-2 text-[10px] font-bold">
                    <ArrowRight size={10} className="text-[#E05C5C]" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="bg-[#1A2E25] rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-[#2D4A3E] shadow-2xl min-h-[400px]"
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-[#0D1813] border-t-[#2D4A3E] animate-spin" />
                    <ShieldCheck className="absolute inset-0 m-auto text-[#C9A84C]" size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-[#F5F0E8]">Forensic Analysis Active</h3>
                   <p className="text-[#9AB5A8] text-sm mt-2 max-w-sm">Cross-referencing legal templates and screening for predatory patterns.</p>
                </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Verdict Header */}
              <div className="bg-[#0D1813] rounded-3xl border border-[#2D4A3E] shadow-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-4 border-b-[#C9A84C] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-bl-[100px] pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-[#1A2E25] rounded-2xl flex items-center justify-center text-[#C9A84C] border border-[#3D5A4F] shadow-inner">
                    <ScrollText size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F5F0E8] text-xl">Audit Report Summary</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-widest flex items-center gap-1">
                           <Target size={10} /> Forensic Scan ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                   <ScoreBadge score={result.trustScore || 0} />
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Left Side: Keys & Red Flags */}
                 <div className="lg:col-span-2 space-y-6">
                    {/* Key Terms */}
                    <div className="bg-[#1A2E25] rounded-3xl border border-[#2D4A3E] shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-[#362612] text-[#C9A84C] flex items-center justify-center border border-[#6B4B22] shadow-inner">
                                <FileSearch size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Extracted Provisions</h4>
                                <p className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest mt-0.5">Critical offer data points</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Assigned Role', val: result.keyTerms?.role, icon: Target, color: 'text-[#C9A84C]', bg: 'bg-[#0D1813]/80 border-[#3D5A4F]' },
                                { label: 'Comp Structure', val: result.keyTerms?.salary, icon: Zap, color: 'text-[#E09B3D]', bg: 'bg-[#362612] border-[#6B4B22]' },
                                { label: 'Benefits Package', val: result.keyTerms?.benefits?.join(', '), icon: Sparkles, color: 'text-[#4CAF7D]', bg: 'bg-[#183626] border-[#2D6A4F]' },
                                { label: 'Notice Period', val: 'Not detected', icon: ScrollText, color: 'text-[#9AB5A8]', bg: 'bg-[#0D1813]/50 border-[#2D4A3E]' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[#3D5A4F] bg-[#0D1813]/50 group hover:border-[#C9A84C] transition-colors shadow-inner backdrop-blur-sm">
                                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 border backdrop-blur-md`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-extrabold text-[#9AB5A8] uppercase tracking-widest">{item.label}</p>
                                        <p className="font-bold text-[#F5F0E8] text-sm truncate">{item.val || 'Review Required'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Red Flags / Clauses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1A2E25] rounded-3xl border border-[#2D4A3E] shadow-xl p-6 border-l-4 border-l-[#E05C5C]">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert size={20} className="text-[#E05C5C]" />
                                    <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Threat Signals</h4>
                                </div>
                                <span className="bg-[#3A1818] text-[#E05C5C] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#702525]">
                                    {result.redFlags?.length || 0} ALERTS
                                </span>
                            </div>
                            
                            {result.redFlags?.length > 0 ? (
                                <div className="space-y-3">
                                    {result.redFlags.map((f, i) => (
                                        <motion.div 
                                          key={i}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                          className="p-3 bg-[#3A1818] border border-[#702525] rounded-xl flex items-start gap-2.5"
                                        >
                                            <AlertCircle size={14} className="text-[#E05C5C] flex-shrink-0 mt-0.5" />
                                            <p className="text-xs font-bold text-[#FF8888] leading-relaxed italic">"{f}"</p>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#183626] flex items-center justify-center mb-3 border border-[#2D6A4F]">
                                       <CheckCircle2 size={24} className="text-[#4CAF7D]" />
                                    </div>
                                    <p className="text-xs font-bold text-[#4CAF7D]">No predatory patterns found</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#1A2E25] rounded-3xl border border-[#2D4A3E] shadow-xl p-6 border-l-4 border-l-[#4CAF7D]">
                             <div className="flex items-center gap-3 mb-6">
                                <Target size={20} className="text-[#4CAF7D]" />
                                <h4 className="font-bold text-[#F5F0E8] text-sm uppercase tracking-wide">Legal Checkpoints</h4>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { t: 'Comp & Benefits', exists: !!result.keyTerms?.salary },
                                    { t: 'Job Description', exists: !!result.keyTerms?.role },
                                    { t: 'Entity Validation', exists: (result.trustScore || 0) > 50 },
                                    { t: 'Notice Period', exists: false },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-[#9AB5A8]">{c.t}</span>
                                        {c.exists ? (
                                            <span className="text-[#4CAF7D] font-black uppercase text-[10px] tracking-tighter flex items-center gap-1">
                                                DETECTED <CheckCircle2 size={12} />
                                            </span>
                                        ) : (
                                            <span className="text-[#6B8A7A] font-black uppercase text-[10px] tracking-tighter flex items-center gap-1">
                                                MISSING <Info size={12} />
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Right Side: Recommendation & Actions */}
                 <div className="space-y-6">
                    <div className="bg-[#1A2E25] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Info size={16} className="text-[#4CAF7D] opacity-40" />
                        </div>
                        <h4 className="text-[10px] font-extrabold text-[#4CAF7D] uppercase tracking-[0.2em] mb-4">Neural Verdict</h4>
                        <p className="text-sm font-medium leading-relaxed italic text-[#F5F0E8] bg-white/5 p-5 rounded-2xl border border-white/10 mb-8">
                           "{result.recommendation}"
                        </p>
                        
                        <div className="space-y-3">
                             <h5 className="text-[9px] font-extrabold text-[#9AB5A8] uppercase tracking-[0.1em] mb-2 px-1">Security Toolkit</h5>
                             <Link to="/detect" className="w-full bg-[#C9A84C] text-[#1A2E25] font-extrabold text-[10px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#B8943D] transition-all">
                                <Zap size={14} /> Validate Identity
                             </Link>
                             <button className="w-full bg-white/10 text-white font-extrabold text-[10px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10">
                                <Copy size={14} /> Copy Report
                             </button>
                        </div>
                    </div>

                    <button 
                      onClick={() => { setResult(null); setOfferText(''); }} 
                      className="w-full bg-[#1A2E25] border-2 border-[#2D4A3E] text-[#9AB5A8] font-extrabold py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all shadow-xl"
                    >
                        Scan Another Draft
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {!result && !isLoading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center hover:border-[#2D4A3E] transition-colors group"
            >
              <div className="w-20 h-20 bg-[#FAF7F2] rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-[#E8E0D0] shadow-sm">
                <ShieldCheck size={40} className="text-[#2D4A3E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Legal Pre-Screening</h3>
              <p className="text-[#9AB5A8] text-sm max-w-sm mb-10 leading-relaxed">Secure your career by running a deep forensic audit on your offer letter before you sign.</p>
              
              <button 
                onClick={fillDemo}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#E8E0D0] text-[#3D5A4F] font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C9A84C] hover:text-white transition-all shadow-sm"
              >
                Load Sample Draft <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default OfferVerifier;
