import { Request, Response } from "express";
import { deleteUser, getAllUsers, getUserById, storeUser, updateUser } from "../Models/userModel";
import { z } from "zod";
import { hash } from "bcrypt";
import { PostgresError } from "postgres";

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

type RegisterFormFields = z.infer<typeof registerSchema>;
type User = Omit<RegisterFormFields, "confirmPassword">;

export function index(response: Response) {
  return response.send(getAllUsers());
}

export function show(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(getUserById(id));
}

//register
export async function update(request: Request, response: Response) {
  const data = request.body;

  // return response.json(storeUser<User>(data));
}

export async function userRegister(request: Request, response: Response) {
  const validation = registerSchema.safeParse(request.body);

  if (validation.success) {
    const { name, email, password } = validation.data;
    const hashPassword = await hash(password, 10);
    try {
      await storeUser({
        name: name,
        email: email,
        password: hashPassword,
      });
      return response.status(200).json({
        success: true,
      });
    } catch (err) {
      //not an unique Email
      if (err instanceof PostgresError && err.constraint_name === "user_email_unique") {
        return response.json({
          success: false,
          errors: {
            email: "Email already existed.",
          },
        });
      } else {
        //unknown error
        return response.json({
          success: false,
          errors: {
            root: "Register failed. Please try again.",
          },
        });
      }
    }
  }

  const error = validation.error.format();
  return response.json({
    success: false,
    errors: {
      errorName: error.name?._errors[0],
      errorEmail: error.email?._errors[0],
    },
  });
}

export function destroy(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(deleteUser(id));
}
