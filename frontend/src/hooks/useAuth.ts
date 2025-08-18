import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../lib/api';
import type { User } from '../types';

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await authAPI.getCurrentUser();
      return response.data as User;
    },
    retry: false,
  });
};

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('oauth_state');
    },
  });
};
