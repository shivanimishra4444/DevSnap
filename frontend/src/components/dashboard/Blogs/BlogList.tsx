import React, { useState, useMemo, useCallback, useTransition } from 'react';
import type { Blog } from '@/types';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import Modal from '@/components/common/Modal';
import DeleteConfirmationContent from '@/components/common/DeleteConfirmationContent';
import { useDeleteBlog } from '@/hooks/useBlog';

interface BlogListProps {
  blogs: Blog[];
}

type SortOption = 'created_date'  | 'updated_date';

const BlogList = ({ blogs }: BlogListProps) => {
  // State for edit modal
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // State for delete confirmation modal
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [sortBy, setSortBy] = useState<SortOption>('created_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Use transition for non-blocking modal operations
  const [isPending, startTransition] = useTransition();
  
  // Delete blog mutation
  const deleteBlogMutation = useDeleteBlog();
  // Memoized sorting logic
  const sortedBlogs = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'created_date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'updated_date':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [blogs, sortBy, sortOrder]);

  // Memoized event handlers
  const handleEdit = useCallback((blog: Blog) => {
    startTransition(() => {
      setEditingBlog(blog);
      setShowEditModal(true);
    });
  }, []);

  const handleDelete = useCallback((blog: Blog) => {
    startTransition(() => {
      setDeletingBlog(blog);
      setShowDeleteModal(true);
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingBlog) return;
    
    try {
      await deleteBlogMutation.mutateAsync(deletingBlog.id);
      setShowDeleteModal(false);
      setDeletingBlog(null);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  }, [deletingBlog, deleteBlogMutation]);

  const handleCloseDeleteModal = useCallback(() => {
    if (!deleteBlogMutation.isPending) {
      setShowDeleteModal(false);
      setDeletingBlog(null);
    }
  }, [deleteBlogMutation.isPending]);

  const handleCloseEditModal = useCallback(() => {
    startTransition(() => {
      setShowEditModal(false);
      setEditingBlog(null);
    });
  }, []);

  const handleEditSuccess = useCallback(() => {
    startTransition(() => {
      setShowEditModal(false);
      setEditingBlog(null);
    });
  }, []);

  const handleSortChange = useCallback((newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  }, [sortBy]);

  // Memoized sort options array
  const sortOptions = useMemo(() => [
    { key: 'created_date' as SortOption, label: 'Created Date' },
    { key: 'updated_date' as SortOption, label: 'Updated Date' }
  ], []);

  // Early return if no blogs
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex space-x-2">
            {sortOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  sortBy === key
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {label}
                {sortBy === key && (
                  <span className="ml-1">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        title="Edit Blog Post"
        size="2xl"
      >
        {editingBlog && (
          <BlogForm
            blog={editingBlog}
            onClose={handleCloseEditModal}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title=""
        size="md"
        showCloseButton={false}
      >
        {deletingBlog && (
          <DeleteConfirmationContent
            itemName={deletingBlog.title}
            itemType="Blog Post"
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDeleteModal}
            isLoading={deleteBlogMutation.isPending}
            showButtons={true}
          />
        )}
      </Modal>
    </div>
  );
};

export default BlogList;
