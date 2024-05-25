import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.joi.validation';

// get all student
const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudent();
  // res.status(200).json({
  //   success: true,
  //   message: 'Students are retrieved  successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved  successfully',
    data: result,
  });
  // } catch (error) {
  //   // global error handler
  //   next(error);
  //   // res.status(200).json({
  //   //   success: false,
  //   //   message: 'Something went wrong',
  //   //   error: error,
  //   // });
  // }
});
// get single student
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved  successfully',
    data: result,
  });
});
const deleteSingleStudent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students is deleted  successfully',
      data: result,
    });
  },
);
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
