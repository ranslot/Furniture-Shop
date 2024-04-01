import { NextFunction, Request, Response } from "express";
import { getUserByToken } from "../Models/userModel";

export async function authStatus(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.body.token;
  if (!token) {
    return response.sendStatus(403);
  }

  const user = await getUserByToken(token);
  if (user.length === 0) {
    return response.sendStatus(403);
  }

  //Send to next middleware
  response.locals = user[0];

  return next();
}
