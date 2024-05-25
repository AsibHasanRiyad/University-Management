import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // manually generate id
  userData.id = '2030100002';

  // create user
  const newUser = await UserModel.create(userData);
  // console.log(newUser);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference id
    const newStudent = StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
