import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectAPI } from '../lib/api';
import type { Project, ProjectCreate } from '../types';

// Hook for fetching projects
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await projectAPI.getProjects();
      return response.data;
    },
  });
};

// Hook for fetching a single project
export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const response = await projectAPI.getProject(projectId);
      return response.data;
    },
    enabled: !!projectId,
  });
};

// Hook for creating a project
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: ProjectCreate) => {
      const response = await projectAPI.createProject(project);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Failed to create project:', error);
    },
  });
};

// Hook for updating a project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, updateData }: { projectId: string; updateData: Partial<ProjectCreate> }) => {
      const response = await projectAPI.updateProject(projectId, updateData);
      return response.data;
    },
    onSuccess: (_, { projectId }) => {
      // Invalidate and refetch projects list and specific project
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
    onError: (error) => {
      console.error('Failed to update project:', error);
    },
  });
};

// Hook for deleting a project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const response = await projectAPI.deleteProject(projectId);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Failed to delete project:', error);
    },
  });
};


