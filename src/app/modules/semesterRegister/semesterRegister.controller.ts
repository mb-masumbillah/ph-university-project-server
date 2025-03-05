import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { semesterRegisterServices } from './semesterRegister.service';

const createSemesterRegister = catchAsync(async (req, res) => {
  const result = await semesterRegisterServices.createSemesterRegisterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester Register is Create Successfully',
    data: result,
  });
});

const getAllSemesterRegister = catchAsync(async (req, res) => {
  const result =
    await semesterRegisterServices.getAllSemesterRegistrationsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester Register is all data get Successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSemesterRegister = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegisterServices.getSingleSemesterRegistrationsFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'semester register single get successfully',
    data: result,
  });
});

const updateSemesterRegister = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semesterRegisterServices.updateSemesterRegisterFromDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'semester Register Updated successfull',
    data: result,
  });
});
const deleteSemesterRegistration = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await semesterRegisterServices.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  },
);
export const semesterRegisterController = {
  createSemesterRegister,
  getAllSemesterRegister,
  getSingleSemesterRegister,
  updateSemesterRegister,
  deleteSemesterRegistration
};
