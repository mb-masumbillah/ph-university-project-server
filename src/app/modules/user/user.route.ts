// <-------------------------Fifth. File router create ----------------------->

import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createStudentZodSchema } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../Faculty/factuly.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from './user.contatnt';
import { upload } from '../../../utils/sendImageToCloudinary';
import { userValidation } from './user.zod.validation';

const router = express.Router();

// we call controller funciton
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.get('/me', auth('student', 'faculty', 'admin'), userController.getMe);

router.post(
  '/change-status/:id',
  auth('admin'),
  validationRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus,
);

export const UserRoute = router;
