import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
// route => controller => service => model => Database
router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);

export const studentRoutes = router;
