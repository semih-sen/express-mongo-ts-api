import { RequestHandler, Response } from "express";
import IAuthHelper from "../../helpers/auth/IAuthHelper";
import { IUser } from "../../models/User";
import IController from "../IController";

export default interface IAuthController extends IController {
  authHelper: IAuthHelper;
  
  login: RequestHandler;
  register: RequestHandler;
  logout: RequestHandler;
  forgotPassword: RequestHandler;
  resetPassword: RequestHandler;
  sendTokenToClient(staff: IUser, res: Response, status: number): Response;
}
