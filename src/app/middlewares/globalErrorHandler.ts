import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handelZodError from '../errors/HandelZodError';
import handelMongooseValidationError from '../errors/handelMongooseValidationError';
import HandleCastError from '../errors/HandelCastError';
import HandleDuplicateID from '../errors/HandleDuplicateID';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handelMongooseValidationError(error);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSource = simplifiedError?.errorSource);
  } else if (error?.name === 'CastError') {
    const simplifiedError = HandleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (error?.code === 11000) {
    const simplifiedError = HandleDuplicateID(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'development' ? error.stack : null,
    error,
  });
};
export default globalErrorHandler;
