import mongoose from 'mongoose';
import QueryBuilder from '../../Builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../Error/AppError';
import { StatusCodes } from 'http-status-codes';

const createCoursesIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCoursesIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...basicCourseInfo } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // update basic info
    const updateBasicInfo = await Course.findByIdAndUpdate(
      id,
      basicCourseInfo,
      {
        session,
        new: true,
        runValidators: true,
      },
    );

    if (!updateBasicInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course');
    }

    // filter out the delete fields
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      // deletedPreRequisiteCourses
      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!deletedPreRequisiteCourse) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update Course');
      }

      const updatePreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );
      // updatePreRequisiteCourses
      const updatePreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: updatePreRequisite } },
        },
        { session, new: true, runValidators: true },
      );
      if (!updatePreRequisiteCourse) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'failed to update ');
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const deleteCoursesFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true },
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};
const removeFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCoursesIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCoursesIntoDB,
  deleteCoursesFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseIntoDB,
};
