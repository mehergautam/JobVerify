import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, BrainCircuit, ScrollText, 
  DollarSign, ArrowRight, CheckCircle2, Shield,
  Zap, Users, Lock, ChevronRight, Search, Target,
  MessageSquare, LayoutGrid, Star, Mail, Linkedin,
  Github, FileEdit, Sparkles, FileCheck, PlayCircle
} from 'lucide-react';
import Layout from '../components/Layout';

const StatItem = ({ label, value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const end = parseFloat(value.replace(/,/g, '').replace(/[+%]/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);
      let start = 0;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = value.includes('%') ? `${Math.floor(count)}%` : 
                       value.includes('+') ? `${Math.floor(count).toLocaleString()}+` : 
                       value.includes('/') ? value : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="text-center group px-8">
      <p className="text-4xl font-['JetBrains_Mono'] font-bold bg-gradient-to-r from-[#2D4A3E] to-[#C9A84C] bg-clip-text text-transparent mb-2">
        {displayValue}
      </p>
      <p className="text-sm font-medium text-[#6B8A7A]">{label}</p>
    </div>
  );
};

const LandingPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden bg-[#F5F0E8]">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex items-center pt-20 px-6 bg-[#F5F0E8]">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(201,168,76,0.08),_transparent)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#FDF3DC] text-[#8B6820] text-xs font-semibold mb-8"
            >
              <Sparkles size={14} className="text-[#C9A84C]" />
              <span>India's Most Trusted AI Job Safety Platform</span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-[#1A2E25]">The Smartest Way to</span><br />
              <span className="bg-gradient-to-r from-[#2D4A3E] via-[#C9A84C] to-[#2D4A3E] bg-clip-text text-transparent">Job Hunt in India.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[#6B8A7A] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Detect fake jobs, verify offer letters, analyze resumes and ace interviews — 
              powered by AI, built for Indian job seekers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/signup" 
                className="group relative px-8 py-3.5 bg-[#C9A84C] text-white rounded-xl font-bold transition-all hover:bg-[#B8943D] hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                <span>Start for Free</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="px-8 py-3.5 bg-white border border-[#E8E0D0] text-[#2D4A3E] rounded-xl font-bold transition-all hover:bg-[#FAF7F2] flex items-center gap-2 shadow-sm">
                <PlayCircle size={18} />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="flex -space-x-3">
                {['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'].map((color, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#F5F0E8] overflow-hidden flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: color }}>
                    {['SK', 'MK', 'AS', 'RB', 'JD'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-[#6B8A7A]">
                Trusted by 10,000+ job seekers across India
              </p>
            </motion.div>

            {/* Floating Cards (Desktop only) */}
            <div className="hidden lg:block">
              {/* Left Card */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-8 top-1/3 bg-white border border-[#E8E0D0] rounded-2xl p-4 shadow-md w-56 text-left"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Fake Job Detected</span>
                </div>
                <p className="text-sm font-bold text-[#1A2E25] mb-1">TechScam Pvt Ltd</p>
                <div className="flex items-center gap-1.5 text-[10px] text-[#9AB5A8]">
                  <Shield size={10} /> Fraud Signals: 12
                </div>
              </motion.div>

              {/* Right Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-8 top-1/4 bg-white border border-[#E8E0D0] rounded-2xl p-5 shadow-md w-60 text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-[#4CAF7D] uppercase tracking-widest bg-[#EDFAF3] px-2 py-0.5 rounded border border-[#A8DFC4]">✓ Verified Safe</span>
                  <span className="font-['JetBrains_Mono'] text-[#4CAF7D] font-bold text-xl">94</span>
                </div>
                <div className="w-full h-1.5 bg-[#F0EBE0] rounded-full overflow-hidden mb-2">
                  <motion.div initial={{width:0}} animate={{width:'94%'}} transition={{duration:1, delay:1.5}} className="h-full bg-[#4CAF7D]" />
                </div>
                <p className="text-[10px] text-[#9AB5A8] font-medium uppercase tracking-wider">Company Trust Index</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- MARQUEE STRIP --- */}
        <div className="w-full bg-white border-y border-[#E8E0D0] py-5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-12 items-center px-6">
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Fake Job Detector ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Resume ATS Analyzer ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Interview Prep AI ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Salary Reality Check ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Offer Letter Verifier ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">Cover Letter Generator ✦</span>
                <span className="text-[#9AB5A8] text-sm font-bold tracking-[0.2em] uppercase">LinkedIn Profile Analyzer ✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- STATS SECTION --- */}
        <section className="bg-white py-24 border-b border-[#E8E0D0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E0D0]">
              <StatItem label="Scams Detected" value="10,847+" />
              <StatItem label="Resumes Analyzed" value="52,300+" />
              <StatItem label="AI Accuracy Rate" value="95%" />
              <StatItem label="Average Rating" value="4.9 / 5" />
            </div>
          </div>
        </section>

        {/* --- TOOLS SECTION --- */}
        <section id="tools" className="py-32 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Header */}
            <div className="mb-16">
              <span className="text-xs font-bold text-[#C9A84C] tracking-[0.2em] uppercase">What we offer</span>
              <h2 className="text-4xl md:text-[3.5rem] font-bold text-[#1A2E25] mt-4 mb-4">
                Every tool you need. <span className="text-[#C9A84C]">Nothing you don't.</span>
              </h2>
              <p className="text-[#6B8A7A] max-w-xl mx-auto text-lg">
                The most advanced career toolkit ever built for the Indian job market.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Card 1 - Job Detector */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#2D4A3E] mb-6 border border-[#C4D8D0]">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Fake Job Detector</h3>
                  <p className="text-[#6B8A7A] mb-8">Paste any job — AI analyzes 50+ signals to find scams including GST ID & glassdoor sentiment.</p>
                  
                  {/* Miniature UI */}
                  <div className="bg-[#FAF7F2] border border-[#E8E0D0] rounded-xl p-4 mb-6">
                    <p className="text-[10px] font-bold text-[#9AB5A8] uppercase tracking-widest mb-2">Analysis in progress...</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-2 bg-[#F0EBE0] rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#E09B3D]"
                          initial={{ width: 0 }}
                          whileInView={{ width: '87%' }}
                          transition={{ duration: 1.5 }}
                        />
                      </div>
                      <span className="font-['JetBrains_Mono'] text-[#E09B3D] text-sm font-bold">87%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#9AB5A8]">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> WhatsApp redirect detected
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#9AB5A8]">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Market salary match: High
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EDFAF3] text-[#4CAF7D] text-[10px] font-bold uppercase border border-[#A8DFC4]">Popular</span>
                </div>
              </motion.div>

              {/* Card 2 - Resume Analyzer */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EDFAF3] flex items-center justify-center text-[#4CAF7D] mb-6 border border-[#A8DFC4]">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Resume ATS</h3>
                <p className="text-[#6B8A7A] mb-8">Beat recruitment filters. Get an exact salary & skill match score.</p>
                <div className="flex flex-col items-center">
                   <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="56" cy="56" r="50" fill="none" className="stroke-[#F0EBE0]" strokeWidth="8" />
                        <motion.circle 
                          cx="56" cy="56" r="50" fill="none" stroke="currentColor" strokeWidth="8"
                          className="text-[#4CAF7D]"
                          strokeDasharray="314"
                          initial={{ strokeDashoffset: 314 }}
                          whileInView={{ strokeDashoffset: 314 * (1 - 0.84) }}
                          transition={{ duration: 1.5 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-['JetBrains_Mono'] text-2xl font-bold text-[#1A2E25]">84</span>
                   </div>
                   <p className="text-xs font-semibold text-[#6B8A7A]">Your resume beats 76% of applicants</p>
                </div>
              </motion.div>

              {/* Card 3 - Interview Prep */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FEF6E7] flex items-center justify-center text-[#E09B3D] mb-6 border border-[#F5D89A]">
                  <BrainCircuit size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Interview Prep AI</h3>
                <p className="text-[#6B8A7A] mb-6">Practice with AI that knows Indian company patterns.</p>
                <div className="space-y-3">
                  <div className="p-3 bg-[#FAF7F2] border border-[#E8E0D0] rounded-2xl rounded-bl-none text-[11px] text-[#6B8A7A]">
                     "Tell me about a challenging project at work?"
                  </div>
                  <div className="p-3 bg-[#FDF3DC] border border-[#F5E6C0] rounded-2xl rounded-br-none text-[11px] text-[#8B6820] text-right">
                     "I built a fraud detection system that..."
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Salary Checker */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EDFAF3] flex items-center justify-center text-[#4CAF7D] mb-6 border border-[#A8DFC4]">
                  <DollarSign size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Salary Checker</h3>
                <p className="text-[#6B8A7A] mb-6">Don't settle for less. Compare offers with 50,000+ data points.</p>
                <div className="mt-2">
                  <p className="text-[2.5rem] font-['JetBrains_Mono'] font-bold text-[#4CAF7D]">₹8.5 LPA</p>
                  <p className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest mt-1">Avg for React Dev, Pune</p>
                </div>
              </motion.div>

              {/* Card 5 - Offer Verifier */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#2D4A3E] mb-6 border border-[#C4D8D0]">
                  <FileCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Offer Verifier</h3>
                <p className="text-[#6B8A7A] mb-6">Ensure your career transition is safe and verified.</p>
                <div className="flex justify-center pt-2">
                  <div className="w-20 h-20 rounded-full bg-[#EDFAF3] border border-[#A8DFC4] flex items-center justify-center text-[#4CAF7D]">
                    <CheckCircle2 size={40} />
                  </div>
                </div>
              </motion.div>

              {/* Card 6 - Cover Letter NEW */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group relative">
                <div className="absolute top-4 right-4 bg-[#C9A84C] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-tighter">PREMIUM</div>
                <div className="w-12 h-12 rounded-xl bg-[#FDF3DC] flex items-center justify-center text-[#C9A84C] mb-6 border border-[#F5E6C0]">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">Cover Letter Generator</h3>
                <p className="text-[#6B8A7A] mb-4">AI writes letters tailored to your profile in 3 seconds.</p>
                <div className="space-y-2 opacity-60">
                  <div className="h-2 w-full bg-[#F0EBE0] rounded-full" />
                  <div className="h-2 w-3/4 bg-[#F0EBE0] rounded-full" />
                  <div className="h-2 w-5/6 bg-[#F0EBE0] rounded-full animate-pulse" />
                </div>
                <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest mt-6">Free for now • Usually ₹999</p>
              </motion.div>

              {/* Card 7 - LinkedIn Analyzer NEW */}
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group relative">
                 <div className="absolute top-4 right-4 bg-[#C9A84C] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-tighter">PREMIUM</div>
                 <div className="w-12 h-12 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#2D4A3E] mb-6 border border-[#C4D8D0]">
                  <Linkedin size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E25] mb-2">LinkedIn Analyzer</h3>
                <p className="text-[#6B8A7A] mb-4">Recruiter-perspective scoring for your profile visibility.</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FAF7F2] border border-[#E8E0D0] rounded-2xl flex flex-col items-center">
                    <span className="font-['JetBrains_Mono'] text-[#C9A84C] text-2xl font-bold">87</span>
                    <span className="text-[8px] text-[#9AB5A8] uppercase tracking-widest font-bold">Score</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-1.5 w-full bg-[#F0EBE0] rounded-full overflow-hidden">
                       <motion.div initial={{width:0}} whileInView={{width:'87%'}} className="h-full bg-[#C9A84C]" />
                    </div>
                    <div className="h-1.5 w-[65%] bg-[#F0EBE0] rounded-full overflow-hidden">
                       <motion.div initial={{width:0}} whileInView={{width:'45%'}} className="h-full bg-[#C9A84C]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS --- */}
        <section className="py-32 bg-white border-y border-[#E8E0D0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <span className="text-xs font-bold text-[#C9A84C] tracking-[0.2em] uppercase">Simple Logic</span>
              <h2 className="text-4xl md:text-[3.5rem] font-bold text-[#1A2E25] mt-4 mb-4">How it works.</h2>
              <p className="text-[#6B8A7A] text-lg">Your career safety in 3 steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
               {/* Dashing lines */}
               <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-[#E8E0D0]" />
               
               {[
                 { title: 'Paste & Submit', desc: 'Add job details, upload resume, or paste offer letter text.', icon: Target },
                 { title: 'AI Analyzes', desc: '50+ signals checked in under 3 seconds using Groq LLaMA models.', icon: Zap },
                 { title: 'Get Your Report', desc: 'Trust score, red flags, and exact action steps — actionable instantly.', icon: LayoutGrid }
               ].map((step, i) => (
                 <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                    <div className="relative mb-8">
                       <div className="absolute inset-0 bg-[#C9A84C]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="w-24 h-24 rounded-full bg-[#FAF7F2] border border-[#E8E0D0] flex items-center justify-center text-[#2D4A3E] relative z-10 group-hover:border-[#C9A84C] transition-colors">
                          <step.icon size={40} />
                       </div>
                       <span className="absolute -top-2 -right-2 text-[5rem] font-bold text-[#E8E0D0] leading-none select-none">0{i+1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A2E25] mb-4 transition-colors group-hover:text-[#C9A84C]">{step.title}</h3>
                    <p className="text-[#6B8A7A] leading-relaxed max-w-xs">{step.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="py-32 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-[#1A2E25] text-center mb-20">
              Loved by job seekers.<br /><span className="text-[#9AB5A8]">Across India.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { quote: "This saved me from a fake TCS impersonation job. The red flags were spot on!", name: "Priya S.", city: "Mumbai", role: "Software Engineer", char: "P" },
                 { quote: "Resume score jumped from 45 to 87. Got 3 interview calls the same week!", name: "Rahul K.", city: "Bangalore", role: "Data Analyst", char: "R" },
                 { quote: "Interview Prep AI asked the exact questions in my Infosys interview. Unreal.", name: "Ananya M.", city: "Pune", role: "CS Final Year", char: "A" }
               ].map((item, i) => (
                 <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-8 shadow-sm hover:border-[#C9A84C] hover:shadow-md transition-all">
                    <div className="flex gap-1 mb-6">
                       {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="text-[#C9A84C] fill-current" />)}
                    </div>
                    <p className="text-[#6B8A7A] italic leading-relaxed mb-8 text-lg">"{item.quote}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-[#E8E0D0]">
                       <div className="w-11 h-11 rounded-full bg-[#2D4A3E] flex items-center justify-center text-white font-bold text-sm">
                          {item.char}
                       </div>
                       <div>
                          <p className="text-[#1A2E25] font-bold">{item.name}</p>
                          <p className="text-[10px] font-bold text-[#9AB5A8] uppercase tracking-widest">{item.city} • {item.role}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="py-48 relative overflow-hidden bg-[#2D4A3E]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#C9A84C]/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
            <h2 className="text-4xl md:text-[4rem] font-bold leading-tight text-[#F5F0E8] mb-8">
              Ready to job hunt<br /><span className="text-[#C9A84C]">without fear?</span>
            </h2>
            <p className="text-xl text-[#9AB5A8] mb-12 max-w-2xl mx-auto">
              Join 10,000+ Indian job seekers. Free forever. No credit card required.
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C9A84C] text-white rounded-2xl font-bold text-xl transition-all hover:scale-[1.05] hover:bg-[#B8943D] hover:shadow-[0_0_60px_rgba(201,168,76,0.4)] active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-[#1A2E25] border-t border-[#2D4A3E] pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
               {/* Col 1 */}
               <div className="lg:col-span-4">
                  <Link to="/" className="flex items-center gap-2.5 mb-6 group">
                    <div className="text-[#C9A84C] group-hover:scale-110 transition-transform">
                      <Shield size={32} fill="currentColor" fillOpacity={0.15} />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-[#F5F0E8]">JobVerify</span>
                  </Link>
                  <p className="text-[#9AB5A8] font-medium leading-relaxed max-w-sm mb-8">
                    India's AI-powered job safety platform. We protect job seekers from scams and help you get career-ready with world-class toolsets.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-10 h-10 rounded-xl bg-[#2D4A3E] border border-[#3D5A4F] flex items-center justify-center text-[#9AB5A8] hover:text-[#F5F0E8] transition-colors"><Github size={20} /></a>
                     <a href="#" className="w-10 h-10 rounded-xl bg-[#2D4A3E] border border-[#3D5A4F] flex items-center justify-center text-[#9AB5A8] hover:text-[#F5F0E8] transition-colors"><Linkedin size={20} /></a>
                     <a href="#" className="w-10 h-10 rounded-xl bg-[#2D4A3E] border border-[#3D5A4F] flex items-center justify-center text-[#9AB5A8] hover:text-[#F5F0E8] transition-colors"><Mail size={20} /></a>
                  </div>
               </div>

               {/* Col 2 */}
               <div className="lg:col-span-2">
                  <h4 className="text-[#F5F0E8] font-bold text-sm mb-6 uppercase tracking-widest text-[11px]">Product</h4>
                  <ul className="space-y-4 text-sm text-[#9AB5A8] font-medium">
                     <li><a href="#tools" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                     <li><a href="/detect" className="hover:text-[#F5F0E8] transition-colors">Career Tools</a></li>
                     <li><a href="/pricing" className="hover:text-[#F5F0E8] transition-colors">Pricing</a></li>
                     <li><a href="/dashboard" className="hover:text-[#F5F0E8] transition-colors">Dashboard</a></li>
                  </ul>
               </div>

               {/* Col 3 */}
               <div className="lg:col-span-2">
                  <h4 className="text-[#F5F0E8] font-bold text-sm mb-6 uppercase tracking-widest text-[11px]">Company</h4>
                  <ul className="space-y-4 text-sm text-[#9AB5A8] font-medium">
                     <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                     <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">LinkedIn</a></li>
                     <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                     <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Legal</a></li>
                  </ul>
               </div>

               {/* Col 4 */}
               <div className="lg:col-span-4">
                  <h4 className="text-[#F5F0E8] font-bold text-sm mb-6 uppercase tracking-widest text-[11px]">Built for India</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-2xl bg-[#2D4A3E] border border-[#3D5A4F] flex flex-col items-center justify-center">
                        <span className="text-[#F5F0E8] font-black text-xl mb-1">FREE</span>
                        <span className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest">Pricing Model</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-[#2D4A3E] border border-[#3D5A4F] flex flex-col items-center justify-center">
                        <span className="text-[#C9A84C] font-black text-xl mb-1">GROQ</span>
                        <span className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest">AI Engine</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-12 border-t border-[#2D4A3E] flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[11px] font-bold text-[#6B8A7A] uppercase tracking-widest text-center md:text-left">
                © 2025 JobVerify. All rights reserved. Made by Meher Gautam in India with ❤️
              </p>
              <div className="flex gap-8 text-[11px] font-bold text-[#6B8A7A] uppercase tracking-widest">
                 <a href="#" className="hover:text-[#9AB5A8] transition-colors">Privacy</a>
                 <a href="#" className="hover:text-[#9AB5A8] transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default LandingPage;
