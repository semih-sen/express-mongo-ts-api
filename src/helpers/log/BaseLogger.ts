import ILogger from "./ILogger";
import LogType from "./LogType";
import LogConfigurator from "./configurators/LogConfigurater";
export default class BaseLogger extends LogConfigurator implements ILogger {
  _logType: LogType;
  constructor(logType: LogType) {
    super();
    this._logType = logType;
  }

  log(message: string) {
    if (this._logType === LogType.Error) {
      this.errorLogger.error(message);
    } else if (this._logType === LogType.Debug) {
      this.debugLogger.debug(message);
    } else if (this._logType === LogType.Info) {
      this.debugLogger.info(message);
    } else if (this._logType === LogType.Warn) {
      this.debugLogger.warn(message);
    }
  }
}
