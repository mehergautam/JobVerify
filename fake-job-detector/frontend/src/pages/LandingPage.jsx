import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, BrainCircuit, ScrollText, 
  DollarSign, ArrowRight, CheckCircle2, Star, Users, Shield
} from 'lucide-react';

const LandingPage = () => {
  const tools = [
    { name: 'Fake Job Detector', icon: ShieldCheck, desc: 'AI-powered detection of fraudulent job postings.', color: 'from-violet-500 to-purple-600' },
    { name: 'Resume Analyzer', icon: FileText, desc: 'Optimize your resume for ATS systems instantly.', color: 'from-blue-500 to-indigo-600' },
    { name: 'Interview Prep', icon: BrainCircuit, desc: 'Practice with AI-generated mock interviews.', color: 'from-purple-500 to-pink-500' },
    { name: 'Offer Verifier', icon: ScrollText, desc: 'Verify the authenticity of your job offers.', color: 'from-amber-400 to-orange-500' },
    { name: 'Salary Checker', icon: DollarSign, desc: 'Compare your offer with real market rates.', color: 'from-teal-400 to-cyan-600' },
    { name: 'Career Roadmap', icon: Star, desc: 'Generate your personalized career path with AI.', color: 'from-indigo-400 to-violet-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen hero-bg overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-overlay border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <span className="font-black text-2xl tracking-tight text-white">JobVerify</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">Login</Link>
            <Link to="/signup" className="btn-primary py-2 px-5 text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle bg-violet-500/20"
              style={{
                width: Math.random() * 8 + i % 2 + 'px',
                height: Math.random() * 8 + i % 2 + 'px',
                left: Math.random() * 100 + '%',
                animationDuration: Math.random() * 10 + 10 + 's',
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-8"
          >
            <Shield size={16} />
            AI-Powered Career Protection
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Detect <span className="gradient-text">Fake Jobs</span> & Get <br />
            Career Ready with AI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Your ultimate job-seeking companion. Verify offers, optimize resumes, 
            and dodge scams with the power of world-class AI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="btn-primary text-lg px-10 py-4 group">
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-10 py-4">
              Access Dashboard
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex items-center justify-center gap-3 text-slate-500 font-medium"
          >
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f0f1a] bg-slate-800 flex items-center justify-center overflow-hidden">
                  <span className="text-[10px] text-white">U{i}</span>
                </div>
              ))}
            </div>
            <span>10,000+ job seekers protected</span>
          </motion.div>
        </div>

        {/* Floating Job Cards Demo */}
        <div className="max-w-7xl mx-auto mt-20 relative hidden lg:block">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 glass-card p-4 w-60 animate-float"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">G</div>
              <div>
                <p className="text-white font-bold text-sm">Google Inc.</p>
                <p className="text-slate-500 text-xs">Software Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 size={14} /> Legitimate Offer
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-20 -right-10 glass-card p-4 w-60 animate-float-delayed"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-400">S</div>
              <div>
                <p className="text-white font-bold text-sm">Unknown Startup</p>
                <p className="text-slate-500 text-xs">Remote Assistant</p>
              </div>
            </div>
            <div className="text-red-400 text-xs font-bold flex items-center gap-2">
              Suspicious Activity Detected
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic">The <span className="gradient-text">Complete Toolkit</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to secure your dream job and avoid scammers in one place.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="glass-card p-8 group hover:border-violet-500/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <tool.icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{tool.desc}</p>
                
                <div className="flex items-center text-violet-400 font-semibold group-hover:gap-2 transition-all">
                  Try it now <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16">How it Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-teal-500/50 -translate-y-1/2" />
            
            {[
              { step: '01', title: 'Paste/Upload Link', desc: 'Input job links, resumes, or offer letters into our AI engine.', icon: Users },
              { step: '02', title: 'AI Analysis', desc: 'Our advanced models scan for red flags and compare market data.', icon: BrainCircuit },
              { step: '03', title: 'Get Insights', desc: 'Receive instant reports, ATS scores, and verification status.', icon: ShieldCheck }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 p-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#13132b] border-2 border-violet-500/30 flex items-center justify-center text-violet-400 font-black text-xl mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 to-teal-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to secure your career?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of protected job seekers and get the toolkit you deserve.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-lg px-12 py-4">Sign Up Now</Link>
              <Link to="/login" className="btn-secondary text-lg px-12 py-4">Login to Account</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-1 rounded-lg text-white">
              <ShieldCheck size={18} />
            </div>
            <span className="font-bold text-lg text-white">JobVerify</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 JobVerify AI. All rights reserved. Built for security.
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-violet-400">Privacy</a>
            <a href="#" className="hover:text-violet-400">Terms</a>
            <a href="#" className="hover:text-violet-400">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
