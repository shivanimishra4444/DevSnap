import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {  blogAPI } from '../lib/api';
import type { Blog } from '../types';

// Get blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogAPI.getBlogs();
      return response.data as Blog[];
    },
    retry: false,
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blogId: string) => {
      const response = await blogAPI.deleteBlog(blogId);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch blogs after successful deletion
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.error('Failed to delete blog:', error);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ blogId, updateData }: { blogId: string; updateData: Partial<Blog> }) => {
      const response = await blogAPI.updateBlog(blogId, updateData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch blogs after successful update
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.error('Failed to update blog:', error);
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blog: Blog) => {
      const response = await blogAPI.createBlog(blog);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch blogs after successful creation
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.error('Failed to create blog:', error);
    },
  });
};