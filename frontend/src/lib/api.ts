import { Blog, Project, ProjectCreate, UserUpdate, AIResponse, BioGenerationRequest, ProjectSummaryRequest } from '@/types';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Basic API endpoints
export const authAPI = {
  // Get current user profile
  getCurrentUser: () => api.get('/auth/me'),
  
  // Logout
  logout: () => api.post('/auth/logout'),
};

export const projectAPI = {
  // Get projects
  getProjects: () => api.get('/projects/'),
  
  // Create project
  createProject: (project: ProjectCreate) => api.post('/projects/', project),
  
  // Get project by ID
  getProject: (projectId: string) => api.get(`/projects/${projectId}/`),
  
  // Update project
  updateProject: (projectId: string, updateData: Partial<Project>) => api.put(`/projects/${projectId}/`, updateData),
  
  // Delete project
  deleteProject: (projectId: string) => api.delete(`/projects/${projectId}/`),
};
export const blogAPI = {
      // Get blogs
  getBlogs: () => api.get('/blogs/'),
  // Get blogs
  getBlog: (blogId: string) => api.get(`/blogs/${blogId}/`),

  // Delete blog
  deleteBlog: (blogId: string) => api.delete(`/blogs/${blogId}`),

  // Update blog
  updateBlog: (blogId: string, updateData: Partial<Blog>) => api.put(`/blogs/${blogId}/`, updateData),
    // Create blog
  createBlog: (blog: Blog) => api.post('/blogs/', blog),
};

export const userAPI = {
  // Update user profile
  updateUser: (userId: string, updateData: UserUpdate) => api.put(`/users/${userId}/`, updateData),
  
  // Get user by ID
  getUser: (userId: string) => api.get(`/users/${userId}/`),
};

export const aiAPI = {
  // Generate bio using AI
  generateBio: (request: BioGenerationRequest) => api.post<AIResponse>('/ai/generate-bio', request),
  
  // Generate project summary using AI
  generateProjectSummary: (request: ProjectSummaryRequest) => api.post<AIResponse>('/ai/generate-project-summary', request),
};

export default api;
