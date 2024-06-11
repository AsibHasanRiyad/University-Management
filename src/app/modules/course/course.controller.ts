import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Created Successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course is retrieved Successfully ',
    data: result,
  });
});

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const data = req.body;
//   const result = await AcademicFacultyServices.updateSingleAcademicFaculty(
//     data,
//     facultyId,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: ' Academic Faculty Updated',
//     data: result,
//   });
// });
//

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Course is deleted Successfully ',
    data: result,
  });
});

export const AcademicFacultyController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
