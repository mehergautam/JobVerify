import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FakeJobDetector from './pages/FakeJobDetector';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import InterviewPrep from './pages/InterviewPrep';
import OfferVerifier from './pages/OfferVerifier';
import SalaryChecker from './pages/SalaryChecker';
import HistoryPage from './pages/HistoryPage';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import LinkedInAnalyzer from './pages/LinkedInAnalyzer';
import CompanyVerifier from './pages/CompanyVerifier';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <PageWrapper><Signup /></PageWrapper>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><PageWrapper><Dashboard /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/detect" element={<ProtectedRoute><DashboardLayout><PageWrapper><FakeJobDetector /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><DashboardLayout><PageWrapper><ResumeAnalyzer /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><DashboardLayout><PageWrapper><InterviewPrep /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/offer" element={<ProtectedRoute><DashboardLayout><PageWrapper><OfferVerifier /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/salary" element={<ProtectedRoute><DashboardLayout><PageWrapper><SalaryChecker /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><DashboardLayout><PageWrapper><HistoryPage /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/cover-letter" element={<ProtectedRoute><DashboardLayout><PageWrapper><CoverLetterGenerator /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/linkedin-analyzer" element={<ProtectedRoute><DashboardLayout><PageWrapper><LinkedInAnalyzer /></PageWrapper></DashboardLayout></ProtectedRoute>} />
        <Route path="/company-verifier" element={<ProtectedRoute><DashboardLayout><PageWrapper><CompanyVerifier /></PageWrapper></DashboardLayout></ProtectedRoute>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            duration: 4000,
            style: {
              background: '#131316',
              color: '#f2f2f5',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            }
          }} 
        />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
