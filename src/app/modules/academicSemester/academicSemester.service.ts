import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import {
  academicSemesterNameCodeMapper,
  AcademicSemesterSearchableFields,
} from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.create(payload);

  return result;
};

const getAllAcademicSemester = async (query: Record<string, unknown>) => {
  const academicSemester = new QueryBuilder(AcademicSemesterModel.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .fields()
    .sort()
    .pagination()
    .fields();
  const result = await academicSemester.modelQuery;
  return result;
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateSingleSemester = async (
  payload: Partial<TAcademicSemester>,
  id: string,
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
