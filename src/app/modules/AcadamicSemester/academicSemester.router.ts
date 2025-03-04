import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.zod.validation';
import validationRequest from '../../../middleware/validationRequest';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(AcademicSemesterValidations.CreateAcademicValidationSchema),
  academicSemesterControllers.createAcademicSemester,
);

router.get(
  '/:courseId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(AcademicSemesterValidations.UpdateAcademicValidationSchema),
  academicSemesterControllers.updateAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemesterControllers.getAllAcademicSemester,
);

export const academicSemesterRouters = router;
