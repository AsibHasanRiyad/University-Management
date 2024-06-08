import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import { studentSearchableField } from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';

// get student
// const getAllStudent = async (query: Record<string, unknown>) => {
//   console.log(query);
//   const queryObj = { ...query };
//   let searchTerm = '';
//   const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = StudentModel.find({
//     $or: studentSearchableField.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });
//   const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
//   excludesFields.forEach((el) => delete queryObj[el]);
//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt';
//   if (query.sort) {
//     sort = query.sort as string;
//   }
//   const sortQuery = filterQuery.sort(sort);

//   let limit = 10;
//   let page = 1;
//   let skip = 0;
//   if (query.limit) {
//     limit = Number(query.limit);
//   }
//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }
//   const paginationQuery = sortQuery.skip(skip);
//   const limitQuery = paginationQuery.limit(limit);

//   // field limiting
//   let fields = '-__v';
//   if (query.fields) {
//     // we have to convert 'name,email' format to 'name email' format , that means remove the comma
//     fields = (query.fields as string).split(',').join(' ');
//   }
//   const fieldsQuery = await limitQuery.select(fields);
//   return fieldsQuery;
// };

// get student with queryBuilder
const getAllStudent = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  );
  studentQuery
    .search(studentSearchableField)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

// get single student
const getSingleStudent = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// update single student
const updateSingleStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
// delete student from db
const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    // get user _id from deletedStudent
    const userId = deletedStudent.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
    // throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Delete Student');
  }
};

export const studentServices = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateSingleStudent,
};
