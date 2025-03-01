// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { StudentController } from './student.controller';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.contatnt';

const router = express.Router();

// we call controller funciton
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.student),
  StudentController.getAllStudents,
);
router.get('/:id',auth(USER_ROLE.admin, USER_ROLE.faculty), StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.patch('/:id', StudentController.updateStudent);

export const StudentRoute = router;
