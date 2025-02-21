import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { AppError } from '../../Error/AppError';
import { TAcademicSemester } from '../AcadamicSemester/acadamicSemester.interface';
import { AcademicSemester } from '../AcadamicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartment } from '../AcadamicDepartment/academicDepartment.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

const createUserIntoDB = async (password: string, payload: TStudent) => {
  const isExistUser = await Student.findOne({ email: payload?.email });
  if (isExistUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Student data is Exist');
  }

  //   const user: NewUser = {};
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);

  // set Student role
  userData.role = 'student';

  // manually generate id
  // userData.id = '2030100001';

  const academicSemester: TAcademicSemester | null =
    await AcademicSemester.findById(payload.admissionSemester);

  if (academicSemester === null) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(academicSemester);

    // create user (transaction-1)
    const newUser = await User.create([userData], { session }); // befor was object but now it arrary

    if (!newUser.length) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Failed to create user');
    }

    //set id , _id as  userData
    payload.id = newUser[0].id; // embeding id
    payload.user = newUser[0]._id; // reference _id

    // create user (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// Admin

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password || config.default_pass;
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUserData = await User.create([userData], { session });

    if (!newUserData.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'user create failed');
    }

    payload.id = newUserData[0].id;
    payload.user = newUserData[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Admin create failed !');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userService = {
  createUserIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
