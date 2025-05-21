import { z } from 'zod';

export const addUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z.string().min(1, 'Password is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['USER', 'ADMIN'], {
    errorMap: () => ({ message: 'Role must be either USER or ADMIN' }),
  }),
});

export type AddUserData = z.infer<typeof addUserSchema>;
