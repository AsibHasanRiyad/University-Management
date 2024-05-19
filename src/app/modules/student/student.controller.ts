import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentValidationSchema from './student.joi.validation';
import studentSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    //---------------- data validation using joi ---------------
    // const { value, error } = studentValidationSchema.validate(student);
    // --------------------------------------------------------
    // validation using zod
    const zodParsedData = studentSchema.parse(student);
    const result = await studentServices.createStudentIntoDB(zodParsedData);
    // console.log(value, error);
    // if (error) {
    //   return res.status(200).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.message,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created',
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
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
