import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScrollText, Loader2, CheckCircle2, XCircle, AlertCircle, 
  ShieldCheck, Sparkles, Zap, Info, ShieldAlert, FileSearch, ArrowRight, ChevronLeft, Target, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreBadge({ score }) {
  const isGood = score >= 70;
  const isMed = score >= 40;
  const color = isGood ? 'text-[#22d3a5]' : isMed ? 'text-amber-500' : 'text-red-500';
  const bg = isGood ? 'bg-[#22d3a5]/10 border-[#22d3a5]/20' : isMed ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20';
  const label = isGood ? 'Highly Legitimate' : isMed ? 'Somewhat Suspicious' : 'Likely Fraudulent';
  const Icon = isGood ? CheckCircle2 : isMed ? AlertCircle : ShieldAlert;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border font-bold uppercase tracking-widest text-[10px] shadow-sm ${bg} ${color}`}
    >
      <Icon size={16} />
      {label} · <span className="font-['JetBrains_Mono']">{score}%</span>
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
      toast.success('Offer letter analyzed! 🛡️');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to verify offer letter.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
           
           {/* Header Section */}
           <header className="mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
                 Dashboard <ChevronRight size={10} /> Offer Validator
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 shadow-xl shadow-[#6366f1]/5">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">Offer Validator</h2>
                    <p className="text-[#8b8b99] font-medium mt-1">Fraud Detection & Legal Term Analysis • AI Heuristics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-[#6366f1]" fill="currentColor" fillOpacity={0.2} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b8b99]">AI Risk Assessment</span>
                   </div>
                </div>
              </div>
           </header>

           {/* Input Section */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
             <div className="lg:col-span-2 space-y-8">
               <div className="bg-[#131316] rounded-[2.5rem] p-10 border border-white/5 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#6366f1]/5 rounded-bl-full pointer-events-none" />
                 
                 <div className="space-y-8 relative z-10">
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Paste Offer Letter Text</label>
                     <div className="relative group">
                       <textarea
                         className="input-field min-h-[400px] resize-none py-6 pr-12 custom-scrollbar"
                         placeholder="Paste the complete text content of the offer letter you received..."
                         value={offerText}
                         onChange={e => setOfferText(e.target.value)}
                       />
                       <div className="absolute top-6 right-8 text-[#55555f] group-focus-within:text-[#6366f1] transition-colors">
                            <ScrollText size={24} />
                       </div>
                     </div>
                   </div>

                   <button
                     onClick={handleVerify}
                     disabled={isLoading}
                     className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 disabled:opacity-50 text-xl"
                   >
                     {isLoading ? (
                       <div className="flex items-center justify-center gap-4">
                            <Loader2 size={24} className="animate-spin text-white" />
                            <span className="animate-pulse italic">RUNNING SECURITY HEURISTICS...</span>
                       </div>
                     ) : (
                       <div className="flex items-center justify-center gap-3">
                           <ShieldCheck size={24} />
                           INITIATE VERIFICATION ✨
                       </div>
                     )}
                   </button>
                 </div>
               </div>
             </div>

             {/* Sidebar */}
             <div className="space-y-8">
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#131316] p-8 rounded-[2rem] border border-white/5 shadow-xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20">
                       <FileSearch size={20} />
                    </div>
                    <h3 className="font-bold text-white text-[10px] uppercase tracking-[0.2em] pl-1">Verification Logic</h3>
                 </div>
                 <ul className="space-y-5">
                   {[
                     'Standard legal clauses audit',
                     'Company info completeness',
                     'Suspicious payment patterns',
                     'Contractual bias detection',
                   ].map((t, i) => (
                     <li key={i} className="flex items-center gap-4 group">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                       <span className="text-xs font-bold text-[#8b8b99] group-hover:text-white transition-colors uppercase tracking-tight">{t}</span>
                     </li>
                   ))}
                 </ul>
               </motion.div>

               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
                  <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <ShieldAlert className="text-white/40 mb-6" size={28} fill="currentColor" />
                  <h4 className="text-xl font-['Cabinet_Grotesk'] font-bold mb-3 italic">Scam Database</h4>
                  <ul className="space-y-3 opacity-80">
                     {['Upfront fees request', 'Unprofessional domains', 'Immediate start dates'].map((t, i) => (
                       <li key={i} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <ArrowRight size={12} strokeWidth={3} /> {t}
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
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="bg-[#131316] rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 shadow-xl min-h-[500px] relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-dot-grid opacity-10 animate-pulse" />
                 <div className="relative z-10 w-24 h-24">
                   <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin"></div>
                   <ShieldCheck className="absolute inset-0 m-auto text-[#6366f1] animate-pulse" size={40} />
                 </div>
                 <div className="relative z-10 space-y-4">
                   <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white">Critical Audit in Progress</h3>
                   <p className="text-[#8b8b99] font-medium max-w-sm mx-auto text-sm">Evaluating document structure, legal vocabulary, and known contact signatures.</p>
                 </div>
               </motion.div>
             ) : result ? (
               <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-10"
               >
                 {/* Score Header */}
                 <div className="bg-[#131316] p-10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/[0.02] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="w-16 h-16 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 shadow-2xl shadow-[#6366f1]/5">
                          <ScrollText size={32} />
                       </div>
                       <div>
                          <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">AI Audit Report</h3>
                          <p className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest mt-1">Security Clearance Level 4</p>
                       </div>
                    </div>
                    <div className="relative z-10">
                       <ScoreBadge score={result.trustScore || 0} />
                    </div>
                 </div>

                 {/* Key Terms Grid */}
                 {result.keyTerms && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                       { label: 'Target Position', val: result.keyTerms.role, icon: Target, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10' },
                       { label: 'Compensation', val: result.keyTerms.salary, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                       { label: 'Extracted Benefits', val: result.keyTerms.benefits?.join(', '), icon: Sparkles, color: 'text-[#22d3a5]', bg: 'bg-[#22d3a5]/10' }
                     ].map((item, idx) => (
                       <motion.div 
                         key={idx}
                         whileHover={{ y: -5 }}
                         className="bg-[#131316] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-[#6366f1]/30 transition-all"
                       >
                         <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                               <item.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest italic">{item.label}</span>
                         </div>
                         <p className="font-bold text-white text-xl tracking-tight leading-tight group-hover:text-white transition-colors uppercase italic">{item.val || 'Undisclosed'}</p>
                       </motion.div>
                     ))}
                   </div>
                 )}

                 {/* Risks & Recommendation */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                   {/* Red Flags */}
                    <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl md:col-span-2 group hover:border-red-500/30 transition-all">
                     <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform">
                             <XCircle size={28} />
                          </div>
                          <h3 className="text-xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight uppercase">Identified Anomalies</h3>
                       </div>
                       <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">{result.redFlags?.length || 0} Critical Risks</span>
                     </div>
                     
                     {result.redFlags?.length > 0 ? (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {result.redFlags.map((f, i) => (
                           <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl group/item hover:bg-red-500/10 transition-all">
                             <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5 opacity-50 group-hover/item:opacity-100" />
                             <p className="text-sm font-medium text-[#8b8b99] group-hover/item:text-white transition-colors uppercase tracking-tight italic">"{f}"</p>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="p-12 text-center bg-[#22d3a5]/5 rounded-[2.5rem] border border-[#22d3a5]/10 animate-fade-in relative overflow-hidden">
                           <div className="absolute inset-0 bg-dot-grid opacity-5" />
                           <div className="relative z-10">
                             <div className="w-16 h-16 bg-[#22d3a5]/10 text-[#22d3a5] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#22d3a5]/20">
                               <CheckCircle2 size={32} />
                             </div>
                             <p className="text-xs font-bold text-[#22d3a5] uppercase tracking-widest italic mb-2">Pristine Document Report</p>
                             <p className="text-[#8b8b99] font-medium text-[10px] max-w-sm mx-auto uppercase tracking-widest opacity-60 leading-relaxed">No major fraudulent signatures were detected by the AI scanner.</p>
                           </div>
                       </div>
                     )}
                   </div>

                   {/* Recommendation */}
                   <div className="p-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-[2.5rem] text-white shadow-2xl relative h-full group overflow-hidden border border-white/10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="flex items-center gap-3 mb-10 relative z-10">
                         <div className="w-12 h-12 rounded-2xl bg-white text-[#6366f1] flex items-center justify-center shadow-xl">
                            <Info size={28} />
                         </div>
                         <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/80">AI Guide</h3>
                      </div>
                      <div className="space-y-8 relative z-10">
                         <p className="text-lg font-medium text-white leading-relaxed italic border-l-2 border-white/30 pl-6 py-2">
                           "{result.recommendation}"
                         </p>
                         <div className="pt-6 border-t border-white/10">
                           <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Suggested Action</p>
                           <Link to="/detect" className="w-full px-6 py-4 bg-white text-[#6366f1] rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-between hover:bg-white/90 transition-all shadow-xl active:scale-95 group/btn">
                              Run Identity Check
                              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                           </Link>
                         </div>
                      </div>
                   </div>
                 </div>
                 
                 <div className="text-center pt-10 pb-20">
                    <button onClick={() => {setResult(null); setOfferText('');}} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-white/10 transition-all active:scale-95 italic">
                       Verify Another Document 🛡️
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
                     <ScrollText size={44} className="text-[#55555f] group-hover:text-[#6366f1] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 italic">Ready for Security Audit</h3>
                  <p className="max-w-xs text-[#8b8b99] font-medium text-sm">Paste your offer letter text above to initialize our high-precision fraud detection engine.</p>
               </motion.div>
             )}
           </AnimatePresence>
    </div>
  );
}

export default OfferVerifier;
