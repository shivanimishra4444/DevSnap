import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'default';
}

const Spinner = ({ size = 'default' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    default: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto ${size === 'default' ? 'mb-4' : ''} ${sizeClasses[size]}`}></div>
      </div>
    </div>
  );
};

export default Spinner;
