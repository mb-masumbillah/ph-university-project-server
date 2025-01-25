import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// <-------------pre save middleware / hook -------------->
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save to data');

  // hasing password save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// <----------------- post  save middleware / hook ---------------->
// set " " ofter saving password

userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we saved our data');
  doc.password = ' ';
  next();
});

export const User = model<TUser>('User', userSchema);
