import React, { useTransition, useCallback, useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Blog, BlogCreate } from '@/types';
import { blogFormSchema, type BlogFormData } from '@/schemas/blog';
import { useUpdateBlog ,useCreateBlog} from '@/hooks/useBlog';
import { useCurrentUser } from '@/hooks/useAuth';

interface BlogFormProps {
  blog?: Blog;
  onClose: () => void;
  onSuccess: () => void;
}

const BlogForm = ({ blog, onClose, onSuccess }: BlogFormProps) => {
  const [isPending, startTransition] = useTransition();
  const updateBlogMutation = useUpdateBlog();
  const createBlogMutation = useCreateBlog();
  const { data: user } = useCurrentUser();
  const formId = useId();
  const titleId = useId();
  const contentId = useId();
  const summaryId = useId();

  const isEditing = !!blog;

  // Initialize form with react-hook-form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog?.title || '',
      content: blog?.content || '',
      summary: blog?.summary || '',
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = useCallback(async (data: BlogFormData) => {
    startTransition(() => {
      // Handle async operation outside of startTransition
      const handleSubmission = async () => {
        try {
          if (isEditing) {
            const updateData: Partial<Blog> = {
              title: data.title,
              content: data.content,
              summary: data.summary || null
            };
            await updateBlogMutation.mutateAsync({ blogId: blog.id, updateData });
          } else {
            const createData: BlogCreate = {
              user_id: user?.id || '',
              title: data.title,
              content: data.content,
              summary: data.summary || null 
            };
            console.log('Creating blog:', createData);
            await createBlogMutation.mutateAsync(createData as Blog);
          }
          
          onSuccess();
          reset(); // Reset form after successful submission
        } catch (error) {
          console.error('Failed to save blog:', error);
          alert('Failed to save blog post');
        }
      };
      
      handleSubmission();
    });
  }, [isEditing, blog?.id, onSuccess, reset]);

  const handleCancel = useCallback(() => {
    startTransition(() => {
      reset();
      onClose();
    });
  }, [onClose, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId} noValidate>
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor={titleId} className="form-label">
                Title *
              </label>
              <input
                id={titleId}
                type="text"
                {...register('title')}
                className={`input ${errors.title ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Enter blog title..."
                disabled={isPending}
                aria-describedby={errors.title ? `${titleId}-error` : undefined}
              />
              {errors.title && (
                <p id={`${titleId}-error`} className="form-error">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Summary Field */}
            <div className="form-group">
              <label htmlFor={summaryId} className="form-label">
                Summary (Optional)
              </label>
              <textarea
                id={summaryId}
                {...register('summary')}
                className={`input ${errors.summary ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Enter a brief summary..."
                rows={2}
                disabled={isPending}
                aria-describedby={errors.summary ? `${summaryId}-error` : undefined}
              />
              {errors.summary && (
                <p id={`${summaryId}-error`} className="form-error">
                  {errors.summary.message}
                </p>
              )}
            </div>

            {/* Content Field */}
            <div className="form-group">
              <label htmlFor={contentId} className="form-label">
                Content *
              </label>
              <textarea
                id={contentId}
                {...register('content')}
                className={`input ${errors.content ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Write your blog content..."
                rows={8}
                disabled={isPending}
                aria-describedby={errors.content ? `${contentId}-error` : undefined}
              />
              {errors.content && (
                <p id={`${contentId}-error`} className="form-error">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending || !isValid}
                className="btn btn-primary"
              >
                {isPending ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
  );
};

export default BlogForm;
