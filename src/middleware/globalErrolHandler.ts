/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { TErrorSources } from '../app/interface/global_interface';
import config from '../app/config';
import handleZodError from '../app/Error/HandleValidationZodError_1';
import handleValidationError from '../app/Error/HandleValidationMongooseError_2';
import handleConstError from '../app/Error/HandleMongooesCastError_3';
import handleDuplicateError from '../app/Error/handleDuplicateError';
import { AppError } from '../app/Error/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): void => {
  let statusCode = 500;
  let message = 'something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleConstError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.errorResponse?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
    
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: error,
    stack: config.NODE_ENV === 'development' ? error.stack : null,
  });
};

export default globalErrorHandler;

/*
    => Error Pattern
      - success
      - message
      - errorSources:[
          path: "",
         message: ""
        ]
      - stack
*/
