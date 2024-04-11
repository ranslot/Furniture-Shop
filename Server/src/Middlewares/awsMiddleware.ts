import { NextFunction, Request, Response } from "express";

export function sendImageToS3(req: Request, res: Response, next: NextFunction) {
  console.log(req.files);
  return res.json({ success: true });
}
