// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createStudentZodSchema } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../Faculty/factuly.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from './user.contatnt';

const router = express.Router();

// we call controller funciton
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validationRequest(createStudentZodSchema),
  userController.createUser,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE?.admin),
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const UserRoute = router;
