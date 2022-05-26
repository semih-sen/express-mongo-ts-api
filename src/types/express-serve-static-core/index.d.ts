import JwtPayloadType from "../JwtPayloadType";

declare module 'express-serve-static-core' {
    interface Request {
      photo?: string;
      user?: JwtPayloadType;
    }
  }