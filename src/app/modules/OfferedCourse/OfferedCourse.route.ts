import { Router } from 'express';
import { OfferedCourseController } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validationRequest from '../../../middleware/validationRequest';

const router = Router();


router.post(
    '/create-offered-course',
    validationRequest(
      OfferedCourseValidations.createOfferedCourseValidationSchema,
    ),
    OfferedCourseController.createOfferedCourse,
  );

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourses);

router.patch(
  '/:id',
  validationRequest(
    OfferedCourseValidations.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
