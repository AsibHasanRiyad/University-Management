import { Guardian, LocalGuardian, Name, Student } from './student.interface';
import { Schema, model, connect } from 'mongoose';

// name Schema
const studentNameSchema = new Schema<Name>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
// guardian Schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String },
  fatherContact: { type: Number },
  fatherOccupation: { type: String },
  motherName: { type: String },
  motherContact: { type: Number },
  motherOccupation: { type: String },
});
// local guardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  contact: { type: Number },
  occupation: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    type: studentNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  emergencyContactNumber: { type: Number, required: true },
  profileImage: { type: String },
  bloodGroup: {
    type: String,
    enum: [
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
    ],
  },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
