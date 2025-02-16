// <---------------------Fourth. Controller file create ---------------------->

import { StudentServices } from './student.service';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
// import studentValidationSchema from './student.joi.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // const student = req.body.student;
//     const { student: studentData } = req.body;

//     // Joi library validation checking
//     // const { error, value } = studentValidationSchema.validate(studentData);
//     // if (error) {
//     //   res.status(200).json({
//     //     success: true,
//     //     message: 'Student not validation',
//     //     data: error.details,
//     //   });
//     // }

//     // zod library validation checking
//     const zodParseData = studentZodSchema.parse(studentData);

//     // we call "service" funciton to send this data
//     const result = await StudentServices.createStudentIntoDB(zodParseData);

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created sucessfully',
//       data: result,
//     });
//   } catch (error) {
//     type N = {
//       message: string;
//     };

//     res.status(200).json({
//       success: true,
//       message: (error as N).message || 'something went wrong',
//       error: error,
//     });
//   }
// };

// ues higher order funciton

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentIntoDB(req.query);
  // console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student is recived successfull',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.getSingleStudentIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student is recived successfull',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.deleteStudentDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student is delete successfull',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student is update successfull',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
