import React, { useState, useTransition, useCallback, useMemo } from 'react';
import type { Blog } from '@/types';
import { BLOG_CONTENT_MAX_LENGTH } from './constants';

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

const BlogCard = ({ blog, onEdit, onDelete }: BlogCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Memoize formatted date to prevent unnecessary re-renders
  const formattedDate = useMemo(() => {
    return new Date(blog.updated_at).toLocaleDateString();
  }, [blog.updated_at]);

  // Memoize truncated content
  const truncatedContent = useMemo(() => {
    return blog.content.length > BLOG_CONTENT_MAX_LENGTH 
      ? `${blog.content.substring(0, BLOG_CONTENT_MAX_LENGTH)}...`
      : blog.content;
  }, [blog.content]);

  const handleEdit = useCallback(() => {
    startTransition(() => {
      onEdit(blog);
    });
  }, [blog, onEdit]);

  const handleDelete = useCallback(async () => {
   

    setIsDeleting(true);
    try {
      // TODO: Implement delete API call in Step 8
      // await deleteBlog(blog.id);
      onDelete(blog);
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog post');
    } finally {
      setIsDeleting(false);
    }
  }, [blog.id, onDelete]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={isPending}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
              title="Edit blog"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 01-2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || isPending}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
              title="Delete blog"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Summary */}
        {blog.summary && (
          <p className="text-sm text-gray-600 mb-3 italic">
            {blog.summary}
          </p>
        )}

        {/* Content Preview */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {truncatedContent}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Updated {formattedDate}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {blog.content.length} chars
          </span>
        </div>
      </div>

      {/* Loading overlay for delete */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
