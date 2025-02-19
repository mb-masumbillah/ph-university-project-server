import { Router } from 'express';
import { semesterRegisterController } from './semesterRegister.controller';
import validationRequest from '../../../middleware/validationRequest';
import { SemesterRegistrationValidations } from './semesterRegister.validation';

const router = Router();

router.post(
  '/create-semesterRegister',
  validationRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegisterController.createSemesterRegister,
);

router.get('/', semesterRegisterController.getAllSemesterRegister);
router.get('/:id', semesterRegisterController.getSingleSemesterRegister);

router.patch(
  '/:id',
  validationRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  semesterRegisterController.updateSemesterRegister,
);

export const SemesterRegister = router;
