import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { courseRoute } from '../modules/course/course.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
