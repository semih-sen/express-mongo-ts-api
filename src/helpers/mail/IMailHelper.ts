import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import MailDataType from "../../types/MailDataType";
import IHelper from "../IHelper";

export default interface IMailHelper extends IHelper{
    /*USERNAME: string;
    PASSWORD: string;
    transport: Transporter<SMTPTransport.SentMessageInfo>*/
    send(data:MailDataType): Promise<SMTPTransport.SentMessageInfo>;
}