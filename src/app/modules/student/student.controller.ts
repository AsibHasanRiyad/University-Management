import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// get all student
const getAllStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudent(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved  successfully',
    data: result,
  });
});
// get single student
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved  successfully',
    data: result,
  });
});
const deleteSingleStudent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await studentServices.deleteStudent(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students is deleted  successfully',
      data: result,
    });
  },
);
const updateSingleStudent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await studentServices.updateSingleStudent(id, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students is updated  successfully',
      data: result,
    });
  },
);
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
