import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Chrome, Check, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (passwordStrength < 50) {
      return toast.error('Please use a stronger password');
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { email, password });
      login(data.token, data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColor = passwordStrength <= 25 ? 'bg-red-500' : passwordStrength <= 50 ? 'bg-amber-500' : passwordStrength <= 75 ? 'bg-blue-500' : 'bg-emerald-500';
  const strengthText = passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f0f1a]">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-violet-900/40 via-[#13132b] to-[#0f0f1a] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-600/10 blur-[120px] rounded-full animate-pulse-glow" />
        
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="bg-violet-600 p-1.5 rounded-lg text-white">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          <span className="font-black text-2xl tracking-tight text-white font-sans">JobVerify</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
          >
            Join <span className="gradient-text">10,000+</span> <br />
            protected job seekers <br />
            worldwide.
          </motion.h2>
          <div className="space-y-4">
            {[
              'AI Fake Job Detection',
              'ATS Resume Optimization',
              'Market Salary Insights',
              'Verified Offer Letters'
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-sm font-medium">
          Secure, Private, AI-Powered.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <div className="bg-violet-600 p-2 rounded-xl text-white">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
            <p className="text-slate-500">Get started with your free toolkit</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="float-label-group">
              <input 
                type="email" 
                id="email"
                placeholder=" "
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email Address</label>
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>

            <div className="float-label-group">
              <input 
                type="password" 
                id="password"
                placeholder=" "
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Security Strength</span>
                  <span className={`text-[10px] font-bold uppercase transition-colors ${passwordStrength <= 25 ? 'text-red-400' : 'text-emerald-400'}`}>{strengthText}</span>
                </div>
                <div className="flex gap-1">
                  {[25, 50, 75, 100].map((step) => (
                    <div 
                      key={step} 
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${passwordStrength >= step ? strengthColor : 'bg-white/5'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="float-label-group">
              <input 
                type="password" 
                id="confirmPassword"
                placeholder=" "
                required
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 text-lg font-bold group mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f0f1a] px-3 text-slate-500 font-bold tracking-widest">Or join with</span>
              </div>
            </div>

            <button 
              type="button"
              className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 font-bold group"
            >
              <Chrome className="text-white group-hover:scale-110 transition-transform" size={20} />
              Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-violet-400 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
