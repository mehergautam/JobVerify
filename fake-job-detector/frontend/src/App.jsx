import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';

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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen"
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
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/detect" element={<ProtectedRoute><PageWrapper><FakeJobDetector /></PageWrapper></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><PageWrapper><ResumeAnalyzer /></PageWrapper></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><PageWrapper><InterviewPrep /></PageWrapper></ProtectedRoute>} />
        <Route path="/offer" element={<ProtectedRoute><PageWrapper><OfferVerifier /></PageWrapper></ProtectedRoute>} />
        <Route path="/salary" element={<ProtectedRoute><PageWrapper><SalaryChecker /></PageWrapper></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><PageWrapper><HistoryPage /></PageWrapper></ProtectedRoute>} />

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
            className: 'toast-custom',
            duration: 4000,
            style: {
              background: '#13132b',
              color: '#fff',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }
          }} 
        />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
