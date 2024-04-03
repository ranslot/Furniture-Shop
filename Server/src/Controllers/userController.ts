import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
} from "../Models/userModel";
import { z } from "zod";
import { hash } from "bcrypt";

type User = {
  name: string;
  email: string;
  password: string;
};

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be longer than 8 character" }),
});

export function index(response: Response) {
  return response.send(getAllUsers());
}

export function show(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(getUserById(id));
}

//register
export async function store(request: Request, response: Response) {
  const data = request.body;

  return response.json(storeUser<User>(data));
}

export async function update(request: Request, response: Response) {
  const result = registerSchema.safeParse(request.body);

  if (result.success) {
    const { name, email, password } = result.data;
    const hashPassword = await hash(password, 10);
    return response.json(updateUser({ name, email, password: hashPassword }));
  }

  const error = result.error.format();
  return response.json({
    errors: {
      name: error.name?._errors,
      email: error.email?._errors,
      password: error.password?._errors,
    },
  });
}

export function destroy(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(deleteUser(id));
}
