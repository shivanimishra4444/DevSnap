import React from 'react';
import Spinner from '@/components/common/Spinner';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div>
        <Spinner />
        <p className="text-center text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
