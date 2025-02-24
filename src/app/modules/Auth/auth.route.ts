import { Router } from 'express';
import validationRequest from '../../../middleware/validationRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { auth } from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.contatnt';

const router = Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
