import { userService } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

// use higher order funciton
const createUser = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // we call "service" funciton to send this data
  const result = await userService.createUserIntoDB(password, studentData);

  // send response
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is created sucessfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  console.log(result)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createFaculty,
  createAdmin
};
