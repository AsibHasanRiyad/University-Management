import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOfferedCourse } from './offeredCourse.interface';
import OfferedCourse from './offeredCourse.model';
import { semesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { CourseModel } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // check if semester registration id is exist ?
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
  } = payload;
  const isSemesterRegistrationExist =
    await semesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;
  const isAcademicDepartmentExist =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  const isAcademicFacultyExist =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }
  const isCourseExist = await CourseModel.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  const isFacultyExist = await Faculty.findById(faculty);

  console.log(isFacultyExist);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, ' Faculty not found');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
