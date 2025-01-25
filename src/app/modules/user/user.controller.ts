
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

export const userController = {
  createUser,
};
