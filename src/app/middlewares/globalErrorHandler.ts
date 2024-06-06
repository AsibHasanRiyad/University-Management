import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  const handelZodError = (error: ZodError) => {
    // console.log(error);
    const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: ' Validation Error',
      errorSource,
    };
  };
  if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'development' ? error.stack : null,
  });
};
export default globalErrorHandler;
