import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  // check if semester exist or not
  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester Not Found');
  }

  // check if semester  registration already exist or not
  const isSemesterRegistrationExist = await semesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester already exist');
  }
  const result = semesterRegistrationModel.create(payload);
  return result;
};
const getAllSemesterRegistrationIntoDB = async () => {};
const getSingleSemesterRegistrationIntoDB = async () => {};
const updateSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
