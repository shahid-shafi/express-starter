import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { sendResponse } from '../utils/common';

const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  winston.error(err.message, err);
  sendResponse(res, 500, { status: false, message: err?.message });
};

export default globalErrorHandler;
