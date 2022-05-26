import IServer from "./IServer";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index";
import connectDatabase from "./helpers/database/connectDatabase";
import helmet from "helmet";
import IErrorMiddleWare from "./middlewares/errors/IErrorMiddleWare";
import ErrorHandlerMiddleware from "./middlewares/errors/ErrorHandlerMiddleware";

export default class Server implements IServer {
  PORT: string;
  NODE_ENV: string;

  constructor() {
    this.config();
    this.PORT = process.env.PORT as string;
    this.NODE_ENV = process.env.NODE_ENV as string;
  }

  app: express.Application = express();

  errorMiddleware: IErrorMiddleWare = new ErrorHandlerMiddleware();

  config() {
    dotenv.config({
      path: "src/config/env/config.env",
    });
  }

  applyMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use("/api", router);
   

    this.app.use(this.errorMiddleware.errorHandler);
  }

  run() {
    connectDatabase();

    this.applyMiddlewares();

    this.app.listen(this.PORT, () => {
      console.log(
        `App started on ${this.PORT} and environment is ${this.NODE_ENV}`
      );
    });
  }
}
