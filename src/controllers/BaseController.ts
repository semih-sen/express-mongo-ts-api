import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import IBasicController from "./IBasicController";
import IModel from "../models/IModel";
import _ from "underscore";
import ControllerInfo from "../../types/ControllerInfo";

class BaseController implements IBasicController {

  info:ControllerInfo={
    name: "BaseController",
    version: "1.0.0",
  }

  _model: mongoose.Model<IModel>;

  constructor(model: mongoose.Model<IModel>) {
    this._model = model;
    this.getList = this.getList.bind(this);
    this.getById = this.getById.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  getList = asyncHandler(async (req, res, next) => {
    let objects =
      req.query === {}
        ? await this._model.find({})
        : await this._model.find({ ...req.query });
    res.status(200).json({
      success: true,
      message: "List of objects",
      data: objects,
    });
  });

  getById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const object = await this._model.findById(id);
      res.status(200).json({
        success: true,
       data: object,
      });
    }
  );

  add = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let body = req.body;

      let model = await this._model.create({
        ...body,
      });
      res.status(200).json({
        success: true,
       data: model,
      });
    }
  );

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const body = req.body;
      let model = (await this._model.findById(id)) as IModel &
        any &
        mongoose.Document<any, any, IModel>;
      let keys = _.keys(body);
      for (let i: number = 0; i < keys.length; i++) {
        model[keys[i]] = body[keys[i]];
      }
      await model.save();
      res.status(200).json({
        success: true,
       data: model,
      });
    }
  );

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let id = req.params.id;
      let model = await this._model.findByIdAndRemove(id);
      res.status(200).json({
        success: true,
       data: model,
      });
    }
  );
  
}
export default BaseController;
