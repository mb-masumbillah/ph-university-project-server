// <-----------------------Third. service file create ------------------------->

import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../Error/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   // <-----------build in static method ------------->

//   // if (await Student.isUserExists(studentData.id)) {
//   //   throw new AppError(StatusCodes.NOT_FOUND,'User already Exist');
//   // }

//   // <-------------- build in static method ---------------->
//   const result = await Student.create(studentData);

//   // <------------- build in custom instance method ------------------->
//   // const student = new Student(studentData);
//   // if(await student.isUserExists(studentData.id)){
//   //   throw new AppError(StatusCodes.NOT_FOUND,"User already exist")
//   // }
//   // const result = student.save();

//   // console.log(result)
//   return result;
// };

const getAllStudentIntoDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentIntoDB = async (id: string) => {
  // const studentId = {
  //   id: id,
  // };

  // const result = await Student.findOne(studentId);

  // const result = await Student.aggregate([{ $match: { id: studentId.id } }]);
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentDB = async (id: string) => {
  const isExistStudent = await Student.findOne({ id: id });
  if (!isExistStudent) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'student data is not Exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian)) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true
  });
  return result;
};

export const StudentServices = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  deleteStudentDB,
  updateStudentIntoDB,
};
