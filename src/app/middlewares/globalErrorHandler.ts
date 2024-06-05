import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (error instanceof ZodError) {
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    myError: error,
  });
};
export default globalErrorHandler;
