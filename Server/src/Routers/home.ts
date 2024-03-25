import express, { Request, Response } from "express";
import { qResult } from "../Controllers/test";

const homeRouter = express.Router();

homeRouter.get("/", (request: Request, response: Response) => {
  qResult(response);
});

export default homeRouter;
