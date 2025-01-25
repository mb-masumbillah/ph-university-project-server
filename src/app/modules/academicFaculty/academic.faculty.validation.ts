import { z } from 'zod';

const AcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
  }),
});

const UpdateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
  }),
});

export const academicFacultyValidation = {
  AcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
