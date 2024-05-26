import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // we are going to validate our data here and after validation data will go to the controller
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

export default validateRequest;
