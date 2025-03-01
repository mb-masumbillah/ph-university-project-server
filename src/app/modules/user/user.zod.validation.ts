import { z } from 'zod';
import { UserStatus } from './user.contatnt';

const UserValidationSchema = z.object({
  password: z.string({
    invalid_type_error: "Password must be string"
  }).min(1, 'Password is required').optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidation = {
  UserValidationSchema,
  changeStatusValidationSchema
};
