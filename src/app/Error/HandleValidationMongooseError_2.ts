import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR || 500;

  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'ValidationError',
    errorSources,
  };
};

export default handleValidationError;
