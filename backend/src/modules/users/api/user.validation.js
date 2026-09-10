import { z } from 'zod';

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const roleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    role: z.enum(['USER', 'ADMIN']),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    username: z.string().min(3).optional(),
    avatar_url: z.string().url().optional(),
  }).refine(data => data.username || data.avatar_url, {
    message: 'At least one field (username or avatar_url) must be provided',
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6),
  }),
});

export const updateAvatarSchema = z.object({
  body: z.object({
    avatar_url: z.string().url(),
  }),
});
