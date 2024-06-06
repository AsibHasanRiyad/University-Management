import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handelMongooseValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: ' Validation Error',
    errorSource,
  };
};

export default handelMongooseValidationError;
