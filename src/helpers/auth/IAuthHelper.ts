import { Request } from "express";
import IUserForLoginDto from "../../models/dtos/IUserForLoginDto";
import IUserForRegisterDto from "../../models/dtos/IUserForRegisterDto";
import IHelper from "../IHelper";

export default interface IAuthHelper extends IHelper {
  isTokenIncluded(req: Request): boolean;
  getAccessTokenFromHeader(req: Request): string;
  validateUserInputForRegister(user:IUserForRegisterDto):string
  validateUserInputForLogin(user:IUserForLoginDto):string
  matchPassword(password: string, confirm: string): boolean;
  checkPassword(password: string, hashedPassword: string): boolean;
}
