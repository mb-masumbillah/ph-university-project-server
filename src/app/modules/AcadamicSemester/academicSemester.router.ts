import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.zod.validation';
import validationRequest from '../../../middleware/validationRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationRequest(AcademicSemesterValidations.CreateAcademicValidationSchema),
  academicSemesterControllers.createAcademicSemester,
);
router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get('/:id', academicSemesterControllers.getSingleAcademicSemester);
router.patch(
  '/:id',
  validationRequest(AcademicSemesterValidations.UpdateAcademicValidationSchema),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRouters = router;
