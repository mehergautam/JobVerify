import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit, Loader2, ChevronDown, Lightbulb,
  MessageSquare, Code2, Sparkles, Zap, Target, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EXPERIENCE_LEVELS = [
  'Fresher (0-1 yr)',
  'Junior (1-3 yrs)',
  'Mid-level (3-6 yrs)',
  'Senior (6-10 yrs)',
  'Lead/Principal (10+ yrs)'
];

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${open ? 'border-[#C9A84C] shadow-md' : 'border-[#E8E0D0] hover:border-[#D4C9B0]'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs transition-all ${open ? 'bg-[#C9A84C] text-white' : 'bg-[#F5F0E8] text-[#9AB5A8]'}`}>
            {index + 1}
          </div>
          <span className={`font-semibold text-sm transition-colors ${open ? 'text-[#1A2E25]' : 'text-[#3D5A4F]'}`}>{q.question}</span>
        </div>
        <div className={`p-1.5 rounded-lg bg-[#F5F0E8] transition-transform duration-300 ${open ? 'rotate-180 text-[#C9A84C]' : 'text-[#9AB5A8]'}`}>
          <ChevronDown size={15} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#F0EBE0]"
          >
            <div className="p-6 bg-[#FAF7F2]">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-9 h-9 rounded-xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-1">Expert Strategy</p>
                  <p className="text-sm text-[#6B8A7A] leading-relaxed italic">"{q.hint}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InterviewPrep() {
  const [role, setRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[2]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('technical');

  const handleGenerate = async () => {
    if (!role.trim()) return toast.error('Please enter the job role');
    setIsLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/tools/interview-prep`, { role, experienceLevel }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
      toast.success('Interview guide ready! 🧠');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate guide.');
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
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Interview Prep</span>
        </div>
        <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
          <BrainCircuit size={22} className="text-[#E09B3D]" /> Interview Co-Pilot
        </h1>
        <p className="text-[#6B8A7A] text-sm mt-1">AI-generated placement strategy • Seniority focused</p>
      </div>

      <div className="px-8 py-6 max-w-5xl">
        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-[#1A2E25] mb-4 text-sm uppercase tracking-wide">Configure Your Prep</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Target Position</label>
              <div className="relative">
                <input
                  className="input-field pl-10"
                  placeholder="e.g. Senior Frontend Developer"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                />
                <Zap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Your Seniority</label>
              <div className="relative">
                <select
                  className="input-field appearance-none cursor-pointer pr-9"
                  value={experienceLevel}
                  onChange={e => setExperienceLevel(e.target.value)}
                >
                  {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] pointer-events-none" />
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg text-base shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading
              ? <><Loader2 size={18} className="animate-spin" /><span>Generating Guide...</span></>
              : <><BrainCircuit size={18} /><span>Generate Interview Guide</span></>
            }
          </button>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Context */}
              <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF6E7] text-[#E09B3D] flex items-center justify-center">
                    <Target size={16} />
                  </div>
                  <span className="text-xs font-semibold text-[#9AB5A8] uppercase tracking-widest">Recruiter Perspective</span>
                </div>
                <p className="text-[#3D5A4F] leading-relaxed italic">"{result.roleContext}"</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 bg-[#FAF7F2] border border-[#E8E0D0] p-1 rounded-xl w-fit">
                {[
                  { key: 'technical', label: 'Technical', icon: Code2 },
                  { key: 'behavioral', label: 'Behavioral', icon: MessageSquare },
                  { key: 'tips', label: 'Expert Tips', icon: Lightbulb },
                ].map(t => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-[#C9A84C] text-white shadow' : 'text-[#9AB5A8] hover:text-[#6B8A7A]'}`}
                    >
                      <Icon size={13} />{t.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                {activeTab === 'technical' && (result.technicalQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                {activeTab === 'behavioral' && (result.behavioralQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                {activeTab === 'tips' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(result.generalTips || []).map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl border border-[#E8E0D0] p-5 hover:border-[#C9A84C] hover:shadow-md transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center mb-3">
                          <Lightbulb size={16} />
                        </div>
                        <p className="text-sm text-[#3D5A4F] leading-relaxed">"{tip}"</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {!result && !isLoading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-2xl p-16 flex flex-col items-center justify-center text-center hover:border-[#C9A84C] transition-colors group"
            >
              <div className="w-14 h-14 bg-[#FEF6E7] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BrainCircuit size={26} className="text-[#E09B3D]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A2E25] mb-1">Ready for Preparation</h3>
              <p className="text-[#9AB5A8] text-sm max-w-xs">Enter a role and seniority above to generate a personalized interview roadmap.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InterviewPrep;
