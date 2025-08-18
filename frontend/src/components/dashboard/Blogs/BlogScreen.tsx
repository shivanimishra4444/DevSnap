import React, { useState, useTransition, useDeferredValue, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import ErrorComponent from '@/components/common/ErrorComponent';
import { useBlogs } from '@/hooks/useBlog';
import BlogList from './BlogList';
import BlogForm from './BlogForm';

const BlogScreen = () => {
  const { user, logout } = useAuth();
  const { data: blogs, isLoading, error, refetch } = useBlogs();
  const navigate = useNavigate();
  
  // State management
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use transition for non-blocking UI updates
  const [isPending, startTransition] = useTransition();
  
  // Use deferred value for search to prevent UI blocking
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Memoized handlers to prevent unnecessary re-renders
  const handleNewBlog = useCallback(() => {
    startTransition(() => {
      setShowForm(true);
    });
  }, []);

  const handleCloseForm = useCallback(() => {
    startTransition(() => {
      setShowForm(false);
    });
  }, []);

  const handleFormSuccess = useCallback(() => {
    handleCloseForm();
    refetch(); // Refresh the blog list
  }, [handleCloseForm, refetch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Memoized filtered blogs for better performance
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
      (blog.summary && blog.summary.toLowerCase().includes(deferredSearchTerm.toLowerCase()))
    );
  }, [blogs, deferredSearchTerm]);


  return (
    <div className="min-h-screen bg-gray-50">


      <Header 
        user={user} 
        onLogout={logout}
        title="Blog Management"
        subtitle="Create and manage your blog posts"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleNewBlog}
                loading={isPending}
                loadingText="Loading..."
              >
                + Add Blog
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="secondary"
              >
                ← Back
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <ErrorComponent
              title="Error loading blogs"
              message="Please try again later."
              showRetry={true}
              retryAction={() => refetch()}
              className="mb-6"
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          )}

          {/* Content */}
          {!isLoading && !error && (
            <>
              {blogs && blogs.length > 0 ? (
                <>
                  {/* Search Bar - Only show when there are blogs */}
                  <div className="mb-6">

                    <input
                      id="blog-search"
                      type="text"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="search-results"
                    />
                  </div>

                  {/* Blog List */}
                  {filteredBlogs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                      <p className="text-gray-600">Try adjusting your search terms.</p>
                    </div>
                  ) : (
                    <BlogList blogs={filteredBlogs} />
                  )}
                </>
              ) : (
                /* Placeholder Content - When no blogs exist */
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
                  <p className="text-gray-600">Create your first blog post to get started!</p>
                </div>
              )}
            </>
          )}

          {/* Blog Form Modal */}
          <Modal
            isOpen={showForm}
            onClose={handleCloseForm}
            title="Create New Blog Post"
            size="2xl"
          >
            <BlogForm 
              onClose={handleCloseForm} 
              onSuccess={handleFormSuccess}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BlogScreen;
