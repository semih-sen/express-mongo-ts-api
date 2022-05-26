import { Request } from "express";
import IAuthHelper from "./IAuthHelper";
import _ from "underscore";
import bcrypt from "bcryptjs";
import IUserForLoginDto from "../../models/dtos/IUserForLoginDto";
import IUserForRegisterDto from "../../models/dtos/IUserForRegisterDto";

export default class AuthHelper implements IAuthHelper {
  
  isTokenIncluded(req: Request): boolean {
    if (req.headers.authorization) {
      return (
        _.has(req.headers, "authorization") &&
        req.headers.authorization.startsWith("Bearer:")
      );
    }
    return false;
  }

  getAccessTokenFromHeader(req: Request): string {
    const authorization = req.headers.authorization as string;

    const accessToken = authorization.split(" ")[1];
    return accessToken;
  }

  validateUserInputForLogin = (user: IUserForLoginDto) =>
    user.email && user.password;
  validateUserInputForRegister = (user: IUserForRegisterDto) =>
    user.email && user.password && user.firstName && user.lastName;
  matchPassword = (password: string, confirm: string) => password === confirm;

  checkPassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };
}
