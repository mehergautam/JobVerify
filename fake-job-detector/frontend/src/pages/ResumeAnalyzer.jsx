import React, { useState, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Loader2, CheckCircle2, AlertCircle,
  Lightbulb, X, CloudUpload, ClipboardList, Zap, Info, ArrowRight,
  ShieldCheck, FileSearch, Sparkles
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─── Score Ring ─── */
function ScoreRing({ score }) {
  const color = score >= 75 ? 'stroke-emerald-400' : score >= 50 ? 'stroke-amber-400' : 'stroke-red-400';
  const r = 54;
  const circ = 2 * Math.PI * r;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" className="stroke-white/5" strokeWidth="10" />
        <motion.circle 
          cx="70" cy="70" r={r} fill="none" className={`${color}`} strokeWidth="10"
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-black text-white"
        >
          {score}
        </motion.span>
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-0.5">ATS Score</span>
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
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/5 ${color}`}
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
        toast.success('PDF analyzed successfully!');
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
        toast.success('Analysis complete!');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Analysis failed.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const score = result?.atsScore || 0;
  const scoreColors = score >= 75 ? 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20' : score >= 50 ? 'from-amber-500/10 to-orange-500/5 border-amber-500/20' : 'from-red-500/10 to-rose-500/5 border-red-500/20';
  const scoreLabel = score >= 75 ? 'Match Confirmed' : score >= 50 ? 'Partial Match' : 'Optimization Required';
  const scoreLabelColor = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';

  return (
    <Layout pageTitle="Resume AI">
      <div className="space-y-8 pb-12 animate-fade-in text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/5">
              <FileSearch size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">ATS <span className="gradient-text">Optimizer</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Global Standard AI Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="glass-card px-4 py-2 border-white/5 flex items-center gap-2 bg-white/5">
                <Sparkles size={16} className="text-violet-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Powered by Groq Llama 3</span>
             </div>
          </div>
        </div>

        {/* Input & Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 border-white/5 bg-white/5 relative overflow-hidden">
               {/* Accent decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="space-y-6">
                {/* Target Role */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Target Job Role</label>
                  <div className="relative group">
                    <input
                      className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all text-sm font-bold text-white placeholder:text-slate-600 group-hover:border-white/20"
                      placeholder="e.g. Senior Frontend Developer, Marketing Lead"
                      value={jobRole}
                      onChange={e => setJobRole(e.target.value)}
                    />
                    <Zap size={18} className="absolute right-5 top-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-2 bg-[#0a0a14] p-1 rounded-2xl w-fit border border-white/5">
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === 'pdf' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <CloudUpload size={16} />
                    PDF Upload
                  </button>
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === 'text' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <ClipboardList size={16} />
                    Raw Text
                  </button>
                </div>

                {/* PDF Drop Zone */}
                <AnimatePresence mode="wait">
                  {activeTab === 'pdf' ? (
                    <motion.div 
                      key="pdf" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                    >
                      <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
                      {!pdfFile ? (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`cursor-pointer border-2 border-dashed rounded-3xl p-12 flex flex-col items-center gap-5 transition-all duration-300 group ${
                            isDragging ? 'border-violet-400 bg-violet-500/10 h-full' : 'border-white/10 bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all ${
                            isDragging ? 'bg-violet-500/20 scale-110' : 'bg-white/5 group-hover:bg-violet-500/10'
                          }`}>
                            <CloudUpload size={36} className={isDragging ? 'text-violet-400' : 'text-slate-600 group-hover:text-violet-400'} />
                          </div>
                          <div className="text-center">
                            <h3 className="font-black text-white text-lg tracking-tight">
                              {isDragging ? 'Drop it like it\'s hot' : 'Secure Upload Portal'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Drag & Drop your resume or <span className="text-violet-400 font-black cursor-pointer underline-offset-4 hover:underline">browse locally</span>. Only PDF supported.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-violet-500/5 border border-violet-500/20 rounded-3xl p-6 flex items-center gap-5 group relative animate-slide-up">
                          <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 shadow-xl group-hover:rotate-6 transition-transform">
                            <FileText size={28} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-black text-white truncate">{pdfFile.name}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · READY FOR ANALYSIS</p>
                          </div>
                          <button onClick={() => setPdfFile(null)} className="p-3 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-slate-500 transition-all">
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="text" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="space-y-3"
                    >
                      <textarea
                        className="w-full px-6 py-5 rounded-3xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all text-sm font-medium text-white placeholder:text-slate-700 min-h-[300px] resize-none pr-12 custom-scrollbar"
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
                  className="btn-primary w-full py-4 text-lg font-black group overflow-hidden relative"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                         <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                         <span className="animate-pulse">DECODING RESUME...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                        {activeTab === 'pdf' ? <Upload size={22} className="group-hover:scale-110 transition-transform" /> : <ClipboardList size={22} className="group-hover:scale-110 transition-transform" />}
                        INITIALIZE SCAN
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 border-white/5 bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={18} />
                 </div>
                 <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">Strategy Guide</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Submit text-based PDFs only',
                  'Focus on quantifiable metrics',
                  'Include a clear skill section',
                  'Match keywords from job post',
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

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 bg-gradient-to-br from-violet-600/20 to-transparent border-violet-500/10">
               <Sparkles className="text-violet-400 mb-4" size={24} />
               <h4 className="font-black text-white mb-2">AI Precision Report</h4>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">Our proprietary algorithm cross-references your profile against thousands of high-converting benchmarks to deliver 98% accurate ATS scoring.</p>
            </motion.div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95 }}
               className="glass-card p-16 flex flex-col items-center justify-center text-center space-y-8 border-violet-500/20 min-h-[400px]"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
                <FileSearch className="absolute inset-0 m-auto text-violet-400 animate-pulse-glow" size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight">Running Advanced Scan</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Cross-referencing industry keywords and formatting standards for maximum ATS compatibility.</p>
              </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="space-y-8 animate-fade-in"
            >
              {/* Score Hero */}
              <div className={`glass-card p-10 border relative overflow-hidden bg-gradient-to-br ${scoreColors} shadow-2xl`}>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <ScoreRing score={score} />
                  <div className="text-center md:text-left flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <h3 className={`text-4xl font-black tracking-tighter ${scoreLabelColor}`}>{scoreLabel}</h3>
                        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current self-center md:self-auto opacity-70`}>
                            {score >= 75 ? 'Ready to Apply' : 'Optimization Guided'}
                        </div>
                    </div>
                    <p className="text-slate-300 font-medium text-lg leading-relaxed italic pr-6 group">
                      "{result.summary}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-8 border-white/5 bg-white/5 group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={24} strokeWidth={2.5} />
                       </div>
                       <h3 className="font-black text-white uppercase tracking-widest text-sm">Winning Assets</h3>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500">POINTS EARNED</span>
                  </div>
                  <ul className="space-y-4">
                    {(result.strengths || []).map((s, i) => (
                      <li key={i} className="text-slate-400 text-sm font-bold flex items-start gap-4">
                        <div className="w-5 h-5 flex-shrink-0 border border-emerald-500/20 rounded-lg flex items-center justify-center bg-emerald-500/5 mt-0.5">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                        </div>
                        <span className="group-hover:text-white transition-colors">{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Weaknesses */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-8 border-white/5 bg-white/5 group border-amber-500/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-110 transition-transform">
                          <AlertCircle size={24} strokeWidth={2.5} />
                       </div>
                       <h3 className="font-black text-white uppercase tracking-widest text-sm">Gap Analysis</h3>
                    </div>
                    <span className="text-[10px] font-black text-amber-500">ACTION REQUIRED</span>
                  </div>
                  <ul className="space-y-4">
                    {(result.weaknesses || []).map((w, i) => (
                      <li key={i} className="text-slate-400 text-sm font-bold flex items-start gap-4">
                        <div className="w-5 h-5 flex-shrink-0 border border-amber-500/20 rounded-lg flex items-center justify-center bg-amber-500/5 mt-0.5">
                            <Info size={12} className="text-amber-400" />
                        </div>
                        <span className="group-hover:text-white transition-colors">{w}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Keywords */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-8 border-white/5 bg-white/5 md:col-span-2 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-lg group-hover:scale-110 transition-transform">
                          <Sparkles size={24} strokeWidth={2.5} />
                       </div>
                       <h3 className="font-black text-white uppercase tracking-widest text-sm">Semantic Match Matrix</h3>
                    </div>
                    <span className="text-[10px] font-black text-slate-500">IDENTIFIED KEYWORDS</span>
                  </div>
                  <TagList items={result.keywordsFound} color="bg-blue-500/5 text-blue-400 group-hover:border-blue-500/30 transition-all font-black" />
                </motion.div>

                {/* Recommendations */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-8 border-white/5 bg-white/5 md:col-span-2 group border-violet-500/20">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 shadow-lg group-hover:scale-110 transition-transform">
                        <Lightbulb size={24} strokeWidth={2.5} />
                     </div>
                     <h3 className="font-black text-white uppercase tracking-widest text-sm">Roadmap to Success</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(result.recommendations || []).map((r, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group/item">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform">
                           <Info size={16} className="text-violet-400" />
                        </div>
                        <p className="text-slate-300 text-sm font-bold group-hover/item:text-white transition-colors">{r}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default ResumeAnalyzer;
