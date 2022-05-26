import IAuthController from "./IAuthController";
import asyncHandler from "express-async-handler";
import CustomError from "../../helpers/error/CustomError";
import User, { IUser } from "../../models/User";
import express from "express";
import IAuthHelper from "../../helpers/auth/IAuthHelper";
import AuthHelper from "../../helpers/auth/AuthHelper";
import IUserForRegisterDto from "../../models/dtos/IUserForRegisterDto";
import IUserForLoginDto from "../../models/dtos/IUserForLoginDto";
import IMailHelper from "../../helpers/mail/IMailHelper";
import MailHelper from "../../helpers/mail/MailHelper";
export default class AuthController implements IAuthController {
  authHelper: IAuthHelper;
  mailHelper: IMailHelper;
  constructor() {
    this.authHelper = new AuthHelper();
    this.mailHelper = new MailHelper();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  forgotPassword = asyncHandler(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = (await User.findOne({ email: resetEmail })) as IUser;
    if (user == null) {
      next(new CustomError("User Not Found With That Email", 400));
    }
    const resetPasswordToken = user.getResetPasswordToken();
    user.save();
    const resetPasswordUrl = `http://localhost:8000/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
       <h3>Reset Your Password</h3>
        <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
        
    `;
    try {
      await this.mailHelper.send({
        to: resetEmail,
        subject: "Reset Password Token",
        html: emailTemplate,
      });
      res.status(200).json({
        success: true,
        message: "Email Sent",
        data: user,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      user.save();

      next(new CustomError("Email Could Not Be Sent", 500));
    }
  });

  register = asyncHandler(async (req, res, next) => {
    const userForRegister: IUserForRegisterDto =
      req.body as IUserForRegisterDto;

    const user = await User.create({
      ...userForRegister,
    });
    this.sendTokenToClient(user as IUser, res, 200);
  });

  login = asyncHandler(async (req, res, next) => {
    const userForLogin: IUserForLoginDto = req.body as IUserForLoginDto;
    if (!this.authHelper.validateUserInputForLogin(userForLogin)) {
      throw new CustomError("Please check your inputs", 400);
    }
    const user = await User.findOne({ email: userForLogin.email }).select(
      "+password"
    );
    const _user: IUser = user as IUser;
    if (
      !user ||
      !this.authHelper.checkPassword(userForLogin.password, _user.password)
    ) {
      throw new CustomError("Please check your credentials", 404);
    }

    this.sendTokenToClient(_user, res, 200);
  });

  logout = asyncHandler(async (req, res, next) => {
    const { NODE_ENV } = process.env;

    res
      .status(200)
      .cookie("token", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: !(NODE_ENV === "development"),
      })
      .json({
        success: true,
        message: "Successfully logged out",
      });
  });

  resetPassword = asyncHandler(async (req, res, next) => {
    const { resetPasswordToken } = req.query;
    const { password } = req.body;

    if (!resetPasswordToken) {
      return next(new CustomError("Please provide a valid token", 400));
    }
    let user = (await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })) as IUser;

    if (user==null) {
      return next(new CustomError("Invalid Token or Session Expired", 404));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user = await user.save();

    this.sendTokenToClient(user, res, 200);
  });

  sendTokenToClient = (user: IUser, res: express.Response, status: number) => {
    // Get Token From User Model
    const token = user.getTokenFromUserModel();

    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

    // Send To Client With Res
    return res
      .status(status)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + parseInt(JWT_COOKIE_EXPIRE as string) * 1000 * 60
        ),
        secure: NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        token,
        data: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      });
  };
}
