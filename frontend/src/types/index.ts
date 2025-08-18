// Import the auto-generated types
import type { components } from './api';

// Type aliases that reference the auto-generated API types
// This gives us clean names while maintaining automatic sync with backend

// User types - automatically synced with backend
export type User = components['schemas']['UserProfileResponse'];
export type UserCreate = components['schemas']['UserCreate'];
export type UserUpdate = components['schemas']['UserUpdate'];
export type UserResponse = components['schemas']['UserResponse'];

// Project types - automatically synced with backend
export type Project = components['schemas']['ProjectResponse'];
export type ProjectCreate = components['schemas']['ProjectCreate'];
export type ProjectUpdate = components['schemas']['ProjectUpdate'];

// Blog types - automatically synced with backend (if you have blogs)
export type Blog = components['schemas']['BlogResponse'];
export type BlogCreate = components['schemas']['BlogCreate'];
export type BlogUpdate = components['schemas']['BlogUpdate'];

// AI types - automatically synced with backend
export type AIResponse = components['schemas']['AIResponse'];
export type BioGenerationRequest = components['schemas']['BioGenerationRequest'];
export type ProjectSummaryRequest = components['schemas']['ProjectSummaryRequest'];

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  detail: string;
  status: number;
}

// Re-export the complex types for advanced usage
export type { components, operations, paths } from './api';
