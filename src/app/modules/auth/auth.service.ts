import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TUserLogin) => {
  //checking if the user is exist or not ?
  const user = await UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  // const isUserExist = await UserModel.findOne({ id: payload?.id });
  //   check if the user is already deleted ?
  if (user?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted');
  }
  //   check if the user is blocked
  if (user?.status === 'blocked ') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is Blocked');
  }

  //   check if the password is matched or not ?
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Does not match');
  }

  // Access granted : Access Token, Refresh Token
  // create token and send to the user
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
