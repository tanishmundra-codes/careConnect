import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/Signup/signup';
import CounselorSignupPage from './components/Signup/counselor';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import CounselorDashboard from './components/CounselorDash/CounselorDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AIChat from './components/AIChat/AIChat';
import BookingSystem from './components/BookingSystem/BookingSystem';
import ResourceHub from './components/ResourceHub/ResourceHub';
import PeerSupport from './components/PeerSupport/PeerSupport';
import Assessment from './components/Assesments/Assessment';

// Auth
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
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <SignupPage />}
      />
      <Route
        path="/counselor-signup"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <CounselorSignupPage />}
      />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <AIChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <BookingSystem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <ResourceHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="/peer-support"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <PeerSupport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Assessment />
          </ProtectedRoute>
        }
      />

      {/* Counselor Routes */}
      <Route
        path="/counselor"
        element={
          <ProtectedRoute allowedRoles={['counselor']}>
            <CounselorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
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