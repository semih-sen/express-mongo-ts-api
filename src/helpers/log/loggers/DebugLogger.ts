import BaseLogger from "../BaseLogger";
import ILogger from "../ILogger"
import LogType from "../LogType";
export default class DebugLogger extends BaseLogger implements ILogger{
    constructor(){
        super(LogType.Debug);
    }
}