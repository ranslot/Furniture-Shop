import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
} from "../Models/userModel";
import { hash } from "bcrypt";
import { PostgresError } from "postgres";

export function index(res: Response) {
  return res.send(getAllUsers());
}

export function show(req: Request, res: Response) {
  const id = req.body.id;
  return res.send(getUserById(id));
}

export async function update(req: Request, res: Response) {
  const data = req.body;

  // return res.json(storeUser<User>(data));
}

//register
export async function handleUserRegister(req: Request, res: Response) {
  const { name, email, password } = req.body as User & { password: string };
  const hashPassword = await hash(password, 10);
  try {
    await storeUser({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    //not an unique Email
    if (
      err instanceof PostgresError &&
      err.constraint_name === "user_email_unique"
    ) {
      return res.json({
        success: false,
        errors: {
          email: "Email already existed.",
        },
      });
    } else {
      //unknown error
      return res.json({
        success: false,
        errors: {
          root: "Register failed. Please try again.",
        },
      });
    }
  }
}

export function destroy(req: Request, res: Response) {
  const id = req.body.id;
  return res.send(deleteUser(id));
}
