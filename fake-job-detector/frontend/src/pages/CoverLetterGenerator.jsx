import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Sparkles, Send, Copy, Download,
  RefreshCw, ChevronRight, Briefcase,
  Building2, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    skills: '',
    experience: 'Fresher',
    tone: 'Professional'
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setIsLoading(true);
    setGeneratedLetter('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/tools/cover-letter/generate`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGeneratedLetter(data.coverLetter);
      toast.success('Cover letter generated! ✨');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Copied to clipboard!');
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `CoverLetter_${formData.company || 'Job'}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Cover Letter</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
              <Sparkles size={22} className="text-[#C9A84C]" /> Cover Letter Generator
            </h1>
            <p className="text-[#6B8A7A] text-sm mt-1">AI writes personalized cover letters in 3 seconds</p>
          </div>
          <span className="badge-success self-start">FREE • Others charge ₹999/mo</span>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          {/* Input */}
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6"
          >
            <h3 className="text-sm font-semibold text-[#1A2E25] mb-5 flex items-center gap-2">
              <Briefcase size={16} className="text-[#C9A84C]" /> Job Details
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Job Title</label>
                  <div className="relative">
                    <input type="text" name="jobTitle" placeholder="Software Engineer" className="input-field pr-9" required value={formData.jobTitle} onChange={handleInputChange} />
                    <Send size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Company</label>
                  <div className="relative">
                    <input type="text" name="company" placeholder="Google, Tata, etc." className="input-field pr-9" required value={formData.company} onChange={handleInputChange} />
                    <Building2 size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Job Description</label>
                <textarea name="jobDescription" placeholder="Paste the job description..." className="input-field min-h-[130px] resize-none py-3" required value={formData.jobDescription} onChange={handleInputChange} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Your Key Skills</label>
                <input type="text" name="skills" placeholder="React, Node.js, Python, Leadership..." className="input-field" required value={formData.skills} onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Experience</label>
                  <select name="experience" className="input-field appearance-none" value={formData.experience} onChange={handleInputChange}>
                    <option>Fresher</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Tone</label>
                  <select name="tone" className="input-field appearance-none" value={formData.tone} onChange={handleInputChange}>
                    <option>Professional</option>
                    <option>Confident</option>
                    <option>Enthusiastic</option>
                    <option>Concise</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Writing your letter...</span></> : '✨ Generate Cover Letter'}
              </button>
            </form>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[#1A2E25] flex items-center gap-2">
                <MessageSquare size={16} className="text-[#C9A84C]" /> Your Cover Letter
              </h3>
              {generatedLetter && (
                <div className="flex items-center gap-1.5">
                  <button onClick={copyToClipboard} className="p-1.5 rounded-lg bg-[#F5F0E8] text-[#9AB5A8] hover:text-[#2D4A3E] transition-colors" title="Copy"><Copy size={15} /></button>
                  <button onClick={downloadTxt} className="p-1.5 rounded-lg bg-[#F5F0E8] text-[#9AB5A8] hover:text-[#2D4A3E] transition-colors" title="Download"><Download size={15} /></button>
                </div>
              )}
            </div>

            <div className="flex-1 min-h-[400px] bg-[#FAF7F2] border border-[#E8E0D0] rounded-xl p-5 relative">
              {!generatedLetter && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-14 h-14 rounded-full bg-[#F5F0E8] border-2 border-dashed border-[#E8E0D0] flex items-center justify-center text-[#C9A84C] mb-4">
                    <Sparkles size={26} />
                  </div>
                  <p className="text-[#9AB5A8] text-sm font-medium">Your cover letter will appear here</p>
                  <p className="text-xs text-[#C4B9A8] mt-1">Fill in the details on the left</p>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#FAF7F2]/90 z-10 rounded-xl">
                  <div className="w-10 h-10 border-3 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mb-3" style={{ borderWidth: 3 }} />
                  <p className="text-[#1A2E25] font-semibold text-sm">AI is writing your letter...</p>
                  <p className="text-xs text-[#9AB5A8] mt-1 animate-pulse">Personalizing for {formData.company}</p>
                </div>
              )}

              {generatedLetter && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full whitespace-pre-wrap text-[#3D5A4F] leading-relaxed text-sm overflow-y-auto"
                >
                  {generatedLetter}
                </motion.div>
              )}
            </div>

            {generatedLetter && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-[#9AB5A8]">~ {generatedLetter.split(' ').length} words</p>
                <button onClick={() => handleGenerate(null)} className="text-xs font-semibold text-[#9AB5A8] hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
