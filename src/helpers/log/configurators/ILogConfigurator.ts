import { Logger, LoggerOptions } from "winston";

export default interface ILogConfigurator {
  debugLogConfig: LoggerOptions;
  infoLogConfig: LoggerOptions;
  warnLogConfig: LoggerOptions;
  errorLogConfig: LoggerOptions;
  debugLogger: Logger;
  infoLogger: Logger;
  warnLogger: Logger;
  errorLogger: Logger;
}
