import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'compact' | 'text-only';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ 
  variant = 'default', 
  className = '',
  showText = false,
  size = 'md'
}: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}>
      <svg className={`${iconSizes[size]} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );

  const LogoText = () => (
    <h1 className={`${textSizes[size]} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
      DevSnap
    </h1>
  );

  if (variant === 'text-only') {
    return (
      <Link to="/" className={`hover:opacity-80 transition-opacity ${className}`}>
        <LogoText />
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to="/" className={`hover:opacity-80 transition-opacity ${className}`}>
        <LogoIcon />
      </Link>
    );
  }

  // Default variant
  return (
    <Link to="/" className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}>
      <LogoIcon />
      {showText && (
        <div className="hidden sm:block">
          <LogoText />
        </div>
      )}
    </Link>
  );
};

export default Logo;
