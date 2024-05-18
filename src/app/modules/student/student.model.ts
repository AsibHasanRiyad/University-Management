import { Guardian, LocalGuardian, Name, Student } from './student.interface';
import { Schema, model, connect } from 'mongoose';

// name Schema
const studentNameSchema = new Schema<Name>({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required'] },
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
  id: { type: String, required: [true, 'Id is required'] },
  name: {
    type: studentNameSchema,
    required: [true, ' Name Field is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required'] },
  emergencyContactNumber: {
    type: Number,
    required: [true, 'Emergency contact is required'],
  },
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
    required: [true, 'Guardian is required'],
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required'],
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
