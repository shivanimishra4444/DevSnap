import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '@/types';
import Logo from '@/components/common/Logo';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const Header = ({ 
  user, 
  onLogout, 
  title = "DevSnap Portfolio Builder",
  subtitle = "Manage your portfolio with the features we've built",
  actions
}: HeaderProps) => {
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/profile', label: 'Profile' },

  ];

  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Logo/Home Button */}
              <Logo size="md" />
              
              {/* Title and Subtitle */}
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {actions && (
                <div className="flex space-x-3">
                  {actions}
                </div>
              )}
              <span className="text-sm text-gray-600">
               Hi, {user?.name || 'User'}! 👋
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
