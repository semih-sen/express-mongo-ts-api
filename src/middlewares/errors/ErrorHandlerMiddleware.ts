import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../../helpers/error/CustomError";
import ErrorLogger from "../../helpers/log/loggers/ErrorLogger";
import ILogger from "../../helpers/log/ILogger";
import IErrorMiddleWare from "./IErrorMiddleWare";
import IMiddleware from "../IMiddleware";

export default class ErrorHandlerMiddleware
  implements IMiddleware, IErrorMiddleWare
{
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let customError: CustomError = err;
    if (err.name === "ValidationError") {
      customError.status = 400;
    }
    const errorLogger: ILogger = new ErrorLogger();
    errorLogger.log(
      `${new Date().toString()} - ${customError.status} - ${
        customError.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.status(customError.status || 500).json({
      message: customError.message,
      success: false,
    });
  }
}
