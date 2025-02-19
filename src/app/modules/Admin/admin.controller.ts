import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AdminService } from './admin.services';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminIntoDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'all date get succesfull',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getSingleIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'your single data get is successfull',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
};
