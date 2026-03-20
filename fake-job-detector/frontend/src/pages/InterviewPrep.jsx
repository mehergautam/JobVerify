import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BrainCircuit, Loader2, ChevronDown, ChevronUp, Lightbulb, MessageSquare, Code2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EXPERIENCE_LEVELS = ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Mid-level (3-6 yrs)', 'Senior (6-10 yrs)', 'Lead/Principal (10+ yrs)'];

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors text-left gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
          <span className="font-medium text-navy text-sm leading-snug">{q.question}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="p-4 bg-amber-50 border-t border-amber-100">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-700 leading-relaxed">{q.hint}</p>
          </div>
        </div>
      )}
    </div>
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
      const res = await axios.post(`${API_URL}/tools/interview-prep`, { role, experienceLevel });
      setResult(res.data);
      toast.success('Interview guide ready!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate interview guide.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Interview Prep">
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="glass-card p-6 border-l-4 border-purple-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <BrainCircuit size={22} className="text-purple-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">AI Interview Prep</h2>
              <p className="text-slate-500 text-sm mt-1">Get a personalized interview guide with technical & behavioral questions, hints, and expert tips.</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Job Role <span className="text-red-400">*</span></label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                placeholder="e.g. Frontend Developer, Data Scientist"
                value={role}
                onChange={e => setRole(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Experience Level</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm bg-white"
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
              >
                {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? <><Loader2 size={18} className="animate-spin" /> Generating...</> : <><BrainCircuit size={18} /> Generate Interview Guide</>}
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="glass-card p-12 flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="font-bold text-navy animate-pulse">Preparing your personalized interview guide...</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-5 animate-fade-in">
            {/* Context */}
            <div className="glass-card p-5 bg-purple-50/50 border border-purple-100">
              <p className="text-sm font-medium text-slate-700 leading-relaxed">{result.roleContext}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'technical', label: 'Technical Questions', icon: Code2 },
                { key: 'behavioral', label: 'Behavioral Questions', icon: MessageSquare },
                { key: 'tips', label: 'Expert Tips', icon: Lightbulb },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === t.key ? 'bg-purple-500 text-white' : 'bg-white text-slate-500 hover:text-purple-600 border border-slate-200'}`}
                  >
                    <Icon size={15} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'technical' && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-500">{result.technicalQuestions?.length || 0} questions</p>
                {(result.technicalQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
              </div>
            )}
            {activeTab === 'behavioral' && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-500">{result.behavioralQuestions?.length || 0} questions</p>
                {(result.behavioralQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
              </div>
            )}
            {activeTab === 'tips' && (
              <div className="glass-card p-6">
                <div className="space-y-4">
                  {(result.generalTips || []).map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default InterviewPrep;
