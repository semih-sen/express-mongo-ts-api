import express from "express";
import AuthController from "../controllers/auth/AuthController";
import IAuthController from "../controllers/auth/IAuthController";
import AuthHandlerMiddleware from "../middlewares/auth/AuthHandlerMiddleware";
import IAuthMiddleware from "../middlewares/auth/IAuthMiddleware";

const router: express.Router = express.Router();
const authController: IAuthController = new AuthController();
const authHandlerMiddleware: IAuthMiddleware = new AuthHandlerMiddleware();
router.post("/login", authController.login);
router.post(
  "/register",
  authHandlerMiddleware.userExists,
  authController.register
);
router.get("/logout", authController.logout);
router.put("/resetPassword",authController.resetPassword);
router.post("/forgotPassword", authController.forgotPassword);

export default router;
