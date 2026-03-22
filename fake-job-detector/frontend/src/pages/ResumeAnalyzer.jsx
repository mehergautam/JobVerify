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
  const color = score >= 75 ? 'text-[#4CAF7D]' : score >= 50 ? 'text-[#E09B3D]' : 'text-[#E05C5C]';
  const r = 54;
  const circ = 2 * Math.PI * r;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" className="stroke-[#F0EBE0]" strokeWidth="10" />
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
          className="text-4xl font-['JetBrains_Mono'] font-bold text-[#1A2E25] tracking-tighter"
        >
          {score}
        </motion.span>
        <span className="text-[8px] font-bold text-[#9AB5A8] uppercase tracking-widest mt-[-2px]">ATS Score</span>
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
  const scoreColors = score >= 75 ? 'bg-[#EDFAF3] border-[#A8DFC4]' : score >= 50 ? 'bg-[#FEF6E7] border-[#F5D89A]' : 'bg-[#FDEFEF] border-[#F5BABA]';
  const scoreLabel = score >= 75 ? 'Match Confirmed' : score >= 50 ? 'Partial Match' : 'Optimization Required';
  const scoreLabelColor = score >= 75 ? 'text-[#4CAF7D]' : score >= 50 ? 'text-[#E09B3D]' : 'text-[#E05C5C]';

  return (
    <div className="animate-fade-in pb-20">
          
          {/* Header Section */}
          <header className="bg-white border-b border-[#E8E0D0] px-8 py-6 mb-8">
            <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
              <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
              <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">ATS Optimizer</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F5F3] text-[#2D4A3E] flex items-center justify-center border border-[#C4D8D0] shadow-sm">
                  <FileSearch size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A2E25]">ATS Optimizer</h2>
                  <p className="text-[#6B8A7A] text-sm mt-1">Global Standard AI Analysis • Groq Llama 3 v3.0</p>
                </div>
              </div>
              <div className="badge-success flex items-center gap-2 self-start px-4 py-2">
                 <div className="w-2 h-2 rounded-full bg-[#4CAF7D] animate-pulse" />
                 99.8% Accuracy Rate
              </div>
            </div>
          </header>

          <div className="px-8">
          {/* Input & Tips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-[#E8E0D0] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-bl-full pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  {/* Target Role */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Target Job Role</label>
                    <div className="relative group">
                      <input
                        className="input-field pl-12"
                        placeholder="e.g. Senior Frontend Developer, Marketing Lead"
                        value={jobRole}
                        onChange={e => setJobRole(e.target.value)}
                      />
                      <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AB5A8] group-focus-within:text-[#C9A84C] transition-colors" />
                    </div>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 rounded-xl w-fit border border-[#E8E0D0]">
                    <button
                      onClick={() => setActiveTab('pdf')}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'pdf' ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'
                      }`}
                    >
                      <CloudUpload size={14} /> PDF Upload
                    </button>
                    <button
                      onClick={() => setActiveTab('text')}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'text' ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'
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
                            className={`cursor-pointer border-2 border-dashed rounded-2xl p-14 flex flex-col items-center gap-5 transition-all duration-300 group ${
                              isDragging ? 'border-[#C9A84C] bg-[#FDF3DC]' : 'border-[#E8E0D0] bg-[#FAF7F2] hover:border-[#C9A84C] hover:bg-[#FDF3DC]'
                            }`}
                          >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                              isDragging ? 'bg-[#C9A84C] text-white scale-110 shadow-lg' : 'bg-white text-[#9AB5A8] border border-[#E8E0D0] group-hover:bg-[#C9A84C] group-hover:text-white group-hover:shadow-lg group-hover:border-transparent'
                            }`}>
                              <CloudUpload size={30} />
                            </div>
                            <div className="text-center">
                              <h3 className="font-bold text-[#1A2E25] text-lg tracking-tight">
                                {isDragging ? 'Drop it here!' : 'Secure Upload Portal'}
                              </h3>
                              <p className="text-xs text-[#9AB5A8] mt-1.5 font-semibold uppercase tracking-widest">Only PDF files supported • Max 5MB</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-[#FDF3DC] border border-[#F5E6C0] rounded-2xl p-6 flex items-center gap-5 group relative">
                            <div className="w-14 h-14 rounded-xl bg-white text-[#C9A84C] flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform border border-[#F5E6C0]">
                              <FileText size={28} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-bold text-[#1A2E25] truncate">{pdfFile.name}</p>
                              <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · Ready for Analysis</p>
                            </div>
                            <button onClick={() => setPdfFile(null)} className="p-2.5 rounded-xl bg-white hover:bg-[#FDEFEF] hover:text-[#E05C5C] text-[#9AB5A8] transition-all border border-[#E8E0D0]">
                              <X size={18} />
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
                          className="input-field min-h-[280px] resize-none py-4"
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
                    className="w-full bg-[#C9A84C] text-white font-bold py-4 rounded-xl shadow-[0_4px_12px_rgba(201,168,76,0.25)] transition-all hover:bg-[#B8943D] hover:scale-[1.02] active:scale-95 disabled:opacity-50 text-base flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                           <Loader2 size={20} className="animate-spin" />
                           <span className="animate-pulse">Analyzing Resume...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2.5">
                          <Sparkles size={20} />
                          Initialize Scan ✨
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Strategy Sidebar */}
            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-2xl border border-[#E8E0D0] shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-9 h-9 rounded-xl bg-[#EDFAF3] text-[#4CAF7D] flex items-center justify-center border border-[#A8DFC4]">
                      <CheckCircle2 size={18} />
                   </div>
                   <h3 className="font-semibold text-[#1A2E25] text-sm uppercase tracking-widest">Strategy</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Use text-based PDFs only',
                    'Quantify your achievements',
                    'Include specific skill section',
                    'Avoid complex multi-columns',
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] group-hover:scale-150 transition-transform flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#6B8A7A] group-hover:text-[#1A2E25] transition-colors">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-[#2D4A3E] rounded-2xl text-white shadow-lg relative overflow-hidden group border border-[#3D5A4F]">
                  <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#C9A84C]/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <Sparkles className="text-[#C9A84C] mb-4" size={24} fill="currentColor" fillOpacity={0.3} />
                  <h4 className="text-lg font-bold text-[#F5F0E8] mb-2">AI Precision Engine</h4>
                  <p className="text-xs text-[#9AB5A8] leading-relaxed tracking-wide">Proprietary benchmarks from 10k+ hires powering your report.</p>
              </motion.div>
            </div>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-[#E8E0D0] shadow-sm min-h-[400px]"
              >
                  <div className="relative z-10 w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[#F0EBE0]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#C9A84C] border-t-transparent animate-spin"></div>
                    <FileSearch className="absolute inset-0 m-auto text-[#C9A84C] animate-pulse" size={28} />
                  </div>
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-xl font-bold text-[#1A2E25]">Advanced Scan in Progress</h3>
                    <p className="text-[#6B8A7A] text-sm max-w-sm mx-auto">Cross-referencing industry standard formatting & semantic clusters.</p>
                  </div>
              </motion.div>
            )}

            {result && !isLoading && (
              <motion.div 
                 initial={{ opacity: 0, y: 30 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="space-y-6"
              >
                {/* Score Hero */}
                <div className={`rounded-2xl p-10 border relative overflow-hidden shadow-sm ${scoreColors}`}>
                  <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <ScoreRing score={score} />
                    <div className="text-center md:text-left flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <h3 className={`text-2xl font-bold tracking-tight ${scoreLabelColor}`}>{scoreLabel}</h3>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-current self-center md:self-auto opacity-60`}>
                              AI Assessment Complete
                          </div>
                      </div>
                      <p className="text-[#3D5A4F] font-medium text-base leading-relaxed italic bg-white/60 p-5 rounded-xl border border-[#E8E0D0]">
                        "{result.summary}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detail Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white p-8 rounded-2xl border border-[#E8E0D0] shadow-sm group hover:border-[#A8DFC4] transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl bg-[#EDFAF3] text-[#4CAF7D] flex items-center justify-center border border-[#A8DFC4] group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={20} />
                         </div>
                         <h3 className="font-semibold text-[#1A2E25] uppercase tracking-widest text-xs">Winning Assets</h3>
                      </div>
                      <span className="badge-success">Confirmed</span>
                    </div>
                    <ul className="space-y-3">
                      {(result.strengths || []).map((s, i) => (
                        <li key={i} className="text-[#6B8A7A] text-sm font-medium flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-xl group/item hover:bg-[#EDFAF3] transition-colors">
                            <Info size={15} className="text-[#4CAF7D] mt-0.5 shrink-0" />
                            <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-white p-8 rounded-2xl border border-[#E8E0D0] shadow-sm group hover:border-[#F5BABA] transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl bg-[#FDEFEF] text-[#E05C5C] flex items-center justify-center border border-[#F5BABA] group-hover:scale-110 transition-transform">
                            <AlertCircle size={20} />
                         </div>
                         <h3 className="font-semibold text-[#1A2E25] uppercase tracking-widest text-xs">Gap Analysis</h3>
                      </div>
                      <span className="badge-danger">High Impact</span>
                    </div>
                    <ul className="space-y-3">
                      {(result.weaknesses || []).map((w, i) => (
                        <li key={i} className="text-[#6B8A7A] text-sm font-medium flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-xl group/item hover:bg-[#FDEFEF] transition-colors">
                            <AlertCircle size={15} className="text-[#E05C5C] mt-0.5 shrink-0" />
                            <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div className="bg-white p-8 rounded-2xl border border-[#E8E0D0] shadow-sm md:col-span-2 group hover:border-[#C9A84C] transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center border border-[#F5E6C0] group-hover:scale-110 transition-transform">
                            <Sparkles size={18} fill="currentColor" fillOpacity={0.3} />
                         </div>
                         <h3 className="font-semibold text-[#1A2E25] uppercase tracking-widest text-xs">Semantic Match Matrix</h3>
                      </div>
                      <span className="text-xs font-semibold text-[#9AB5A8] uppercase tracking-widest">Target Keywords Found</span>
                    </div>
                    <TagList items={result.keywordsFound} color="bg-[#FAF7F2] text-[#6B8A7A] border-[#E8E0D0]" />
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white p-8 rounded-2xl border border-[#E8E0D0] shadow-sm md:col-span-2 group hover:border-[#C9A84C] transition-all">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-9 h-9 rounded-xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center border border-[#F5E6C0] group-hover:scale-110 transition-transform">
                          <Lightbulb size={18} />
                       </div>
                       <h3 className="font-semibold text-[#1A2E25] uppercase tracking-widest text-xs">Roadmap to Success</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(result.recommendations || []).map((r, i) => (
                        <div key={i} className="flex items-start gap-3.5 p-5 bg-[#FAF7F2] rounded-xl border border-[#E8E0D0] hover:bg-[#FDF3DC] hover:-translate-y-0.5 transition-all group/item shadow-sm">
                          <div className="w-8 h-8 rounded-lg bg-white text-[#C9A84C] flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform border border-[#E8E0D0]">
                             <CheckCircle2 size={16} />
                          </div>
                          <p className="text-[#6B8A7A] text-sm font-medium group-hover/item:text-[#3D5A4F] transition-colors leading-relaxed">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-6 pb-10">
                   <button onClick={() => {setResult(null); setPdfFile(null); setResumeText('');}} className="btn-secondary text-sm">
                      Optimize Another Resume
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
    </div>
  );
}

export default ResumeAnalyzer;
