import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from '../../middlewares/auth.utils';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //checking if the user is exist or not ?
  const user = await UserModel.isUserExistByCustomId(userData.userId);
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
  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Does not match');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await UserModel.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return result;
};

export const AuthService = {
  loginUser,
  changePassword,
};
