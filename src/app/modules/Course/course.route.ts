import { CourseController } from './course.controller';
import validationRequest from '../../../middleware/validationRequest';
import {
  facultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/create-course',
  validationRequest(createCourseValidationSchema),
  CourseController.createCourses,
);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourses);
router.patch(
  '/:id',
  validationRequest(updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validationRequest(facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validationRequest(facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete('/:id', CourseController.deleteCourses);

export const CourseRouter = router;
