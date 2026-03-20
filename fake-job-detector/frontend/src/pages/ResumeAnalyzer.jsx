import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FileText, Upload, Loader2, CheckCircle2, AlertCircle, Lightbulb, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreRing({ score }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute text-center" style={{ marginTop: '-100px' }}>
        <p className="text-4xl font-black text-navy">{score}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ATS Score</p>
      </div>
    </div>
  );
}

function TagList({ items, color }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(items || []).map((item, i) => (
        <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{item}</span>
      ))}
    </div>
  );
}

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return toast.error('Please paste your resume text');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/tools/resume-analyze`, { resumeText, jobRole });
      setResult(res.data);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const score = result?.atsScore || 0;
  const scoreBg = score >= 75 ? 'from-emerald/10 to-teal-50' : score >= 50 ? 'from-amber-50 to-yellow-50' : 'from-red-50 to-rose-50';
  const scoreLabel = score >= 75 ? 'Excellent' : score >= 50 ? 'Needs Work' : 'Low Match';
  const scoreLabelColor = score >= 75 ? 'text-emerald' : score >= 50 ? 'text-amber-500' : 'text-red-500';

  return (
    <Layout pageTitle="Resume Analyzer">
      <div className="space-y-6 pb-10">
        {/* Header card */}
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">ATS Resume Analyzer</h2>
              <p className="text-slate-500 text-sm mt-1">Paste your resume and get instant ATS score, keyword gaps, and tailored recommendations.</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Job Role (Optional)</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="e.g. Software Engineer, Product Manager"
                value={jobRole}
                onChange={e => setJobRole(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Resume Text <span className="text-red-400">*</span></label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
                placeholder="Paste your resume content here..."
                rows={14}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : <><Upload size={18} /> Analyze Resume</>}
            </button>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                {['Include all sections: Summary, Skills, Experience, Education', 'Use industry-specific keywords', 'Quantify achievements with numbers', 'Specify the target job role for tailored analysis'].map((t, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald mt-0.5 flex-shrink-0" />{t}</li>
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
                  {['ATS compatibility score (0-100)', 'Key strengths & weaknesses', 'Missing keywords', 'Actionable recommendations'].map((t, i) => <li key={i}>• {t}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {isLoading && (
          <div className="glass-card p-12 flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="font-bold text-navy animate-pulse">Reading your resume with AI...</p>
          </div>
        )}

        {result && (
          <div className="space-y-5 animate-fade-in">
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
                  <CheckCircle2 size={18} className="text-emerald" />
                  <h3 className="font-bold text-navy">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {(result.strengths || []).map((s, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-emerald font-bold mt-0.5">✓</span>{s}</li>)}
                </ul>
              </div>
              {/* Weaknesses */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-amber-500" />
                  <h3 className="font-bold text-navy">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {(result.weaknesses || []).map((w, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-amber-500 font-bold mt-0.5">!</span>{w}</li>)}
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
                  {(result.recommendations || []).map((r, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-yellow-500">💡</span>{r}</li>)}
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
