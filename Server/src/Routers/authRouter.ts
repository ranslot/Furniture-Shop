import express, { Request, Response } from "express";
import { logIn, logOut } from "../Controllers/authController";

const authRouter = express.Router();

authRouter
  .post("/login", async (request: Request, response: Response) => {
    logIn(request, response);
  })
  .post("/logout", async (response: Response) => {
    logOut(response);
  })
  .post("/register", async (request: Request, response: Response) => {
    return response.send("register post");
  });

export default authRouter;
