import { Request, Response } from "express";
import { storeProduct } from "../Models/productModel";
import { PostgresError } from "postgres";

export async function handleProductAdd(req: Request, res: Response) {
  try {
    await storeProduct(req.body, res.locals.imgNames);
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    if (error instanceof PostgresError && error.constraint_name === "user_sku_unique") {
      return res.json({
        success: false,
        errors: {
          sku: "SKU already existed.",
        },
      });
    } else {
      return res.json({
        success: false,
        errors: {
          root: "Add Product failed. Please try again.",
        },
      });
    }
  }
}
