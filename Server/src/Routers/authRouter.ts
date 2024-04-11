import express from "express";
import { handleUserRegister } from "../Controllers/userController";
import { checkAuthenticate, checkNotAuthenticated } from "../Middlewares/authMiddleware";
import { loginValidate, registerValidate } from "../Middlewares/zodValidationMiddleware";
import { handlePassportAuthentication, handlePassportLogout } from "../Utils/passport";

const authRouter = express.Router();

authRouter
  //Login
  .post("/login", checkNotAuthenticated, loginValidate, handlePassportAuthentication)
  .post("/logout", checkAuthenticate, handlePassportLogout)
  .post("/register", checkNotAuthenticated, registerValidate, handleUserRegister);

export default authRouter;
