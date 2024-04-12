import { Request, Response } from "express";
import { storeProductData, storeProductImg } from "../Models/productModel";

export async function handleProductImg(req: Request, res: Response) {
  const result = await storeProductImg(res.locals.imgNames, res.locals.productId);
  if (result.success) {
    return res.json({ success: true });
  }
  if (result.productImgError) {
    return res.json({
      success: false,
      errors: {
        sku: "Add Product Images failed.",
      },
    });
  } else {
    return res.json({
      success: false,
      errors: {
        root: "Add Product Images failed. Please try again.",
      },
    });
  }
}
