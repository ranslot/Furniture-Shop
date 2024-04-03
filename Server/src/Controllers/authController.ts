//Token stuff
import * as jwt from "jsonwebtoken";
import { getUserByEmail } from "../Models/userModel";
import { Request, Response } from "express";
import { compare } from "bcrypt";
import { z } from "zod";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

type UserLogin = {
  email: string;
  password: string;
};

//validator
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be longer than 8 character" }),
});

//login
export async function logIn(request: Request, response: Response) {
  const result = loginSchema.safeParse(request.body);

  if (result.success) {
    const user = await getUserByEmail(result.data.email);
    if (user.length === 0) {
      return response.json({ errors: { email: "Email not found" } });
    }

    const passwordMatches = await compare(
      result.data.password,
      user[0].password
    );
    if (!passwordMatches) {
      return response.json({ errors: { password: "Password not found" } });
    }

    const genToken = jwt.sign(user[0], JWT_SECRET, { expiresIn: "15m" });
    return response
      .cookie("jwt", genToken, { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({
        success: { msg: "Login Success", user: user[0] },
      });
  }

  const error = result.error.format();
  return response.json({
    errors: { email: error.email?._errors, password: error.password?._errors },
  });
}

//logout
export function logOut(token: string) {
  // return deleteUserToken(token);
}
