import { z } from 'zod';

// Zod schema for UserName
const userNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required.' }) // Replacing .nonempty() with .min(1)
    .max(20, { message: 'Name cannot be more than 20 characters.' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be in capitalized format.',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' }) // Replacing .nonempty() with .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must only contain alphabetic characters.',
    }),
});

// Zod schema for Guardian
const guardianZodSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required.' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required.' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required.' }),
  motherName: z.string().min(1, { message: 'Mother name is required.' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required.' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required.' }),
});

// Zod schema for LocalGuardian
const localGuardianZodSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required.' }),
  contact: z
    .string()
    .min(1, { message: 'Local guardian contact is required.' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is required.' }),
  address: z
    .string()
    .min(1, { message: 'Local guardian address is required.' }),
});

// Zod schema for Student
export const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameZodSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: 'Gender must be either male, female, or other.',
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, { message: 'Email is required.' }) // Replacing .nonempty() with .min(1)
        .email({ message: 'Invalid email format.' }),
      contactNo: z.string().min(1, { message: 'Contact number is required.' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required.' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({
            message:
              'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.',
          }),
        })
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianZodSchema,
      localGuardian: localGuardianZodSchema,
      academicDepartment: z.string(),
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
export const studentValidationZod = {
  createStudentZodSchema,
};
