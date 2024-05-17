import { Schema, model, connect } from 'mongoose';

// guardian type
export type Guardian = {
  fatherName: string;
  fatherContact: number;
  fatherOccupation: string;
  motherName: string;
  motherContact: number;
  motherOccupation: string;
};
// name type
export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
// local Guardian
export type LocalGuardian = {
  name: string;
  contact: number;
  occupation: string;
  address: string;
};
export interface Student {
  id: string;
  name: Name;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNumber: number;
  emergencyContactNumber: number;
  profileImage?: string;
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
  isActive: 'active' | 'inActive';
  localGuardian: LocalGuardian;
}
