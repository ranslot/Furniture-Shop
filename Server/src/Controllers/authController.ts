//Token stuff
import * as jwt from "jsonwebtoken";
import { getUserByEmail } from "../Models/userModel";
import { Request, Response } from "express";
import { compare } from "bcrypt";
import { z } from "zod";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

//validator
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be longer than 8 character" }),
});

//login
export async function authLogin(request: Request, response: Response) {
  const result = loginSchema.safeParse(request.body);

  if (result.success) {
    const user = await getUserByEmail(result.data.email);
    if (user.length === 0) {
      return response.json({
        success: false,
        email: "Incorrect email.",
      });
    }

    const passwordMatches = await compare(result.data.password, user[0].password);
    if (!passwordMatches) {
      return response.json({
        success: false,
        password: "Incorrect password.",
      });
    }

    // const accessToken = jwt.sign(user[0], JWT_SECRET, { expiresIn: "7d" });
    // return response
    //   .cookie("jwt", accessToken, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //   })
    //   .status(200)
    //   .json({});
    return response.json({
      success: true,
      user: user[0],
    });
  }

  const error = result.error.format();
  return response.json({
    success: false,
    email: error.email?._errors,
    password: error.password?._errors,
  });
}

//logout
export function authLogout(response: Response) {
  return response
    .clearCookie("jwt", {
      httpOnly: true,
    })
    .status(200)
    .json({});
}
