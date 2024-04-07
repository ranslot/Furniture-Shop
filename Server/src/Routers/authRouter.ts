import express from "express";
import { userRegister } from "../Controllers/userController";
import {
  checkAuthenticate,
  checkNotAuthenticated,
  loginValidate,
  registerValidate,
} from "../Middlewares/authMiddleware";
import { handlePassportAuthentication, handlePassportLogout } from "../Utils/passport";

const authRouter = express.Router();

authRouter
  //Login
  .post("/login", checkNotAuthenticated, loginValidate, handlePassportAuthentication)
  .post("/logout", checkAuthenticate, handlePassportLogout)
  .post("/register", checkNotAuthenticated, registerValidate, userRegister);

export default authRouter;
