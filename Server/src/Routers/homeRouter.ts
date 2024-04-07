import express, { Request, Response } from "express";
import { checkAuthenticate } from "../Middlewares/authMiddleware";

const homeRouter = express.Router();

homeRouter.get("/", checkAuthenticate, (req: Request, res: Response) => {
  if (!req.user || !res.locals.perm) {
    return res.json();
  }
  if (req.user && req.user.isAdmin) {
    return res.json(res.locals.user);
  }
  return res.json(req.user);
});

export default homeRouter;
