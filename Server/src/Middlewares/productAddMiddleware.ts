import { NextFunction, Request, Response } from "express";
import { storeProductData } from "../Models/productModel";

export async function handleProductAddFormData(req: Request, res: Response, next: NextFunction) {
  const result = await storeProductData(req.body);
  if (result.success) {
    res.locals.productId = result.productId;
    next();
  } else if (result.productError) {
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
