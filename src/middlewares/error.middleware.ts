import { NextFunction, Request, Response } from 'express';
import { ExceptionesError } from '../Errors/exceptiones.error';



export const ErrorMiddleware = (error: ExceptionesError, req: Request, res: Response, next: NextFunction) => {

  try {
    const status: number = error.statusError || 500;
    const message: string = error.message || 'Something went wrong';
    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });

  } catch (error) {
    next(error);
  }
};
