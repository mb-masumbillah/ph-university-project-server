// <----------- second. import from interface file and model file make -------------->

import { model, Schema } from 'mongoose';
import {
  StudentModel,
  // StudentMethods,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';

// 2. Create a { <-- Schema --> } corresponding to the document interface.

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    // build in validation
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'Name can not be more then 20 characters'],
    // custom validation
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    // validate library use
    validate: {
      validator: function (value) {
        // npm validator package use
        return validator.isAlpha(value);
      },
      message: '{VALUE} is invalid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required.'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required.'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
  },
  contact: {
    type: String,
    required: [true, 'Local guardian contact is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
});

// <-------------- for instance method -------------->
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({

// <-----------------for static method ------------------->
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          'your data {VALUE} . Gender must be either male, female, or other.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is invalid email please valid email',
      },
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  // for virtual
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//             <------------- virtual -------------->
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// // <-------------pre save middleware / hook -------------->
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook : we will save to data');

//   // hasing password save into DB
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

// // <----------------- post  save middleware / hook ---------------->
// studentSchema.post('save', function (doc, next) {
//   // console.log(this, 'post hook: we saved our data');
//   doc.password = ' ';
//   next();
// });

studentSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

//[{ $match: { isDelete: { $en: true } } }, { '$match': { id: '12345' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});


// <-----------------for static method ------------------->
studentSchema.statics.isUserExists = async function (id) {
  const existUser = await Student.findOne({ id });
  return existUser;
};

// <---------- creating a custom "instance" method  ----------------->
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

// 3. Create a {<-- Model -->}.
// export const Student = model<TStudent>('Student', studentSchema);

// <-----------------for static method ------------------->
export const Student = model<TStudent, StudentModel>('Student', studentSchema);

// <-------------- for instance method -------------->
// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
