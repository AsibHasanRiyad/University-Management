import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentValidationSchema from './student.joi.validation';

// get all student
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudent();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved  successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
// get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved  successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted  successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
