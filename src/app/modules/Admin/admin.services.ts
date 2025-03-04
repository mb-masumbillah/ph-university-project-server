/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../Builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';
import { AppError } from '../../Error/AppError';
import { User } from '../user/user.model';
import { TAdmin } from './admin.interface';
import mongoose from 'mongoose';

const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .pagination()
    .sort()
    .fields();

  const result = adminQuery.modelQuery;
  return result;
};

const getSingleIntoDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const AdminService = {
  getAllAdminIntoDB,
  getSingleIntoDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
