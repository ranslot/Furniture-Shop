import { NextFunction, Request, Response } from "express";
import {
  getAllProducts,
  storeProductData,
  storeProductImg,
} from "../Models/productModel";

export async function handleProductAddFormData(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function handleProductImg(req: Request, res: Response) {
  const result = await storeProductImg(
    res.locals.imgNames,
    res.locals.productId
  );
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

export async function handleProductIndex(req: Request, res: Response) {
  const result = await getAllProducts();
  return res.json(result);
}
