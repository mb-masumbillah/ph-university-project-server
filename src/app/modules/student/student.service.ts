// <-----------------------Third. service file create ------------------------->

import { Student } from './student.model';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   // <-----------build in static method ------------->

//   // if (await Student.isUserExists(studentData.id)) {
//   //   throw new AppError(StatusCodes.NOT_FOUND,'User already Exist');
//   // }

//   // <-------------- build in static method ---------------->
//   const result = await Student.create(studentData);

//   // <------------- build in custom instance method ------------------->
//   // const student = new Student(studentData);
//   // if(await student.isUserExists(studentData.id)){
//   //   throw new AppError(StatusCodes.NOT_FOUND,"User already exist")
//   // }
//   // const result = student.save();

//   // console.log(result)
//   return result;
// };

const getAllStudentIntoDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentIntoDB = async (id: string) => {
  // const studentId = {
  //   id: id,
  // };

  // const result = await Student.findOne(studentId);

  // const result = await Student.aggregate([{ $match: { id: studentId.id } }]);
  const result = await Student.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDelete: true });
  return result;
};

export const StudentServices = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  deleteStudentDB,
};
