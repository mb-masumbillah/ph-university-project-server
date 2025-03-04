import { CourseController } from './course.controller';
import validationRequest from '../../../middleware/validationRequest';
import {
  facultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import { Router } from 'express';
import { USER_ROLE } from '../user/user.contatnt';
import { auth } from '../../../middleware/auth';

const router = Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(createCourseValidationSchema),
  CourseController.createCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getSingleCourses,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseController.deleteCourses,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getAllCourses,
);

export const CourseRouter = router;
