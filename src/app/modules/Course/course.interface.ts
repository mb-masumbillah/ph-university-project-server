import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  isDeleted: Types.ObjectId;
  course: Types.ObjectId;
  idDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
};
