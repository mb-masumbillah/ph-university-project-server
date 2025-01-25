import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // ----> exist ডাটা কে unique করার জন্য manually validation ==> system - 1

  // const isExistDepartment = await AcademicDepartment.findOne({
  //   name: payload.name,
  // });

  // if (isExistDepartment) {
  //   throw new AppError(StatusCodes.NOT_FOUND,'Department is already exist !');
  // }

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
};
