import React, { useState } from 'react';

export const AppMockup = () => {
  const [activeScreen, setActiveScreen] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen('login');
  };

  const screens = {
    login: {
      title: 'Login',
      description: 'Sign in to your DevSnap account',
      component: (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to DevSnap
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Build your professional portfolio
              </p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  By signing in, you agree to our{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    register: {
      title: 'Register',
      description: 'Create your DevSnap account',
      component: (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Start building your portfolio today
              </p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Sign up with GitHub
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    dashboard: {
      title: 'Dashboard',
      description: 'Main dashboard with portfolio overview',
      component: (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h2>
              <p className="text-gray-600">Manage your portfolio</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + New Project
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📁</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Blog Posts</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-xl">👤</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Profile Status</p>
                  <p className="text-2xl font-bold text-gray-900">Complete</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🚀</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">E-Commerce Platform</p>
                    <p className="text-sm text-gray-600">React, TypeScript, Node.js</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-sm">📱</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">Task Management App</p>
                    <p className="text-sm text-gray-600">Vue.js, Firebase</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveScreen('projects')}
                  className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-3">📁</span>
                    <span>Manage Projects</span>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveScreen('blogs')}
                  className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">📝</span>
                    <span>Manage Blogs</span>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveScreen('profile')}
                  className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <span className="text-purple-600 mr-3">👤</span>
                    <span>Edit Profile</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    projects: {
      title: 'Projects',
      description: 'Manage your portfolio projects',
      component: (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              <p className="text-gray-600">Manage your portfolio projects</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Add Project
              </button>
              <button
                onClick={() => setActiveScreen('dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop"
                alt="E-Commerce Platform"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">E-Commerce Platform</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">A modern e-commerce platform built with React and Node.js</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Node.js</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">View</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop"
                alt="Task Management App"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Task Management App</h3>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Collaborative task management with real-time updates</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vue.js</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Firebase</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Tailwind</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">Preview</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-80 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-xl">+</span>
                </div>
                <p className="text-gray-600 font-medium">Add New Project</p>
                <p className="text-sm text-gray-500">Upload images and details</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    blogs: {
      title: 'Blogs',
      description: 'Manage your blog posts',
      component: (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <p className="text-gray-600">Manage your blog content</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + New Post
              </button>
              <button
                onClick={() => setActiveScreen('dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
                alt="Building Scalable React Applications"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Building Scalable React Applications</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Published</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">A comprehensive guide to building scalable React applications with modern architecture patterns.</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Architecture</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Best Practices</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">View</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop"
                alt="TypeScript Tips for Better Code"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">TypeScript Tips for Better Code</h3>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Advanced TypeScript techniques and patterns for writing better, more maintainable code.</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Development</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Code Quality</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">Preview</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-80 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-xl">+</span>
                </div>
                <p className="text-gray-600 font-medium">Create New Post</p>
                <p className="text-sm text-gray-500">Write and publish content</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    profile: {
      title: 'Profile',
      description: 'Edit your user profile',
      component: (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
              <p className="text-gray-600">Update your profile information</p>
            </div>
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          <div className="max-w-2xl">
            <form className="space-y-6">
              <div className="flex items-center space-x-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Change Photo
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue="johndoe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub ID</label>
                  <input
                    type="text"
                    defaultValue="123456"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Full-stack developer passionate about creating beautiful, functional web applications."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    defaultValue="https://github.com/johndoe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    defaultValue="https://johndoe.dev"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {screens[activeScreen as keyof typeof screens].component}
      </div>
    );
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DevSnap Portfolio Builder</h1>
          <p className="text-gray-600">Manage your portfolio with the features we've built</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex space-x-1 p-2">
            {Object.entries(screens).filter(([key]) => key !== 'login' && key !== 'register').map(([key, screen]) => (
              <button
                key={key}
                onClick={() => setActiveScreen(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeScreen === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {screen.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Screen Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {screens[activeScreen as keyof typeof screens].title}
          </h2>
          <p className="text-gray-600">
            {screens[activeScreen as keyof typeof screens].description}
          </p>
        </div>
        
        {/* Active Screen Component */}
        {screens[activeScreen as keyof typeof screens].component}
      </div>
    </div>
  );
};
