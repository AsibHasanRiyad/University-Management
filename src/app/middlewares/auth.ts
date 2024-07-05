import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const auth = (...RequiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token exist or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // check if the token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      // console.log(error);
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    const { role, userId, iat } = decoded;
    //checking if the user is exist or not ?
    const user = await UserModel.isUserExistByCustomId(userId);
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
    // check if issued token is not changed after password changed
    if (
      user.passwordChangeAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    if (RequiredRoles && !RequiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
