import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year + semester Code + 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  const currentId = (await findLastStudentId()) || (0).toString();
  //   console.log(currentId, 'current id');
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  //   console.log(incrementId, 'Increment id');
  return incrementId;
};
