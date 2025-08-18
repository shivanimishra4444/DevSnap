import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../lib/api';
import type { UserUpdate } from '../types';

// Hook for updating user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, updateData }: { userId: string; updateData: UserUpdate }) => {
      const response = await userAPI.updateUser(userId, updateData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};
