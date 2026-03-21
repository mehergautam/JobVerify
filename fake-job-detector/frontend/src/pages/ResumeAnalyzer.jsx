import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Loader2, CheckCircle2, AlertCircle,
  Lightbulb, X, CloudUpload, ClipboardList, Zap, Info, ArrowRight,
  ShieldCheck, FileSearch, Sparkles, ChevronLeft, ChevronRight, Activity, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─── Score Ring ─── */
function ScoreRing({ score }) {
  const color = score >= 75 ? 'text-[#22d3a5]' : score >= 50 ? 'text-amber-500' : 'text-red-500';
  const r = 54;
  const circ = 2 * Math.PI * r;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" className="stroke-white/5" strokeWidth="10" />
        <motion.circle 
          cx="70" cy="70" r={r} fill="none" stroke="currentColor" strokeWidth="10"
          className={`${color}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circ}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-['JetBrains_Mono'] font-bold text-white tracking-tighter"
        >
          {score}
        </motion.span>
        <span className="text-[8px] font-bold text-[#55555f] uppercase tracking-widest mt-[-2px]">ATS Score</span>
      </div>
    </div>
  );
}

/* ─── Tag chips ─── */
function TagList({ items, color }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(items || []).map((item, i) => (
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          key={i} 
          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${color}`}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState('pdf');
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are supported.');
        return;
      }
      setPdfFile(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are supported.');
        return;
      }
      setPdfFile(file);
    }
    e.target.value = '';
  };

  const handleAnalyze = async () => {
    setResult(null);
    if (activeTab === 'pdf') {
      if (!pdfFile) return toast.error('Please upload a PDF file first.');
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('resume', pdfFile);
        if (jobRole) formData.append('jobRole', jobRole);
        const token = localStorage.getItem('token');
        const res = await axios.post(`${API_URL}/tools/resume-upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        setResult(res.data);
        toast.success('PDF analyzed successfully! ✨');
      } catch (err) {
        toast.error(err.response?.data?.error || 'PDF analysis failed.');
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!resumeText.trim()) return toast.error('Please paste your resume text.');
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          `${API_URL}/tools/resume-analyze`,
          { resumeText, jobRole },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} },
        );
        setResult(res.data);
        toast.success('Analysis complete! ✨');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Analysis failed.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const score = result?.atsScore || 0;
  const scoreColors = score >= 75 ? 'bg-[#22d3a5]/10 border-[#22d3a5]/20' : score >= 50 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20';
  const scoreLabel = score >= 75 ? 'Match Confirmed' : score >= 50 ? 'Partial Match' : 'Optimization Required';
  const scoreLabelColor = score >= 75 ? 'text-[#22d3a5]' : score >= 50 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
          
          {/* Header Section */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
               Dashboard <ChevronRight size={10} /> ATS Optimizer
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 shadow-xl shadow-[#6366f1]/5">
                  <FileSearch size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">ATS Optimizer</h2>
                  <p className="text-[#8b8b99] font-medium mt-1">Global Standard AI Analysis • Groq Llama 3 v3.0</p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] border border-[#22d3a5]/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#22d3a5] animate-pulse" />
                 99.8% Accuracy Rate
              </div>
            </div>
          </header>

          {/* Input & Tips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#131316] rounded-[2.5rem] p-10 border border-white/5 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/5 rounded-bl-full pointer-events-none" />
                
                <div className="space-y-8 relative z-10">
                  {/* Target Role */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Target Job Role</label>
                    <div className="relative group">
                      <input
                        className="input-field pl-12"
                        placeholder="e.g. Senior Frontend Developer, Marketing Lead"
                        value={jobRole}
                        onChange={e => setJobRole(e.target.value)}
                      />
                      <Target size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1] transition-colors" />
                    </div>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
                    <button
                      onClick={() => setActiveTab('pdf')}
                      className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'pdf' ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white'
                      }`}
                    >
                      <CloudUpload size={14} /> PDF Upload
                    </button>
                    <button
                      onClick={() => setActiveTab('text')}
                      className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'text' ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20' : 'text-[#8b8b99] hover:text-white'
                      }`}
                    >
                      <ClipboardList size={14} /> Raw Text
                    </button>
                  </div>

                  {/* PDF Drop Zone */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'pdf' ? (
                      <motion.div 
                        key="pdf" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
                        {!pdfFile ? (
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`cursor-pointer border-2 border-dashed rounded-[2rem] p-16 flex flex-col items-center gap-6 transition-all duration-300 group ${
                              isDragging ? 'border-[#6366f1] bg-[#6366f1]/5' : 'border-white/5 bg-white/5 hover:border-[#6366f1]/30 hover:bg-white/[0.08]'
                            }`}
                          >
                            <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all ${
                              isDragging ? 'bg-[#6366f1] text-white scale-110 shadow-xl shadow-[#6366f1]/20' : 'bg-white/5 text-[#55555f] group-hover:bg-[#6366f1] group-hover:text-white group-hover:shadow-xl'
                            }`}>
                              <CloudUpload size={36} />
                            </div>
                            <div className="text-center">
                              <h3 className="font-bold text-white text-xl tracking-tight">
                                {isDragging ? 'Drop it here!' : 'Secure Upload Portal'}
                              </h3>
                              <p className="text-[10px] text-[#8b8b99] mt-2 font-bold uppercase tracking-widest">Only PDF files supported • Max 5MB</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-[#6366f1]/5 border border-[#6366f1]/20 rounded-[2rem] p-8 flex items-center gap-6 group relative animate-slide-up">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 text-[#6366f1] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform border border-white/5">
                              <FileText size={32} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xl font-bold text-white truncate">{pdfFile.name}</p>
                              <p className="text-[10px] font-bold text-[#6366f1] uppercase tracking-widest mt-1 italic">{(pdfFile.size / 1024).toFixed(1)} KB · READY FOR ANALYSIS</p>
                            </div>
                            <button onClick={() => setPdfFile(null)} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-[#55555f] transition-all border border-white/5">
                              <X size={20} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="text" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <textarea
                          className="input-field min-h-[300px] resize-none py-6 pr-12 custom-scrollbar"
                          placeholder="Paste the full text content of your resume here for immediate scanning..."
                          value={resumeText}
                          onChange={e => setResumeText(e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 disabled:opacity-50 text-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-4">
                           <Loader2 size={24} className="animate-spin text-white" />
                           <span className="animate-pulse italic">DECODING RESUME...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                          <Sparkles size={24} />
                          INITIALIZE SCAN ✨
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Strategy Sidebar */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#131316] p-8 rounded-[2rem] border border-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] flex items-center justify-center border border-[#22d3a5]/20">
                      <CheckCircle2 size={20} />
                   </div>
                   <h3 className="font-bold text-white text-[10px] uppercase tracking-[0.2em]">Strategy</h3>
                </div>
                <ul className="space-y-5">
                  {[
                    'Use text-based PDFs only',
                    'Quantify your achievements',
                    'Include specific skill section',
                    'Avoid complex multi-columns',
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                      <span className="text-xs font-bold text-[#8b8b99] group-hover:text-white transition-colors uppercase tracking-tight">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
                  <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <Sparkles className="text-white/40 mb-6" size={28} fill="currentColor" />
                  <h4 className="text-xl font-['Cabinet_Grotesk'] font-bold mb-3 italic">AI Precision Engine</h4>
                  <p className="text-[10px] text-white/70 font-bold leading-relaxed tracking-widest uppercase">Proprietary benchmarks from 10k+ hires powering your report.</p>
              </motion.div>
            </div>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="bg-[#131316] rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 shadow-xl min-h-[500px] relative overflow-hidden"
              >
                  <div className="absolute inset-0 bg-dot-grid opacity-10 animate-pulse" />
                  <div className="relative z-10 w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin"></div>
                    <FileSearch className="absolute inset-0 m-auto text-[#6366f1] animate-pulse" size={40} />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white">Advanced Scan in Progress</h3>
                    <p className="text-[#8b8b99] font-medium max-w-sm mx-auto text-sm">Cross-referencing industry standard formatting & semantic clusters.</p>
                  </div>
              </motion.div>
            )}

            {result && !isLoading && (
              <motion.div 
                 initial={{ opacity: 0, y: 30 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="space-y-10"
              >
                {/* Score Hero */}
                <div className={`rounded-[3rem] p-12 border relative overflow-hidden shadow-2xl ${scoreColors}`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <ScoreRing score={score} />
                    <div className="text-center md:text-left flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <h3 className={`text-3xl font-['Cabinet_Grotesk'] font-bold tracking-tight ${scoreLabelColor}`}>{scoreLabel}</h3>
                          <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-current self-center md:self-auto opacity-50`}>
                              AI Assessment Complete
                          </div>
                      </div>
                      <p className="text-[#f2f2f5] font-medium text-lg leading-relaxed italic bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                        "{result.summary}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detail Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl group hover:border-[#22d3a5]/30 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-[#22d3a5]/10 text-[#22d3a5] flex items-center justify-center border border-[#22d3a5]/20 group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={24} />
                         </div>
                         <h3 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Winning Assets</h3>
                      </div>
                      <span className="text-[10px] font-bold text-[#22d3a5] uppercase tracking-widest">Confirmed</span>
                    </div>
                    <ul className="space-y-4">
                      {(result.strengths || []).map((s, i) => (
                        <li key={i} className="text-[#8b8b99] text-sm font-medium flex items-start gap-4 p-4 bg-white/5 rounded-2xl group/item hover:bg-[#22d3a5]/10 transition-colors">
                            <Info size={16} className="text-[#6366f1] mt-0.5 shrink-0 opacity-40 group-hover/item:opacity-100" />
                            <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl group hover:border-red-500/30 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform">
                            <AlertCircle size={24} />
                         </div>
                         <h3 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Gap Analysis</h3>
                      </div>
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">High Impact</span>
                    </div>
                    <ul className="space-y-4">
                      {(result.weaknesses || []).map((w, i) => (
                        <li key={i} className="text-[#8b8b99] text-sm font-medium flex items-start gap-4 p-4 bg-white/5 rounded-2xl group/item hover:bg-red-500/10 transition-colors">
                            <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0 opacity-40 group-hover/item:opacity-100" />
                            <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl md:col-span-2 group hover:border-[#6366f1]/30 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 group-hover:scale-110 transition-transform">
                            <Sparkles size={24} fill="currentColor" fillOpacity={0.2} />
                         </div>
                         <h3 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Semantic Match Matrix</h3>
                      </div>
                      <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest italic">Target Keywords Found</span>
                    </div>
                    <TagList items={result.keywordsFound} color="bg-white/5 text-[#8b8b99] border-white/5" />
                  </div>

                  {/* Recommendations */}
                  <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl md:col-span-2 group hover:border-[#6366f1]/50 border-t-[#6366f1]/40 transition-all">
                    <div className="flex items-center gap-3 mb-10">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center shadow-lg shadow-[#6366f1]/20 group-hover:scale-110 transition-transform">
                          <Lightbulb size={24} />
                       </div>
                       <h3 className="font-bold text-white uppercase tracking-[0.2em] text-[10px]">Roadmap to Success</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(result.recommendations || []).map((r, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] hover:-translate-y-1 transition-all group/item shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-white/5 text-[#6366f1] flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform border border-white/5">
                             <CheckCircle2 size={18} />
                          </div>
                          <p className="text-[#8b8b99] text-sm font-medium group-hover/item:text-white transition-colors leading-relaxed">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-10 pb-20">
                   <button onClick={() => {setResult(null); setPdfFile(null); setResumeText('');}} className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-white/10 transition-all active:scale-95">
                      Optimize Another Resume
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
    </div>
  );
}

export default ResumeAnalyzer;
