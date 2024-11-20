// <---------------------Fourth. Controller file create ---------------------->

import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // const student = req.body.student;
    const { student: studentData } = req.body;

    // we call "service" funciton to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (error) {
    // return error;
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentIntoDB();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'student is recived seccessfully',
      data: result,
    });
  } catch (error) {
    // return error;
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentIntoDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is recived successfull',
      data: result,
    });
  } catch (error) {
    // return error;
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
