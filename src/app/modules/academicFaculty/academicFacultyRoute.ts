import express from 'express';
import { academicFacultyValidation } from './academic.faculty.validation';
import validationRequest from '../../../middleware/validationRequest';
import { academicFacultyControllers } from './academicFaculty.controller';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(academicFacultyValidation.AcademicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    academicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicFacultyControllers.getAllAcademicFaculty,
);

export const academicFacultyRouters = router;
