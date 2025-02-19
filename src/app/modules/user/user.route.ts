// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createStudentZodSchema } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../Faculty/factuly.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';

const router = express.Router();

// we call controller funciton
router.post(
  '/create-student',
  validationRequest(createStudentZodSchema),
  userController.createUser,
);
router.post(
  '/create-faculty',
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const UserRoute = router;
