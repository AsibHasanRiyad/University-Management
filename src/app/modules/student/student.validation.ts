import { z } from 'zod';

// Name schema
const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContact: z.number(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContact: z.number(),
  motherOccupation: z.string(),
});

// Local guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  contact: z.number(),
  occupation: z.string(),
  address: z.string(),
});

// Main student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNumber: z.number().optional(), // Make contactNumber optional
      emergencyContactNumber: z.number(),
      profileImage: z.string().optional(),
      bloodGroup: z
        .enum([
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
        ])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
