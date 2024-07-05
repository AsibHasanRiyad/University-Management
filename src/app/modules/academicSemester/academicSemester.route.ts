import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get(
  '/',
  auth('admin'),
  AcademicSemesterController.getAllAcademicSemester,
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateASemester,
);

export const academicSemesterRoutes = router;
