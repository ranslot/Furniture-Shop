import express, { Request, Response } from "express";
import { checkAuthenticate } from "../Middlewares/authMiddleware";

const homeRouter = express.Router();

homeRouter.get("/", checkAuthenticate, (req: Request, res: Response) => {
  if (!req.user || !res.locals.perm) {
    return res.json();
  }

  return res.json(req.user);
});

export default homeRouter;
