import React, { createContext, useContext, useState, useEffect, ReactNode, startTransition } from 'react';
import { useCurrentUser, useLogout } from '../hooks/useAuth';
import { buildGitHubAuthUrl, generateOAuthState, getGitHubConfig } from '../utils/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  
  // Use React Query hooks
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if we have a token on mount
    const token = localStorage.getItem('auth_token');
    if (!token) {
      startTransition(() => {
        setLoading(false);
      });
    } else {
      // If we have a token, wait for user data to load
      startTransition(() => {
        setLoading(userLoading);
      });
    }
  }, [userLoading]);

  const login = () => {
    const { clientId, callbackUrl } = getGitHubConfig();
    const state = generateOAuthState();
    
    // Store state for verification
    localStorage.setItem('oauth_state', state);
    
    // Build GitHub OAuth URL
    const githubAuthUrl = buildGitHubAuthUrl(clientId, callbackUrl, state);
    
    startTransition(() => {
      window.location.href = githubAuthUrl;
    });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
