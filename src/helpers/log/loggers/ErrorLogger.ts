import BaseLogger from "../BaseLogger";
import ILogger from "../ILogger";
import LogType from "../LogType";
export default class ErrorLogger extends BaseLogger implements ILogger{
    constructor(){
        super(LogType.Error);
    }
}