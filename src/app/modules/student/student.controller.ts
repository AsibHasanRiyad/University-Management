import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from './student.joi.validation';

// get all student
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    // global error handler
    next(error);
    // res.status(200).json({
    //   success: false,
    //   message: 'Something went wrong',
    //   error: error,
    // });
  }
};
// get single student
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved  successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students is deleted  successfully',
      data: result,
    });
  } catch (error) {
    next();
  }
};
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
