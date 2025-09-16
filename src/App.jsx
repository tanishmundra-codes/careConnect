import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import CounselorDashboard from './pages/CounselorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AIChat from './pages/AIChat';
import BookingSystem from './pages/BookingSystem';
import ResourceHub from './pages/ResourceHub';
import PeerSupport from './pages/PeerSupport';
import Assessment from './pages/Assessment';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />} />
      
      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/ai-chat" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AIChat />
        </ProtectedRoute>
      } />
      <Route path="/booking" element={
        <ProtectedRoute allowedRoles={['student']}>
          <BookingSystem />
        </ProtectedRoute>
      } />
      <Route path="/resources" element={
        <ProtectedRoute allowedRoles={['student']}>
          <ResourceHub />
        </ProtectedRoute>
      } />
      <Route path="/peer-support" element={
        <ProtectedRoute allowedRoles={['student']}>
          <PeerSupport />
        </ProtectedRoute>
      } />
      <Route path="/assessment" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Assessment />
        </ProtectedRoute>
      } />
      
      {/* Counselor Routes */}
      <Route path="/counselor" element={
        <ProtectedRoute allowedRoles={['counselor']}>
          <CounselorDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;