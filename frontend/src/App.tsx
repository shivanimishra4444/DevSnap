import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import  ErrorBoundary  from './components/common/ErrorBoundary';
import AppContent from './components/AppContent';
import AuthCallback from './components/AuthCallback';
import ProjectScreen from './components/dashboard/Projects/ProjectScreen';
import BlogScreen from './components/dashboard/Blogs/BlogScreen';
import ProfileScreen from './components/dashboard/Profile/ProfileScreen';

const App = () => {
  return (
    <ErrorBoundary>
      {/* DevSnap - Deployed via CI/CD */}
      <AuthProvider>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/projects" element={<ProjectScreen />} />
          <Route path="/blogs" element={<BlogScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
