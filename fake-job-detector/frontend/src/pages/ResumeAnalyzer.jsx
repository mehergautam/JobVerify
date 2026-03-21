import React, { useState, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  FileText, Upload, Loader2, CheckCircle2, AlertCircle,
  Lightbulb, X, CloudUpload, ClipboardList,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─── Score Ring ─── */
function ScoreRing({ score }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="140" height="140" className="rotate-[-90deg]">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
      <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
}

/* ─── Tag chips ─── */
function TagList({ items, color }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(items || []).map((item, i) => (
        <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{item}</span>
      ))}
    </div>
  );
}

/* ─── Main component ─── */
function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'text'
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  /* ── drag-and-drop handlers ── */
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
    // Reset the input so same file can be re-selected
    e.target.value = '';
  };

  /* ── submit ── */
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
        toast.error(err.response?.data?.error || 'PDF analysis failed. Please try again.');
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
        toast.error(err.response?.data?.error || 'Analysis failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const score = result?.atsScore || 0;
  const scoreBg = score >= 75 ? 'from-emerald-50 to-teal-50' : score >= 50 ? 'from-amber-50 to-yellow-50' : 'from-red-50 to-rose-50';
  const scoreLabel = score >= 75 ? 'Excellent' : score >= 50 ? 'Needs Work' : 'Low Match';
  const scoreLabelColor = score >= 75 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500';

  return (
    <Layout pageTitle="Resume Analyzer">
      <div className="space-y-6 pb-10">

        {/* Header */}
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">ATS Resume Analyzer</h2>
              <p className="text-slate-500 text-sm mt-1">
                Upload your PDF or paste resume text — get instant ATS score, keyword gaps, and tailored recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6 space-y-4">

            {/* Job Role */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Job Role (Optional)</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="e.g. Software Engineer, Product Manager"
                value={jobRole}
                onChange={e => setJobRole(e.target.value)}
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'pdf'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <CloudUpload size={15} />
                Upload PDF
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'text'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ClipboardList size={15} />
                Paste Text
              </button>
            </div>

            {/* PDF Drop Zone */}
            {activeTab === 'pdf' && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                {!pdfFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-all duration-200 ${
                      isDragging
                        ? 'border-blue-400 bg-blue-50 scale-[1.01]'
                        : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                      isDragging ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      <CloudUpload size={30} className={isDragging ? 'text-blue-500' : 'text-slate-400'} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-navy text-sm">
                        {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">or <span className="text-blue-500 font-semibold">click to browse</span> · PDF only · Max 10 MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="border border-blue-200 bg-blue-50 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} className="text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy truncate">{pdfFile.name}</p>
                      <p className="text-xs text-slate-400">{(pdfFile.size / 1024).toFixed(1)} KB · PDF</p>
                    </div>
                    <button
                      onClick={() => setPdfFile(null)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Text Paste */}
            {activeTab === 'text' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Resume Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
                  placeholder="Paste your resume content here..."
                  rows={12}
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                />
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading
                ? <><Loader2 size={18} className="animate-spin" /> {activeTab === 'pdf' ? 'Parsing PDF & Analyzing...' : 'Analyzing...'}</>
                : <><Upload size={18} /> Analyze Resume</>
              }
            </button>
          </div>

          {/* Sidebar tips */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                {[
                  'Use a text-based PDF (not a scanned image)',
                  'Include all sections: Summary, Skills, Experience, Education',
                  'Use industry-specific keywords',
                  'Quantify achievements with numbers',
                  'Specify the target job role for tailored analysis',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </div>
            {!result && !isLoading && (
              <div className="glass-card p-5 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-blue-400" />
                  <span className="font-bold text-sm text-navy">What You'll Get</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-500">
                  {['ATS compatibility score (0–100)', 'Key strengths & weaknesses', 'Missing keywords', 'Actionable recommendations'].map((t, i) => <li key={i}>• {t}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="glass-card p-12 flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="font-bold text-navy animate-pulse">
              {activeTab === 'pdf' ? 'Extracting text from PDF & analyzing with AI…' : 'Reading your resume with AI…'}
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-5 animate-fade-in">

            {/* Extracted text preview (PDF only) */}
            {result.extractedTextPreview && (
              <div className="glass-card p-4 border border-blue-100 bg-blue-50/40">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">📄 Text extracted from PDF (preview)</p>
                <p className="text-xs text-slate-500 font-mono leading-relaxed line-clamp-4">{result.extractedTextPreview}…</p>
              </div>
            )}

            {/* Score hero */}
            <div className={`glass-card p-6 bg-gradient-to-br ${scoreBg}`}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative flex items-center justify-center">
                  <ScoreRing score={score} />
                  <div className="absolute text-center pointer-events-none">
                    <p className="text-4xl font-black text-navy">{score}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATS Score</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className={`text-3xl font-black ${scoreLabelColor}`}>{scoreLabel}</p>
                  <p className="text-slate-600 text-sm mt-2 max-w-md">{result.summary}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Strengths */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h3 className="font-bold text-navy">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {(result.strengths || []).map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-amber-500" />
                  <h3 className="font-bold text-navy">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {(result.weaknesses || []).map((w, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">!</span>{w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords */}
              <div className="glass-card p-5">
                <h3 className="font-bold text-navy mb-3">Keywords Found</h3>
                <TagList items={result.keywordsFound} color="bg-blue-50 text-blue-600" />
              </div>

              {/* Recommendations */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-yellow-500" />
                  <h3 className="font-bold text-navy">Recommendations</h3>
                </div>
                <ul className="space-y-2">
                  {(result.recommendations || []).map((r, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-yellow-500">💡</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ResumeAnalyzer;
