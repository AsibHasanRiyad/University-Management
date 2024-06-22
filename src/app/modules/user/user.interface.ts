/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  status: 'in-progress' | 'blocked ';
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
}
// instead of this we can use partial
// export type NewUser = {
//   password: string;
//   role: 'student' | 'faculty' | 'admin';
//   id: string;
// };

export type TUserRole = keyof typeof USER_ROLE;

export interface TUserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    JWTIssuedTimeStamp: number,
  ): boolean;
}
