import { Request, Response, NextFunction } from "express";
import morgan from "morgan";

const customFormat =
  ":remote-addr :method :url :status :res[content-length] - :response-time ms";
export const loggerMiddleware = morgan(customFormat);

export const errorLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${error.message}`);

  next(error);
};
