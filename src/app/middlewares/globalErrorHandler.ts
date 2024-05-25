import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong';
  console.log(error);
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
export default globalErrorHandler;
