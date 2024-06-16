import mongoose, { Schema, model } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constant';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    faculty: { type: Schema.Types.ObjectId, required: true, ref: 'Faculty' },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [
      {
        type: String,
        enum: Days,
        required: true,
      },
    ],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);

export default OfferedCourse;
