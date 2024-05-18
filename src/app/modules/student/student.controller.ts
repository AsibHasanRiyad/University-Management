import { Request, Response } from 'express';
import { studentServices } from './student.service';
const Joi = require('joi');

const createStudent = async (req: Request, res: Response) => {
  try {
    // Define Joi schema for Name
    const nameSchema = Joi.object({
      firstName: Joi.string().trim().required().max(20),
      middleName: Joi.string().allow('', null), // Allow empty or null values for middleName
      lastName: Joi.string()
        .required()
        .regex(/^[A-Za-z]+$/), // Validate as alphabetic string
    });

    // Define Joi schema for Guardian
    const guardianSchema = Joi.object({
      fatherName: Joi.string().allow('', null), // Allow empty or null values for fatherName
      fatherContact: Joi.number().integer().allow(null), // Allow empty or null values for fatherContact
      fatherOccupation: Joi.string().allow('', null), // Allow empty or null values for fatherOccupation
      motherName: Joi.string().allow('', null), // Allow empty or null values for motherName
      motherContact: Joi.number().integer().allow(null), // Allow empty or null values for motherContact
      motherOccupation: Joi.string().allow('', null), // Allow empty or null values for motherOccupation
    });

    // Define Joi schema for LocalGuardian
    const localGuardianSchema = Joi.object({
      name: Joi.string().allow('', null), // Allow empty or null values for name
      contact: Joi.number().integer().allow(null), // Allow empty or null values for contact
      occupation: Joi.string().allow('', null), // Allow empty or null values for occupation
      address: Joi.string().allow('', null), // Allow empty or null values for address
    });

    // Define Joi schema for Student
    const studentSchema = Joi.object({
      id: Joi.string().required(),
      name: nameSchema.required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      dateOfBirth: Joi.string().allow('', null), // Allow empty or null values for dateOfBirth
      email: Joi.string().email().required(),
      emergencyContactNumber: Joi.number().integer().required(),
      profileImage: Joi.string().allow('', null), // Allow empty or null values for profileImage
      bloodGroup: Joi.string()
        .valid(
          'A',
          'A+',
          'A-',
          'B',
          'B+',
          'B-',
          'AB',
          'AB+',
          'AB-',
          'O',
          'O+',
          'O-',
        )
        .allow('', null), // Allow empty or null values for bloodGroup
      presentAddress: Joi.string().allow('', null), // Allow empty or null values for presentAddress
      permanentAddress: Joi.string().allow('', null), // Allow empty or null values for permanentAddress
      guardian: guardianSchema.required(),
      isActive: Joi.string().valid('active', 'inActive').default('active'),
      localGuardian: localGuardianSchema.required(),
    });

    const student = req.body.student;
    const { value, error } = studentSchema.validate(req.body.student);
    console.log(value, error);
    if (error) {
      res.status(200).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
    const result = await studentServices.createStudentIntoDB(student);
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
    console.log(error);
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
export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
