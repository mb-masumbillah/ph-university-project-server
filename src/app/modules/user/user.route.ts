// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createStudentZodSchema } from '../student/student.zod.validation';

const router = express.Router();

// we call controller funciton
router.post(
  '/create-student',
  validationRequest(createStudentZodSchema),
  userController.createUser,
);

export const UserRoute = router;
