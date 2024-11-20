// <-------------------------Fifth. File router create ----------------------->

import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// we call controller funciton
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.post('/:studentId', StudentController.getSingleStudent);

export const StudentRoute = router;
