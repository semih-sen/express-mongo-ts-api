import { RequestHandler } from "express";
import IAuthHelper from "../../helpers/auth/IAuthHelper";
import IMiddleware from "../IMiddleware";

export default interface IAuthMiddleware extends IMiddleware{
    getAccessToRoute:RequestHandler;
    userExists:RequestHandler;
    authHelper: IAuthHelper;
}