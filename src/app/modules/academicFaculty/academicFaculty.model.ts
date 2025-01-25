import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isExistFaculty = await AcademicFaculty.findOne({ name: this.name });
  if (isExistFaculty) {
    throw Error('Faculty is already exist');
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistFaculty = await AcademicFaculty.findOne(query);
  if (isExistFaculty) {
    throw Error('Faculty dose not Update because wrong id !');
  }
  next()
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
