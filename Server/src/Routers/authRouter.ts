import express, { Request, Response } from "express";
import { authLogin, authLogout } from "../Controllers/authController";
import { userRegister } from "../Controllers/userController";

const authRouter = express.Router();

authRouter
  .post("/login", async (request: Request, response: Response) => {
    authLogin(request, response);
  })
  .post("/logout", async (response: Response) => {
    authLogout(response);
  })
  .post("/register", async (request: Request, response: Response) => {
    userRegister(request, response);
  });

export default authRouter;
