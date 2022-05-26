import winston, { LoggerOptions } from "winston";
import ILogConfigurator from "./ILogConfigurator";

const File = winston.transports.File;

export default class LogConfigurator implements ILogConfigurator {
   debugLogConfig: LoggerOptions = {
    format: winston.format.json(),
    transports: [
      new File({
        level: "debug",
        filename: "log/debug.log",
      }),
    ],
  };
  infoLogConfig: LoggerOptions = {
    format: winston.format.json(),
    transports: [
      new File({
        level: "info",
        filename: "log/info.log",
      }),
    ],
  };
  warnLogConfig: LoggerOptions = {
    format: winston.format.json(),
    transports: [
      new File({
        level: "debug",
        filename: "log/warn.log",
      }),
    ],
  };
  errorLogConfig: LoggerOptions = {
    format: winston.format.json(),
    transports: [
      new File({
        level: "debug",
        filename: "log/error.log",
      }),
    ],
  };
  debugLogger=winston.createLogger(this.debugLogConfig);
  infoLogger=winston.createLogger(this.infoLogConfig);
  warnLogger=winston.createLogger(this.warnLogConfig);
  errorLogger=winston.createLogger(this.errorLogConfig);
}
