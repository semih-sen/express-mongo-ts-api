import { model, Schema, Document, Model } from "mongoose";
import IModel from "./IModel";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import JwtPayloadType from "../types/JwtPayloadType";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  identityNumber: string;
  dateOfRegister: Date;
  password: string;
  getTokenFromUserModel(): string;
  getResetPasswordToken(): string;
  resetPasswordToken?: string;
  resetPasswordExpire?: number;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  dateOfRegister: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please provide a password"],
    select: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

UserSchema.methods.getTokenFromUserModel = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload: JwtPayloadType = {
    id: this._id,
    name: `${this.firstName} ${this.lastName}`,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY as jwt.Secret, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

UserSchema.methods.getResetPasswordToken = function () {
  const randomHexString = crypto.randomBytes(15).toString("hex");

  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire =
    Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE!);

  return resetPasswordToken;
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

export default model<IModel | IUser>("User", UserSchema);
