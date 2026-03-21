import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, ShieldCheck, FileText, BrainCircuit, 
  DollarSign, ScrollText, FileEdit, Linkedin, History, LogOut, Shield,
  ChevronRight
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
    { label: 'Salary Checker', icon: DollarSign, path: '/salary' },
    { label: 'Offer Verifier', icon: ScrollText, path: '/offer' },
    { label: 'Cover Letter', icon: FileEdit, path: '/cover-letter', isNew: true },
    { label: 'LinkedIn Analyzer', icon: Linkedin, path: '/linkedin-analyzer', isNew: true },
    { label: 'History', icon: History, path: '/history' },
  ];

  const userInitials = user?.email?.slice(0, 1).toUpperCase() || 'U';

  return (
    <aside className="fixed left-0 top-0 w-60 h-screen bg-[#131316] border-r border-white/5 flex flex-col z-50">
      {/* TOP SECTION */}
      <div className="p-5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="text-[#6366f1] transition-transform group-hover:scale-110">
            <Shield size={26} fill="currentColor" fillOpacity={0.15} />
          </div>
          <span className="font-['Cabinet_Grotesk'] font-bold text-xl tracking-tight text-white">JobVerify</span>
        </Link>
      </div>

      {/* NAV SECTION */}
      <div className="flex-1 px-3 mt-6">
        <p className="text-[10px] font-bold text-[#55555f] tracking-[0.2em] uppercase px-3 mb-4">Tools</p>
        <nav className="space-y-1">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={i} 
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-[#6366f1]/10 text-[#a5b4fc] border border-[#6366f1]/20' 
                    : 'text-[#8b8b99] hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? 'text-[#6366f1]' : 'group-hover:text-white'} />
                  <span>{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="text-[8px] font-bold bg-[#6366f1] text-white px-1.5 py-0.5 rounded tracking-tighter">NEW</span>
                )}
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-5 bg-[#6366f1] rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#6366f1]/20">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.email?.split('@')[0]}</p>
            <p className="text-[10px] font-medium text-[#55555f] truncate">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-[#55555f] hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
