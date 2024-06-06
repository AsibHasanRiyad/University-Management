import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handelZodError = (error: ZodError): TGenericErrorResponse => {
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
export default handelZodError;
