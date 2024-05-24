import config from '../../config';
import { Student } from '../student/student.interface';
import { NewUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const user: NewUser = {};

  // if password is not given use default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = 'student';

  // manually generate id
  user.id = '2030100001';

  // create user
  const result = await UserModel.create(user);

  // create student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
