import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './factuly.validation';
import validationRequest from '../../../middleware/validationRequest';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.contatnt';

const router = Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
