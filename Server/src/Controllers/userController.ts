import { Request, Response } from "express";
import {
  UserRegister,
  deleteUser,
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
} from "../Models/userModel";
import { hash } from "bcrypt";
import { PostgresError } from "postgres";

export function index(response: Response) {
  return response.send(getAllUsers());
}

export function show(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(getUserById(id));
}

export async function update(request: Request, response: Response) {
  const data = request.body;

  // return response.json(storeUser<User>(data));
}

//register
export async function userRegister(request: Request, response: Response) {
  const { name, email, password } = request.body as UserRegister;
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

export function destroy(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(deleteUser(id));
}
