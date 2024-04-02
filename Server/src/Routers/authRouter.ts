import express, { Request, Response } from "express";
import { logIn } from "../Controllers/authController";

const authRouter = express.Router();

authRouter
  .get("/", async (request: Request, response: Response) => {
    return response.send("log in");
  })
  .post("/", async (request: Request, response: Response) => {
    console.log(request.body);
    logIn(request, response);
  })
  .get("/register", async (request: Request, response: Response) => {
    return response.send("register");
  })
  .post("/register", async (request: Request, response: Response) => {
    return response.send("register post");
  });

export default authRouter;
