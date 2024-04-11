import { Request, Response } from "express";
import { storeProduct } from "../Models/productModel";

export async function handleProductAdd(req: Request, res: Response) {
  await storeProduct(req.body);
  return res.json({ success: true });
}
