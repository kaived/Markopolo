import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    rating: z.number().int().min(1).max(5),
    attachments: z.array(z.string().url()).optional(),
    location: z.string().optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().min(1).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    attachments: z.array(z.string().url()).optional(),
    location: z.string().optional(),
  }),
});

export const commentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required'),
  }),
});
