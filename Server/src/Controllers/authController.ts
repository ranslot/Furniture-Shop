//Token stuff
import * as jwt from "jsonwebtoken";
import { getUserByEmail } from "../Models/userModel";
import { Request, Response } from "express";
import { compare } from "bcrypt";

const JWT_SECRET = process.env.HASH_KEY as string;

type UserLogin = {
  email: string;
  password: string;
};

//login
export async function logIn(request: Request, response: Response) {
  const { email, password } = request.body as UserLogin;

  /**
   *
   * validation here
   *
   */

  const user = await getUserByEmail(email);
  if (user.length === 0) {
    return response.json({ errors: { email: true } });
  }

  const passwordMatches = await compare(password, user[0].password);
  if (!passwordMatches) {
    return response.json({ errors: { password: true } });
  }

  const genToken = jwt.sign(user[0], JWT_SECRET);
  return response
    .status(200)
    .json({
      success: { msg: "Login Success", user: user[0], accessToken: genToken },
    });
}

//logout
export function logOut(token: string) {
  // return deleteUserToken(token);
}
