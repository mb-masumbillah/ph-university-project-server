// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { StudentController } from './student.controller';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.contatnt';
import validationRequest from '../../../middleware/validationRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

// we call controller funciton
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getAllStudents,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSingleStudent,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);



export const StudentRoute = router;
