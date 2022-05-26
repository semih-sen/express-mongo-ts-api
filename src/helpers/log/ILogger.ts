import { LoggerOptions, Logger } from "winston";

export default interface ILogger {
  log(message: string): void;
  debugLogger: Logger;
  infoLogger: Logger;
  warnLogger: Logger;
  errorLogger: Logger;
}
