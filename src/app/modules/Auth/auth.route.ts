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
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetTokenValidationSchema),
  AuthControllers.forgetPassword,
);
router.post(
  '/reset-password',
  validationRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
