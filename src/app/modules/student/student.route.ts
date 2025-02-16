// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// we call controller funciton
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.patch('/:id', StudentController.updateStudent);

export const StudentRoute = router;
