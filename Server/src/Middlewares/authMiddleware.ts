import { NextFunction, Request, Response } from "express";

export function checkAuthenticate(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    res.locals.perm = true;
    return next();
  }
  return next();
}
export function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  return next();
}
export function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ success: false, errors: { root: "Not Authorized" } });
}
