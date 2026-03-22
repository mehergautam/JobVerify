import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    if (passwordStrength < 2) return toast.error('Please use a stronger password');
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { email, password, name: fullName });
      login(data.token, data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-[#E05C5C]', 'bg-[#E09B3D]', 'bg-[#C9A84C]', 'bg-[#4CAF7D]'];
  const strengthTextColors = ['text-[#E05C5C]', 'text-[#E09B3D]', 'text-[#C9A84C]', 'text-[#4CAF7D]'];

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-lg p-8">
          {/* Top */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F0F5F3] rounded-2xl mb-4">
              <Shield size={32} className="text-[#2D4A3E]" fill="currentColor" fillOpacity={0.1} />
            </div>
            <h1 className="text-2xl font-bold text-[#1A2E25]">Create your account</h1>
            <p className="text-[#6B8A7A] text-sm mt-1">Free forever. No credit card. No spam.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#FDEFEF] border border-[#F5BABA] text-[#C04040] rounded-xl p-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Arjun Kumar"
                  className="input-field pr-11"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="input-field pr-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] hover:text-[#6B8A7A] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength bars */}
              {password.length > 0 && (
                <div className="pt-1">
                  <div className="flex gap-1.5 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= i ? strengthColors[passwordStrength - 1] : 'bg-[#E8E0D0]'}`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${strengthTextColors[passwordStrength - 1] || 'text-[#9AB5A8]'}`}>
                    {password.length > 0 && strengthLabels[passwordStrength - 1]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input-field pr-11"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
              </div>
            </div>

            <p className="text-xs text-center text-[#9AB5A8]">
              By signing up you agree to our{' '}
              <a href="#" className="text-[#C9A84C] hover:underline">Terms</a> &{' '}
              <a href="#" className="text-[#C9A84C] hover:underline">Privacy Policy</a>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg text-base shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] hover:-translate-y-px transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Creating account...</span></>
              ) : 'Create Free Account →'}
            </button>
          </form>

          {/* Bottom */}
          <p className="text-center text-sm text-[#9AB5A8] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A84C] font-semibold hover:text-[#B8943D] transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
