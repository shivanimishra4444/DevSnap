import { z } from 'zod';

export const blogFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).trim(),
  content: z.string().min(10, 'Content must be at least 10 characters').trim(),
  summary: z.string().max(500).optional().or(z.literal('')),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
