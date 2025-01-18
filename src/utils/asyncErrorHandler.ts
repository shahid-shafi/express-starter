import { Request, Response, NextFunction } from "express";
import debug from "debug";
const log = debug("express");
type fxn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncErrorHandler = (fxn: fxn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      log(`${req.headers["user-agent"]} has access root URL`);
      await fxn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncErrorHandler;
