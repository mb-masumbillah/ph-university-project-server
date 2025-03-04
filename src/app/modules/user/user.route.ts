// <-------------------------Fifth. File router create ----------------------->

import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createStudentValidationSchema, createStudentZodSchema } from '../student/student.zod.validation';
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
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createStudentValidationSchema),
  userController.createUser,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);


export const UserRoute = router;
