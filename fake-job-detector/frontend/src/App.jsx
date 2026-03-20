import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FakeJobDetector from './pages/FakeJobDetector';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import InterviewPrep from './pages/InterviewPrep';
import OfferVerifier from './pages/OfferVerifier';
import SalaryChecker from './pages/SalaryChecker';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ className: 'font-sans text-sm' }} />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/detect" element={<ProtectedRoute><FakeJobDetector /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
          <Route path="/offer" element={<ProtectedRoute><OfferVerifier /></ProtectedRoute>} />
          <Route path="/salary" element={<ProtectedRoute><SalaryChecker /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
