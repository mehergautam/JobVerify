import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Search,
  History,
  FileText,
  BrainCircuit,
  ScrollText,
  DollarSign,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Fake Job Detector', path: '/detect', icon: ShieldCheck },
  { label: 'Resume Analyzer', path: '/resume', icon: FileText },
  { label: 'Interview Prep', path: '/interview', icon: BrainCircuit },
  { label: 'Offer Verifier', path: '/offer', icon: ScrollText },
  { label: 'Salary Checker', path: '/salary', icon: DollarSign },
  { label: 'History', path: '/history', icon: History },
];

const NavItem = ({ item, onClick }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
          isActive
            ? 'bg-emerald text-white shadow-md'
            : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`
      }
    >
      <Icon size={19} />
      <span>{item.label}</span>
    </NavLink>
  );
};

const Layout = ({ children, pageTitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitials = user?.email?.slice(0, 2).toUpperCase() || 'U';

  const sidebarContent = (
    <>
      <div className="p-5 flex items-center gap-3 border-b border-white/10">
        <div className="bg-emerald p-1.5 rounded-lg text-white flex-shrink-0">
          <ShieldCheck size={22} strokeWidth={2.5} />
        </div>
        <span className="font-extrabold tracking-tight text-lg text-white">JobVerify</span>
      </div>

      <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">Tools</p>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} onClick={() => setSidebarOpen(false)} />
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-emerald flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{user?.email || 'User'}</p>
            <p className="text-slate-400 text-xs">JobVerify Member</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-workspace font-sans text-navy">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar – desktop */}
      <aside className="glass-sidebar w-64 flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Sidebar – mobile drawer */}
      <aside
        className={`glass-sidebar w-72 flex-shrink-0 flex flex-col fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-workspace sticky top-0 z-30 px-4 sm:px-6 lg:px-10 flex items-center justify-between border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-navy p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-bold text-navy">{pageTitle || 'Dashboard'}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-navy transition-colors bg-white p-2 rounded-full shadow-sm hidden sm:flex">
              <Bell size={18} />
            </button>
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-emerald flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {userInitials}
              </div>
              <p className="hidden sm:block font-semibold text-navy text-sm">{user?.email?.split('@')[0]}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
