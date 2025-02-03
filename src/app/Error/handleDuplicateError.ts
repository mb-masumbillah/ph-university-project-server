import { StatusCodes } from 'http-status-codes';
import { TErrorSources, TGenericErrorResponse } from '../interface/global_interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR | 500;
  const match = error?.message.match(/name: "([^"]+)"/);
  const extracted_msg = match && match[1];
  const errorSources : TErrorSources = [
    {
      path: '',
      message: `/${extracted_msg}/ is exist`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicates are unacceptable.',
    errorSources
  };
};
export default handleDuplicateError;
