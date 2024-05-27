import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { Months } from './academicSemester.const';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: ['Autumn', 'Summer', 'Fall'],
  },
  year: {
    type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semester already exists');
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
