import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export function checkAuthenticate(request: Request, response: Response, next: NextFunction) {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    return next();
  }
  return next();
}
export function checkNotAuthenticated(request: Request, response: Response, next: NextFunction) {
  if (request.isAuthenticated()) {
    return response.sendStatus(403);
  }
  return next();
}

//Login validator
export function loginValidate(request: Request, response: Response, next: NextFunction) {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be longer than 8 character" }),
  });
  const result = loginSchema.safeParse(request.body);
  if (result.success) {
    next();
  } else {
    const error = result.error.format();
    return response.json({
      success: false,
      email: error.email?._errors,
      password: error.password?._errors,
    });
  }
}

export function registerValidate(request: Request, response: Response, next: NextFunction) {
  const registerSchema = z
    .object({
      name: z.string().min(1, { message: "Username is required" }),
      email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be longer than 8 character" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" })
        .min(8, { message: "Confirm Password must be longer than 8 character" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm Password don't match",
      path: ["confirmPassword"],
    });
  const validation = registerSchema.safeParse(request.body);

  if (validation.success) {
    next();
  } else {
    const error = validation.error.format();
    return response.json({
      success: false,
      errors: {
        errorName: error.name?._errors[0],
        errorEmail: error.email?._errors[0],
      },
    });
  }
}
