import { Router } from 'express';
import { StudentRoute } from '../app/modules/student/student.route';
import { UserRoute } from '../app/modules/user/user.route';
import { academicSemesterRouters } from '../app/modules/AcadamicSemester/academicSemester.router';
import { academicFacultyRouters } from '../app/modules/academicFaculty/academicFacultyRoute';
import { academicDepartmentRoute } from '../app/modules/AcadamicDepartment/academicDepartment.route';
import { CourseRouter } from '../app/modules/Course/course.route';
import { FacultyRoutes } from '../app/modules/Faculty/faculty.route';
import { AdminRouter } from '../app/modules/Admin/admin.route';
import { SemesterRegister } from '../app/modules/semesterRegister/semsterRegister.router';
import { offeredCourseRoutes } from '../app/modules/OfferedCourse/OfferedCourse.route';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../app/modules/EnrolledCourse/enrolledCourse.route';

const router = Router();

const moudleRoutes = [
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouters,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouters,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoute,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
  {
    path: '/semesterRegister',
    route: SemesterRegister,
  },
  {
    path: '/offered-course',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes ,
  },
  {
    path: "/enrolled-courses",
    route: EnrolledCourseRoutes
  }
];

moudleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
