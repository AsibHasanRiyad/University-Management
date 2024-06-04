import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();
// route => controller => service => model => Database
// router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateSingleStudent,
);

export const studentRoutes = router;
