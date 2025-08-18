import React, { useEffect, startTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '@/components/common/Spinner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const provider = searchParams.get('provider');

    if (token && provider === 'github') {
      localStorage.setItem('auth_token', token);
      
      startTransition(() => {
        navigate('/', { replace: true });
      });
    } else {
      // No token received, redirect to home page
      startTransition(() => {
        navigate('/', { replace: true });
      });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div>
        <Spinner />
        <p className="text-center text-gray-600 mt-4">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
