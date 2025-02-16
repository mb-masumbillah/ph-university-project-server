import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic semester create successfull',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic semester get successfull',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic semester get successfull',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const {id} = req.params;
  const updateData = req.body;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    updateData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic semester get successfull',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
