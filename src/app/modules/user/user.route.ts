import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   we are going to validate our data here and after validation data will go to the controller
      // Validate the studentData if you have a schema
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(studentValidations.studentSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
