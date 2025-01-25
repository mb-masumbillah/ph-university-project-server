import Joi from 'joi';

// Create a Joi schema for validating the student data

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalize')
    .messages({
      'string.empty': 'First name is required.',
      'string.max': 'First name cannot be more than 20 characters.',
      'string.pattern.base': 'First name should start with a capital letter.',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/, 'alphabets')
    .messages({
      'string.empty': 'Last name is required.',
      'string.pattern.base': 'Last name should only contain letters.',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim().messages({
    'string.empty': 'Father name is required.',
  }),
  fatherOccupation: Joi.string().required().trim().messages({
    'string.empty': 'Father occupation is required.',
  }),
  fatherContactNo: Joi.string().required().trim().messages({
    'string.empty': 'Father contact number is required.',
  }),
  motherName: Joi.string().required().trim().messages({
    'string.empty': 'Mother name is required.',
  }),
  motherOccupation: Joi.string().required().trim().messages({
    'string.empty': 'Mother occupation is required.',
  }),
  motherContactNo: Joi.string().required().trim().messages({
    'string.empty': 'Mother contact number is required.',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': 'Local guardian name is required.',
  }),
  contact: Joi.string().required().trim().messages({
    'string.empty': 'Local guardian contact is required.',
  }),
  occupation: Joi.string().required().trim().messages({
    'string.empty': 'Local guardian occupation is required.',
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': 'Local guardian address is required.',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required.',
  }),
  name: userNameValidationSchema,
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be male, female, or other.',
    'string.empty': 'Gender is required.',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'string.empty': 'Email is required.',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').required().messages({
    'any.only': 'Account status must be either active or blocked.',
    'string.empty': 'Account status is required.',
  }),
});

export default studentValidationSchema;
