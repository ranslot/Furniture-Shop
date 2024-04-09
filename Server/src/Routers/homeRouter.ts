import express, { Request, Response } from "express";
import { checkAuthenticate } from "../Middlewares/authMiddleware";

const homeRouter = express.Router();

homeRouter.get("/", checkAuthenticate, (req: Request, res: Response) => {
  if (!req.user || !res.locals.perm) {
    return res.json({ isUser: false });
  }

  return res.json({ user: req.user, isUser: true });
});

export default homeRouter;
