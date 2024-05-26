import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';

const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
  },
  endMonth: {
    type: String,
    enum: Months,
  },
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
