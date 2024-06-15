import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .fields()
    .sort()
    .pagination()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
// update
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // basic course info update
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
    }
    // check if there is any prerequisite corse is need to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted filed
      const deletedPrerequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPrerequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPrerequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
      }
      // filter out the new preRequisite course filed
      const newPreRequisiteCourse = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      console.log(newPreRequisiteCourse);
      const updateNewPreRequisiteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisiteCourse } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!updateNewPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
      }
      const result = await CourseModel?.findById(id).populate(
        'preRequisiteCourses.course',
      );
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
  }
};
const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourse,
};
