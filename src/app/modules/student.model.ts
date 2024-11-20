// <----------- second. import from interface file and model file make -------------->

import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

// 2. Create a { <-- Schema --> } corresponding to the document interface.

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, require: true },
  middleName: { type: String },
  lastName: { type: String, require: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, require: true },
  fatherOccupation: { type: String, require: true },
  fatherContactNo: { type: String, require: true },
  motherName: { type: String, require: true },
  motherOccupation: { type: String, require: true },
  motherContactNo: { type: String, require: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, require: true },
  contact: { type: String, require: true },
  occupation: { type: String, require: true },
  address: { type: String, require: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'inActive'],
});

// 3. Create a {<-- Model -->}.

export const StudentModel = model<Student>('Student', studentSchema);
