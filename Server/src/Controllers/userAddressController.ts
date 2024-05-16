import { Request, Response } from "express";
import { getAddressByUserId } from "../Models/userAddressModel";

export async function handleShowUserAddress(req: Request, res: Response) {
  const result = await getAddressByUserId(+req.params.id);
  return res.json(result);
}
