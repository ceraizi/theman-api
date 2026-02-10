import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, "The title should have at least 1 character")
    .max(100, "The title can't have more than 100 characters"),
  completed: z.boolean().optional()
});

export const updateTaskSchema = createTaskSchema.partial();