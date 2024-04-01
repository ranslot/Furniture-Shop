import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
} from "../Models/userModel";

type User = {
  name: string;
  email: string;
  password: string;
};

export function index(response: Response) {
  return response.send(getAllUsers());
}

export function show(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(getUserById(id));
}

export function store(request: Request, response: Response) {
  const data: User = request.body;
  return response.send(storeUser<User>(data));
}

export function update(request: Request, response: Response) {
  const data: User = request.body;
  return response.send(updateUser<User>(data));
}

export function destroy(request: Request, response: Response) {
  const id = request.body.id;
  return response.send(deleteUser(id));
}
