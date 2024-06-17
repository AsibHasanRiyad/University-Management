import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const timeComparisonRefinement = (data: any) => {
  const [startHour, startMinute] = data.startTime.split(':').map(Number);
  const [endHour, endMinute] = data.endTime.split(':').map(Number);

  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  //

  if (endTime <= startTime) {
    throw new Error('endTime must be greater than startTime');
  }
  return true;
};

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z
        .string()
        .regex(timeRegex, 'Invalid time format, should be HH:MM'),
      endTime: z
        .string()
        .regex(timeRegex, 'Invalid time format, should be HH:MM'),
    })
    .refine(timeComparisonRefinement, {
      message: 'endTime must be greater than startTime',
      path: ['endTime'],
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string().optional(),
      maxCapacity: z.number().optional(),
      days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
      startTime: z
        .string()
        .regex(timeRegex, 'Invalid time format, should be HH:MM')
        .optional(),
      endTime: z
        .string()
        .regex(timeRegex, 'Invalid time format, should be HH:MM')
        .optional(),
    })
    .refine(
      (data) => {
        if (data.startTime && data.endTime) {
          return timeComparisonRefinement(data);
        }
        return true;
      },
      {
        message: 'endTime must be greater than startTime',
        path: ['endTime'],
      },
    ),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
