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
    enum: ['Autumn', 'Summer', 'Fall'],
  },
  year: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: ['01', '02', '03'],
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
