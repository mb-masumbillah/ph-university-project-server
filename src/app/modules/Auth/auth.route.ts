import { Router } from 'express';
import validationRequest from '../../../middleware/validationRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
