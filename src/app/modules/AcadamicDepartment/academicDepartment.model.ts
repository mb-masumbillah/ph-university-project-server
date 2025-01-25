import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AppError } from '../../Error/AppError';
import { StatusCodes } from 'http-status-codes';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// ----> exist ডাটা কে unique করার জন্য manually validation ==> system - 2

academicDepartmentSchema.pre('save', async function (next) {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Department is already exist');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  // console.log(query._id)
  const isExistDepartment = await AcademicDepartment.findOne(query._id);
  if (!isExistDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'department dose not update because wrong id !');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
