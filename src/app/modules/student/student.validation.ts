import { z } from 'zod';
import { Guardian, LocalGuardian, Name } from './student.interface';

// Name schema
const studentNameSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// Guardian schema
const guardianSchema = z.object({
  fatherName: z.string(),
  fatherContact: z.number(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContact: z.number(),
  motherOccupation: z.string(),
});

// Local guardian schema
const localGuardianSchema = z.object({
  name: z.string(),
  contact: z.number(),
  occupation: z.string(),
  address: z.string(),
});

// Main student schema
const studentSchema = z.object({
  id: z.string(),
  password: z.string(),
  name: studentNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
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
  guardian: guardianSchema,
  isActive: z.enum(['active', 'inActive']),
  localGuardian: localGuardianSchema,
  isDeleted: z.boolean(),
});

export default studentSchema;
