import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { AppError } from '../../Error/AppError';
import { TAcademicSemester } from '../AcadamicSemester/acadamicSemester.interface';
import { AcademicSemester } from '../AcadamicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

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
    await AcademicSemester.findOne(payload.admissionSemester);

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

export const userService = {
  createUserIntoDB,
};
