import React, { useId, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Spinner from '@/components/common/Spinner';
import Logo from '@/components/common/Logo';

const LoginScreen = () => {
  const { login } = useAuth();
  const loginButtonId = useId();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-md w-full mx-4">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="sm" variant="compact" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DevSnap
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Build your developer portfolio
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Showcase your projects, skills, and experience
          </p>
        </div>
        
        {/* Login card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Sign in to continue building your portfolio
            </p>
          </div>

          {/* GitHub login button */}
          <button
            id={loginButtonId}
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full group relative flex items-center justify-center px-6 py-4 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="mr-3">
                  <Spinner size="sm" />
                </div>
                Connecting to GitHub...
              </div>
            ) : (
              <>
                <img src="/images/github-icon.svg" alt="GitHub" className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Continue with GitHub
              </>
            )}
          </button>
          
          {/* Features list */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <img src="/images/check-icon.svg" alt="Check" className="w-4 h-4 text-green-500 mr-3" />
              Free to use, no credit card required
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <img src="/images/check-icon.svg" alt="Check" className="w-4 h-4 text-green-500 mr-3" />
              AI-powered content generation
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <img src="/images/check-icon.svg" alt="Check" className="w-4 h-4 text-green-500 mr-3" />
              Customizable themes and layouts
            </div>
          </div>
          
          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
