import SMTPTransport from "nodemailer/lib/smtp-transport";
import MailDataType from "../../types/MailDataType";
import IMailHelper from "./IMailHelper";
import nodeMailer from "nodemailer";
import CustomError from "../error/CustomError";

export default class MailHelper implements IMailHelper {
  constructor() {}

  async send(data: MailDataType): Promise<SMTPTransport.SentMessageInfo> {
    let username: string = process.env.USERNAME as string;
    let password: string = process.env.PASSWORD as string;
  

    let transport = nodeMailer.createTransport({
      service: "Hotmail",
      auth: {
        user: username,
        pass: password,
      },  
    });
    try {
      let message: any = {
        from: username,
        ...data,
      };
      return await transport.sendMail(message);
    } catch (error) {
      throw new CustomError(
        "An error occurred while sending mail. This is error detail => " +
          (error as Error).message,
        500
      );
    }
  }
}
