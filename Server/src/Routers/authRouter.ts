import express, { Request, Response } from "express";

const authRouter = express.Router();

authRouter
  .get("/", async (request: Request, response: Response) => {
    return response.send("login");
  })
  .post("/", async (request: Request, response: Response) => {
    return response.send("login post");
  })
  .get("/register", async (request: Request, response: Response) => {
    return response.send("register");
  })
  .post("/register", async (request: Request, response: Response) => {
    return response.send("register post");
  });

export default authRouter;
