import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const HandleDuplicateID = (error: any): TGenericErrorResponse => {
  const matches = error.message.match(/"([^"]+)"/);
  const extractedMessage = matches[1];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Property  Already exist',
    errorSource,
  };
};

export default HandleDuplicateID;
