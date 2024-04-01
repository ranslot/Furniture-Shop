import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
} from "../Models/userModel";
import vine from "@vinejs/vine";

type User = {
  name: string;
  email: string;
  password: string;
};

//validator
const userSchema = vine.object({
  name: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});
const validator = vine.compile(userSchema);

export function index(response: Response) {
  return response.send(getAllUsers());
}

export function show(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(getUserById(id));
}

export async function store(request: Request, response: Response) {
  //validate data
  const data = await validator.validate(request.body);

  return response.send(storeUser<User>(data));
}

export async function update(request: Request, response: Response) {
  const data = await validator.validate(request.body);
  return response.send(updateUser<User>(data));
}

export function destroy(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(deleteUser(id));
}
