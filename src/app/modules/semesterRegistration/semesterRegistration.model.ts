import { TSemesterRegistration } from './semesterRegistration.interface';
import mongoose from 'mongoose';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {},
);

export const semesterRegistrationModel = mongoose.model(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
