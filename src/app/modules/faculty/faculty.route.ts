import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth('admin', 'faculty'),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth('admin'), FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.admin), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
