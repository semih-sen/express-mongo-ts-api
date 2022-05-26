import { NextFunction, Request, RequestHandler, Response } from "express";
import AuthHelper from "../../helpers/auth/AuthHelper";
import IAuthHelper from "../../helpers/auth/IAuthHelper";
import CustomError from "../../helpers/error/CustomError";
import IAuthMiddleware from "./IAuthMiddleware";
import jwt from "jsonwebtoken";
import JwtPayloadType from "../../types/JwtPayloadType";
import asyncHandler from "express-async-handler";
import User from "../../models/User";
import IUserForRegisterDto from "../../models/dtos/IUserForRegisterDto";

export default class AuthHandlerMiddleware implements IAuthMiddleware {
  authHelper: IAuthHelper = new AuthHelper();

  constructor() {
    this.getAccessToRoute = this.getAccessToRoute.bind(this);
  }

  userExists = asyncHandler(async (req, res, next) => {
    const userForRegister: IUserForRegisterDto =
      req.body as IUserForRegisterDto;
    const user = await User.findOne({ email: userForRegister.email });
    if (user == null) {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
  });

  getAccessToRoute = (req: Request, res: Response, next: NextFunction) => {
    if (!this.authHelper.isTokenIncluded(req)) {
      return next(
        new CustomError("You are not authorized to access this route", 403)
      );
    }
    const accessToken = this.authHelper.getAccessTokenFromHeader(req);

    jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY as string,
      (err, decodedToken) => {
        if (err)
          return next(
            new CustomError("You are not authorized to access this route", 401)
          );
        const payload: jwt.JwtPayload & JwtPayloadType = decodedToken as any;
        req.user = {
          id: payload.id,
          name: payload.name,
        };
        next();
      }
    );
  };
}
