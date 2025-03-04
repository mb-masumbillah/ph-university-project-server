import { Router } from 'express';
import { OfferedCourseController } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validationRequest from '../../../middleware/validationRequest';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';

const router = Router();


router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourseController.getAllOfferedCourses,
);

router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseController.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourseController.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
