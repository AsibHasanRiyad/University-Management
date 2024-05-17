import { Student } from './student.interface';
import { Schema, model, connect } from 'mongoose';

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  emergencyContactNumber: { type: Number, required: true },
  profileImage: { type: String },
  bloodGroup: [
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
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: {
    fatherName: { type: String },
    fatherContact: { type: Number },
    fatherOccupation: { type: String },
    motherName: { type: String },
    motherContact: { type: Number },
    motherOccupation: { type: String },
  },
  isActive: ['active', 'inActive'],
});
