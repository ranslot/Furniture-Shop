import { Request, Response } from "express";
import { deleteUser, updateUserToken } from "../Models/userModel";

//login
export function logIn(token: string) {
  return updateUserToken(token);
}

//logout
export function logOut(token: string) {
  return deleteUser(token);
}
