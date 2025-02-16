import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./factuly.validation";
import validationRequest from "../../../middleware/validationRequest";

const router = Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;