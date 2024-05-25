import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    // Validate the studentData if you have a schema
    // const zodParsedData = userSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
