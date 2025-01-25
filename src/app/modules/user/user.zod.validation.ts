import { z } from 'zod';

const UserValidationSchema = z.object({
  password: z.string({
    invalid_type_error: "Password must be string"
  }).min(1, 'Password is required').optional(),
});

export const userValidation = {
  UserValidationSchema,
};
