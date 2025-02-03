import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';

const handleConstError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR | 500;
  const errorSources: TErrorSources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleConstError;
