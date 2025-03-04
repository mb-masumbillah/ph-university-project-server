import { Router } from 'express';
import { AdminController } from './admin.controller';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';
import validationRequest from '../../../middleware/validationRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminController.getAllAdmin,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminController.getSingleAdmin,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validationRequest(updateAdminValidationSchema),
  AdminController.updateAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  AdminController.deleteAdmin,
);

export const AdminRouter = router;
