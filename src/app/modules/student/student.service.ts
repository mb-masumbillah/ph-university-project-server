// <-----------------------Third. service file create ------------------------->

import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentIntoDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentIntoDB = async (id: string) => {
  const studentId = {
    id: id,
  };
  // console.log(studentId);
  const result = await StudentModel.findOne(studentId);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
};
