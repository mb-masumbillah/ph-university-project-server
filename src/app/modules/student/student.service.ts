// <-----------------------Third. service file create ------------------------->

import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../Error/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../Builder/QueryBuilder';
import { searchFields } from './student.constant';

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

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  // এই খানে mongoose and condition use করে search,fields,sort,pagination কাজ করা হয়েছে ।

  // const objQuery = { ...query };

  // // searching
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchFields = ['email', 'name.firstName', 'presentAddress'];

  // const searchQuery = Student.find({
  //   $or: searchFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  // excludeFields.forEach((el) => delete objQuery[el]);

  // // console.log({ query }, { objQuery });

  // const filterQuery = searchQuery
  //   .find(objQuery)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // // sorting
  // let sort = '-createAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // limiting - pagination - skip
  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query?.limit) as number;
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = Number(page - 1) * limit;
  // }
  // // console.log({ skip }, { page }, { limit });

  // const paginationQuery = sortQuery.skip(skip);
  // const limitQuery = paginationQuery.limit(limit);

  // // field limiting
  // let fields = '-__v';

  // if (query?.fields) {
  //   fields = (query?.fields as string).split(',').join(' ');
  // }

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  // উপরের সব comment গুলার জন্য আমরা একটা class বানাইছি সেখানে সব গুলার কাজ করে পুরো code কে কমায় নিয়ে আসছি ।

  // এই খানে class use করে sort,search,filter,pagination fields এর কাজ করা হয়েছে ।
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleStudentIntoDB = async (id: string) => {
  // const studentId = {
  //   id: id,
  // };

  // const result = await Student.findById(studentId);

  // const result = await Student.aggregate([{ $match: { id: studentId.id } }]);

  const result = await Student.findById(id)
    .populate('user')
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
  const isExistStudent = await Student.findById(id);
  if (!isExistStudent) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'student data is not Exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Student');
    }

    const deleteUser = await User.findByIdAndUpdate(
      id,
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

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  deleteStudentDB,
  updateStudentIntoDB,
};
