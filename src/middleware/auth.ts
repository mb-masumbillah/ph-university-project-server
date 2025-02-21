import { StatusCodes } from 'http-status-codes';
import { AppError } from '../app/Error/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';

/* 
    আমি যদি এই interface এ customRequest বানাই তাহলে এই customRequest টাকে catchAsync এর মধ্যে req:Request এর জায়গায়  req:customRequest দিতে হবে । তাই interface folder এ আমরা index.d.ts নামে file এ declare global এ user টাকে req এর ভিতরে  add করে দিছি ।  আমরা এখন যে কোনো controller এ req.user লিখে console.log(req.user) করি তাহলে আমরা এই jwt এর decoded এ থাকা data টা পেয়ে যাবো । 
*/

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not Authorized',
          );
        }

        req.user = decoded as JwtPayload;
        
        next();
      },
    );
  });
};
