import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check
      // if everything all right next()

      // zod library validation checking
     await schema.parseAsync({ body: req.body });
        next()
    } catch (error) {
      next(error);
    }
  };
};

export default validationRequest;
