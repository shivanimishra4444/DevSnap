import { useMutation } from '@tanstack/react-query';
import { aiAPI } from '../lib/api';
import type { BioGenerationRequest, ProjectSummaryRequest, AIResponse } from '../types';

// Hook for generating bio using AI
export const useGenerateBio = () => {
  return useMutation({
    mutationFn: async (request: BioGenerationRequest) => {
      const response = await aiAPI.generateBio(request);
      return response.data;
    },
    onError: (error) => {
      console.error('Failed to generate bio:', error);
    },
  });
};

// Hook for generating project summary using AI
export const useGenerateProjectSummary = () => {
  return useMutation({
    mutationFn: async (request: ProjectSummaryRequest) => {
      const response = await aiAPI.generateProjectSummary(request);
      return response.data;
    },
    onError: (error) => {
      console.error('Failed to generate project summary:', error);
    },
  });
};
