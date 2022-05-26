import { Application } from "express";
import IErrorMiddleWare from "./middlewares/errors/IErrorMiddleWare";


export default interface IServer{
    PORT: string;
    NODE_ENV: string;

    errorMiddleware:IErrorMiddleWare;

    app:Application;
    run(): void;
    config(): void;
    applyMiddlewares(): void;
}