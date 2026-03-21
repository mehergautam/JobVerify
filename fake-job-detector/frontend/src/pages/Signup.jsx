import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      // Logic same as existing, but including fullName (even if backend ignores it for now)
      const { data } = await axios.post(`${API_URL}/auth/register`, { email, password, name: fullName });
      login(data.token, data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColor = passwordStrength <= 25 ? 'bg-red-500' : passwordStrength <= 50 ? 'bg-orange-500' : passwordStrength <= 75 ? 'bg-[#6366f1]' : 'bg-[#22d3a5]';
  const strengthText = passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong';

  return (
    <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Hero Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(99,102,241,0.15),_transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#131316] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_24px_48px_rgba(0,0,0,0.4)] relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] mb-6 border border-[#6366f1]/20">
              <Shield size={32} fill="currentColor" fillOpacity={0.15} />
            </div>
            <h2 className="text-3xl font-['Cabinet_Grotesk'] font-extrabold text-[#f2f2f5] mb-2 text-center">Create account</h2>
            <p className="text-[#8b8b99] font-medium text-center">Free forever. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Arjun Kumar" 
                  className="input-field pr-12"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f]" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="input-field pr-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f]" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="input-field pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] hover:text-[#8b8b99] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="px-1 pt-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">Strength</span>
                    <span className={`text-[10px] font-bold uppercase ${passwordStrength <= 25 ? 'text-red-500' : 'text-[#22d3a5]'}`}>{strengthText}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[25, 50, 75, 100].map(s => <div key={s} className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= s ? strengthColor : 'bg-white/5'}`} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Confirm Password</label>
              <div className="relative group">
                <input 
                  type="password"
                  placeholder="••••••••" 
                  className="input-field pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f]" size={18} />
              </div>
            </div>

            <p className="text-[10px] font-bold text-[#55555f] leading-relaxed px-1">
              By continuing you agree to our <a href="#" className="underline">Terms</a> & <a href="#" className="underline">Privacy Policy</a>
            </p>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-4 rounded-xl shadow-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight size={20} /></>
              )}
            </button>

            <p className="text-center text-sm font-medium text-[#8b8b99]">
              Already have an account? <Link to="/login" className="text-[#6366f1] font-bold hover:underline ml-1">Login</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
