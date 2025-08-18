import { z } from 'zod';

// Project Form Schema
export const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  tech_stack: z.string().optional(),
  github_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demo_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  summary: z.string().max(1000, 'Summary must be less than 1000 characters').optional()
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

// Profile Form Schema
export const profileFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Must be a valid email').optional().or(z.literal('')),
  github_username: z.string().min(1, 'GitHub username is required').max(50, 'GitHub username must be less than 50 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  website_url: z.string().url('Must be a valid URL').optional().or(z.literal(''))
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
