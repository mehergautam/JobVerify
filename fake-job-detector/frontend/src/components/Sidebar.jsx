import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, ShieldCheck, FileText, BrainCircuit,
  IndianRupee, ScrollText, Sparkles, Linkedin, History, LogOut, Shield
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Fake Job Detector', icon: ShieldCheck, path: '/detect' },
    { label: 'Resume Analyzer', icon: FileText, path: '/resume' },
    { label: 'Interview Prep', icon: BrainCircuit, path: '/interview' },
    { label: 'Salary Checker', icon: IndianRupee, path: '/salary' },
    { label: 'Offer Verifier', icon: ScrollText, path: '/offer' },
    { label: 'Cover Letter', icon: Sparkles, path: '/cover-letter', isNew: true },
    { label: 'LinkedIn Analyzer', icon: Linkedin, path: '/linkedin-analyzer', isNew: true },
    { label: 'History', icon: History, path: '/history' },
  ];

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#2D4A3E] flex flex-col z-50 border-r border-[#1A2E25]">
      {/* Logo */}
      <div className="p-5 border-b border-[#1A2E25]">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield size={26} className="text-[#C9A84C] group-hover:scale-110 transition-transform" fill="currentColor" fillOpacity={0.15} />
          <span className="font-bold text-lg text-[#F5F0E8]">JobVerify</span>
        </Link>
      </div>

      {/* User */}
      <div className="p-4 border-b border-[#1A2E25] flex items-center gap-3">
        <div className="w-9 h-9 bg-[#C9A84C] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {userInitial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#F5F0E8] truncate">{userName}</p>
          <p className="text-xs text-[#9AB5A8] truncate">{user?.email}</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 p-3 overflow-y-auto">
        <p className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest px-3 mb-2 mt-3">Tools</p>
        <nav className="space-y-0.5">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all group ${
                  isActive
                    ? 'bg-[#C9A84C] text-white font-semibold'
                    : 'text-[#9AB5A8] hover:bg-[#3D5A4F] hover:text-[#F5F0E8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={17} />
                  <span>{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="text-[9px] font-bold bg-[#4CAF7D] text-white px-1.5 py-0.5 rounded-full tracking-tight">NEW</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#1A2E25]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#9AB5A8] hover:text-[#E05C5C] hover:bg-[#1A2E25] rounded-lg px-3 py-2 w-full text-sm transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
