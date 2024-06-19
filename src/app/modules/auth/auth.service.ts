import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TUserLogin) => {
  //checking if the user is exist or not
  const isUserExist = await UserModel.findOne({ id: payload?.id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  //   check if the user is already deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted');
  }
  //   check if the user is blocked
  if (isUserExist.status === 'blocked ') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is Blocked');
  }

  //   check if the password is matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );

  // Access granted : Access Token, Refresh Token
};

export const AuthService = {
  loginUser,
};
