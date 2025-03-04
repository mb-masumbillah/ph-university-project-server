import { Router } from 'express';
import validationRequest from '../../../middleware/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';

const router = Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicDepartmentController.getAllAcademicDepartment,
);

export const academicDepartmentRoute = router;
