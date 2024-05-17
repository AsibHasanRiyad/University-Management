import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await studentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'Student is created',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudent,
};
