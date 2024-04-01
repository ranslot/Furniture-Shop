import express, { Request, Response } from "express";

const homeRouter = express.Router();

homeRouter.get("/", async (request: Request, response: Response) => {
  return response.send("It's working");
});

export default homeRouter;
