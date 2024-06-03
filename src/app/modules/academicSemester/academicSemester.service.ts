import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(403, 'Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.create(payload);

  return result;
};

const getAllAcademicSemester = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemester = async (id: any) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateSingleSemester = async (
  payload: Partial<TAcademicSemester>,
  id: any,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(400, 'Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleSemester,
};
