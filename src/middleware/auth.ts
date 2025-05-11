/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../app/Error/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { TuserRole } from '../app/modules/user/user.interface';
import { User } from '../app/modules/user/user.model';

/* 
    আমি যদি এই interface এ customRequest বানাই তাহলে এই customRequest টাকে catchAsync এর মধ্যে req:Request এর জায়গায়  req:customRequest দিতে হবে । তাই interface folder এ আমরা index.d.ts নামে file এ declare global এ user টাকে req এর ভিতরে  add করে দিছি ।  আমরা এখন যে কোনো controller এ req.user লিখে console.log(req.user) করি তাহলে আমরা এই jwt এর decoded এ থাকা data টা পেয়ে যাবো । 
*/

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

export const auth = (...requredRoles: TuserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    // check if the token is valid - system - 1
    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(
    //         StatusCodes.UNAUTHORIZED,
    //         'You are not Authorized',
    //       );
    //     }

    //     const role = (decoded as JwtPayload)?.role;

    //     if (requredRoles && !requredRoles.includes(role)) {
    //       throw new AppError(
    //         StatusCodes.UNAUTHORIZED,
    //         'You are not Authorized',
    //       );
    //     }

    //     req.user = decoded as JwtPayload;

    //     next();
    //   },
    // );


    // check if the token is valid - system - 2
   
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
    }
    
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    // ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomID(userId);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This userr is not found');
    }

    // checking if the use is already deleted

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted');
    }
    // checking if the user is blocked
    const userStatus = user?.status;
    if (!userStatus) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
    }

    // token change
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    // role checking
    if (requredRoles && !requredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }
    req.user = decoded as JwtPayload;

    next();
  });
};
