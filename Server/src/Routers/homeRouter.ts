import express, { Request, Response } from "express";
import { checkAuthenticate } from "../Middlewares/authMiddleware";

const homeRouter = express.Router();

homeRouter.get("/", checkAuthenticate, async (request: Request, response: Response) => {
  if (!response.locals.user) {
    return response.json({ role: "Guest" });
  }
  if (response.locals.user.isAdmin) {
    return response.json({ role: "Admin" });
  }
  return response.json({ role: "User" });
});

export default homeRouter;
