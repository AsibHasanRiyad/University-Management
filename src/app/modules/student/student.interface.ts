import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherContact: number;
  fatherOccupation: string;
  motherName: string;
  motherContact: number;
  motherOccupation: string;
};
export interface Student {
  id: number;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNumber: number;
  emergencyContactNumber: number;
  avatar?: string;
  bloodGroup?:
    | 'A'
    | 'A+'
    | 'A-'
    | 'B'
    | 'B+'
    | 'B-'
    | 'AB'
    | 'AB+'
    | 'AB-'
    | 'O'
    | 'O+'
    | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
}
