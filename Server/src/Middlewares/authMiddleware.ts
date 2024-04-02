import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.HASH_KEY as string;

export function authStatus(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.body.token;

  if (!token) {
    next();
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    response.locals.user = user;
    next();
  } catch (error) {
    next();
  }
}
