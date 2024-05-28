import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // manually generate id
  // userData.id = '2030100002';
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }
  userData.id = await generateStudentId(admissionSemester);
  console.log(await generateStudentId(admissionSemester));

  // create user
  const newUser = await UserModel.create(userData);
  // console.log(newUser);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //reference id
    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
