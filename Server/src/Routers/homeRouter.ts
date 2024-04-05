import express, { Request, Response } from "express";
import { checkAuthenticate } from "../Middlewares/authMiddleware";
const homeRouter = express.Router();

homeRouter.get("/", checkAuthenticate, async (request: Request, response: Response) => {
  if (!response.locals.user) {
    return response.json();
  }
  if (response.locals.user.isAdmin) {
    return response.json(response.locals.user);
  }
  return response.json(response.locals.user);
});

export default homeRouter;
