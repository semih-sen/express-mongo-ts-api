import { RequestHandler } from "express";
import ControllerInfo from "../../types/ControllerInfo";
import IController from "./IController";

export default interface IBasicController extends IController {
  info:ControllerInfo;
  getList: RequestHandler;
  getById: RequestHandler;
  add: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}
