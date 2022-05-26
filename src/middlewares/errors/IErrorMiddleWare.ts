import { ErrorRequestHandler, NextFunction,Response,Request } from "express";
import IMiddleware from "../IMiddleware";

export default interface IErrorMiddleWare extends IMiddleware{
    errorHandler(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
      ):void;
}