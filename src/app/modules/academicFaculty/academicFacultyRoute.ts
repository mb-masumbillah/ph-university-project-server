import express from 'express';
import { academicFacultyValidation } from './academic.faculty.validation';
import validationRequest from '../../../middleware/validationRequest';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationRequest(academicFacultyValidation.AcademicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validationRequest(academicFacultyValidation.AcademicFacultyValidationSchema),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRouters = router;
