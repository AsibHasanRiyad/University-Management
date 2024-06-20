import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TUserLogin } from './auth.interface';

const loginUser = async (payload: TUserLogin) => {
  //checking if the user is exist or not
  const user = UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  const isUserExist = await UserModel.findOne({ id: payload?.id });
  //   check if the user is already deleted
  if (isUserExist?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted');
  }
  //   check if the user is blocked
  if (isUserExist?.status === 'blocked ') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is Blocked');
  }

  //   check if the password is matched or not
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      (await user)?.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Does not match');
  }

  // Access granted : Access Token, Refresh Token
};

export const AuthService = {
  loginUser,
};
