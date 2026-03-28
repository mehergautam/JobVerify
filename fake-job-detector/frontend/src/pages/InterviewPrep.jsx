import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit, Loader2, ChevronDown, Lightbulb,
  MessageSquare, Code2, Sparkles, Zap, Target, ChevronRight, ArrowRight
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

function QuestionCard({ q, index, type }) {
  const [open, setOpen] = useState(false);
  const difficulty = index % 3 === 0 ? 'Easy' : index % 3 === 1 ? 'Medium' : 'Hard';
  const diffColor = difficulty === 'Easy' ? 'bg-[#EDFAF3] text-[#4CAF7D] border-[#A8DFC4]' : 
                     difficulty === 'Medium' ? 'bg-[#FEF6E7] text-[#E09B3D] border-[#F5D89A]' : 
                     'bg-[#FDEFEF] text-[#E05C5C] border-[#F5BABA]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${open ? 'border-[#C9A84C] shadow-md' : 'border-[#E8E0D0] hover:border-[#D4C9B0] shadow-sm'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm transition-all shadow-sm ${open ? 'bg-[#C9A84C] text-white' : 'bg-[#FAF7F2] text-[#9AB5A8] border border-[#E8E0D0]'}`}>
            {index + 1}
          </div>
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${diffColor}`}>
                {difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#F0F5F3] text-[#2D4A3E] border border-[#C4D8D0]">
                {type}
              </span>
            </div>
            <span className={`font-bold text-sm leading-snug block transition-colors ${open ? 'text-[#1A2E25]' : 'text-[#3D5A4F]'}`}>{q.question}</span>
          </div>
        </div>
        <div className={`p-2 rounded-xl transition-all duration-300 ${open ? 'rotate-180 bg-[#C9A84C] text-white shadow-sm' : 'bg-[#FAF7F2] text-[#9AB5A8] border border-[#E8E0D0]'}`}>
          <ChevronDown size={16} />
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
                <div className="mt-0.5 w-10 h-10 rounded-2xl bg-[#FDF3DC] text-[#C9A84C] flex items-center justify-center flex-shrink-0 border border-[#F5D89A] shadow-sm">
                  <Lightbulb size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-extrabold text-[#C9A84C] uppercase tracking-[0.2em]">Sample Answer & Strategy</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#9AB5A8] font-bold uppercase">
                       <Zap size={10} className="text-[#C9A84C]" /> AI Verified
                    </div>
                  </div>
                  <p className="text-sm text-[#3D5A4F] leading-relaxed font-medium bg-white p-4 rounded-xl border border-[#F0EBE0] shadow-sm">
                    {q.hint}
                  </p>
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
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerate = async () => {
    if (!role.trim()) return toast.error('Please enter the job role');
    setIsLoading(true);
    setResult(null);
    setPracticeMode(false);
    setCurrentIndex(0);
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

  const fillDemo = () => {
    setRole('Senior React Developer');
    setExperienceLevel(EXPERIENCE_LEVELS[3]);
  };

  const currentQuestions = activeTab === 'technical' ? (result?.technicalQuestions || []) : 
                           activeTab === 'behavioral' ? (result?.behavioralQuestions || []) : [];

  return (
    <div className="animate-fade-in pb-12 text-[#3D5A4F]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Interview Prep</span>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
                    <BrainCircuit size={22} className="text-[#E09B3D]" /> Interview Co-Pilot
                </h1>
                <p className="text-[#6B8A7A] text-sm mt-1">AI-generated placement strategy • Seniority focused</p>
            </div>
            {result && !practiceMode && (
                <button 
                  onClick={() => setPracticeMode(true)}
                  className="hidden sm:flex items-center gap-2 bg-[#2D4A3E] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#1A2E25] transition-all"
                >
                    <Zap size={14} className="text-[#C9A84C]" /> Enable Practice Mode
                </button>
            )}
        </div>
      </div>

      <div className="px-8 py-6 max-w-5xl">
        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E09B3D]/5 rounded-bl-full pointer-events-none" />
          <h2 className="font-semibold text-[#1A2E25] mb-4 text-xs uppercase tracking-[0.2em]">Configure Your Prep Session</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Target Position</label>
              <div className="relative group">
                <input
                  className="input-field pl-10"
                  placeholder="e.g. Senior Frontend Developer"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                />
                <Zap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] group-focus-within:text-[#C9A84C] transition-colors" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Your Seniority</label>
              <div className="relative group">
                <select
                  className="input-field appearance-none cursor-pointer pr-9"
                  value={experienceLevel}
                  onChange={e => setExperienceLevel(e.target.value)}
                >
                  {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] pointer-events-none group-hover:text-[#C9A84C] transition-colors" />
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-[#C9A84C] text-white font-bold py-4 rounded-xl shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {isLoading
              ? <><Loader2 size={18} className="animate-spin" /><span>Generating Questions from Top Companies...</span></>
              : <><BrainCircuit size={20} /><span>Generate Personalized Roadmap ✨</span></>
            }
          </button>
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
                    <div className="w-16 h-16 rounded-full border-4 border-[#0D1813] border-t-[#C9A84C] animate-spin" />
                    <BrainCircuit className="absolute inset-0 m-auto text-[#C9A84C]" size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-[#F5F0E8]">AI Synthesis in Progress</h3>
                   <p className="text-[#9AB5A8] text-sm mt-2 max-w-sm">Generating questions curated for <strong className="text-[#C9A84C]">{role}</strong> with <strong className="text-[#C9A84C]">{experienceLevel}</strong> experience.</p>
                </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Context */}
              <div className="bg-[#0D1813] rounded-2xl border border-[#2D4A3E] shadow-xl p-6 border-l-4 border-l-[#C9A84C]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#1A2E25] text-[#C9A84C] flex items-center justify-center shadow-inner border border-[#3D5A4F]">
                    <Target size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#F5F0E8] uppercase tracking-widest">The Recruiter's Perspective</h3>
                    <p className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest mt-0.5">Role Impact & Expectations</p>
                  </div>
                </div>
                <p className="text-[#9AB5A8] leading-relaxed italic text-sm font-medium bg-[#1A2E25]/60 p-5 rounded-xl border border-[#2D4A3E]">
                   "{result.roleContext}"
                </p>
              </div>

              {/* Tabs & View Modes */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-2 bg-[#0D1813] border border-[#2D4A3E] p-1 rounded-xl w-fit shadow-inner">
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
                          onClick={() => { setActiveTab(t.key); setCurrentIndex(0); }}
                          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-[#C9A84C] text-[#0D1813] shadow-[0_0_15px_rgba(201,168,76,0.5)]' : 'text-[#6B8A7A] hover:text-[#9AB5A8]'}`}
                        >
                          <Icon size={14} />{t.label}
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => { setPracticeMode(!practiceMode); setCurrentIndex(0); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${practiceMode ? 'bg-[#C9A84C] text-[#0D1813] border-transparent shadow-[0_0_15px_rgba(201,168,76,0.4)]' : 'bg-[#1A2E25] text-[#9AB5A8] border-[#3D5A4F] hover:border-[#C9A84C] hover:text-[#C9A84C]'}`}
                  >
                    <Zap size={14} className={practiceMode ? 'text-[#0D1813]' : 'text-[#C9A84C]'} /> {practiceMode ? 'Exit Practice' : 'Start Practice Mode'}
                  </button>
              </div>

              {/* Question Area */}
              <div className="space-y-4">
                {activeTab !== 'tips' ? (
                   practiceMode ? (
                      <motion.div 
                        key={`${activeTab}-practice-${currentIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#1A2E25] rounded-3xl border border-[#2D4A3E] shadow-2xl p-8 sm:p-12 relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-bl-[100px] pointer-events-none" />
                         <div className="absolute top-0 left-0 p-6 z-10">
                            <span className="text-xs font-bold text-[#6B8A7A] uppercase tracking-widest">
                               Question {currentIndex + 1} of {currentQuestions.length}
                            </span>
                         </div>
                         
                         <div className="max-w-2xl mx-auto space-y-8 relative z-10 mt-6">
                            <div className="space-y-4">
                               <div className="flex items-center gap-3">
                                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#0D1813] text-[#C9A84C] border border-[#3D5A4F]">
                                     {activeTab} Round
                                  </span>
                                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#0D1813] text-[#6B8A7A] border border-[#2D4A3E]">
                                     Difficulty: {currentIndex % 3 === 0 ? 'Easy' : currentIndex % 3 === 1 ? 'Medium' : 'Hard'}
                                  </span>
                               </div>
                               <h2 className="text-2xl font-bold text-[#F5F0E8] leading-tight drop-shadow-md">
                                  {currentQuestions[currentIndex]?.question}
                               </h2>
                            </div>

                            <div className="bg-[#0D1813]/80 p-6 rounded-2xl border border-[#3D5A4F] shadow-inner backdrop-blur-sm">
                               <div className="flex items-center gap-3 mb-3">
                                  <Lightbulb size={18} className="text-[#C9A84C]" />
                                  <h4 className="text-xs font-extrabold text-[#9AB5A8] uppercase tracking-widest">Solution Framework</h4>
                               </div>
                               <p className="text-[#F5F0E8] text-sm leading-relaxed font-medium italic opacity-90">
                                  "{currentQuestions[currentIndex]?.hint}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                               <button 
                                 disabled={currentIndex === 0}
                                 onClick={() => setCurrentIndex(prev => prev - 1)}
                                 className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest border border-[#E8E0D0] text-[#9AB5A8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-30"
                               >
                                  Previous
                               </button>
                               <button 
                                 onClick={() => {
                                    if (currentIndex < currentQuestions.length - 1) {
                                       setCurrentIndex(prev => prev + 1);
                                    } else {
                                       toast.success("Practice session complete! ✨");
                                       setPracticeMode(false);
                                    }
                                 }}
                                 className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-[#C9A84C] text-white shadow-gold hover:bg-[#B8943D] transition-all"
                               >
                                  {currentIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Session'}
                               </button>
                            </div>
                         </div>
                      </motion.div>
                   ) : (
                      currentQuestions.map((q, i) => <QuestionCard key={i} q={q} index={i} type={activeTab} />)
                   )
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(result.generalTips || []).map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-[#1A2E25] rounded-2xl border border-[#2D4A3E] p-6 hover:border-[#6B4B22] shadow-xl transition-all group"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-[#0D1813] text-[#C9A84C] flex items-center justify-center mb-4 border border-[#3D5A4F] group-hover:scale-110 transition-transform shadow-inner">
                          <Sparkles size={18} />
                        </div>
                        <p className="text-sm text-[#9AB5A8] leading-relaxed font-semibold group-hover:text-[#F5F0E8] transition-colors">"{tip}"</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {!result && !isLoading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-[#E8E0D0] rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:border-[#C9A84C] transition-colors group"
            >
              <div className="w-16 h-16 bg-[#FEF6E7] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#F5D89A]">
                <BrainCircuit size={28} className="text-[#E09B3D]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2E25] mb-2">Ready for Preparation</h3>
              <p className="text-[#9AB5A8] text-sm max-w-sm mb-8">Enter your target role and seniority above to generate a high-impact interview roadmap.</p>
              <button 
                onClick={fillDemo}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl border-2 border-[#E09B3D] text-[#E09B3D] font-bold text-sm hover:bg-[#E09B3D] hover:text-white transition-all group/btn"
              >
                Try an example <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InterviewPrep;
