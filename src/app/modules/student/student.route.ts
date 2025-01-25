// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// we call controller funciton
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/delete/:id', StudentController.deleteStudent);

export const StudentRoute = router;
