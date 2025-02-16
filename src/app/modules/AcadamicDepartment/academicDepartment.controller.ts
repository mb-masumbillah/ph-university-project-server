import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { academicDepartmentService } from './academicDepartmentService';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic department added successfull',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getAllAcademicDepartmentIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic department successfull',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic department single data get successfull',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {id} = req.params;
  const query = req.body;
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    id,
    query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'academic department update successfull',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
