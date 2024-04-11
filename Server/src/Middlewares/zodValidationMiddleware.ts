import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function loginValidate(req: Request, res: Response, next: NextFunction) {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be longer than 8 character" }),
  });

  const result = loginSchema.safeParse(req.body);

  if (result.success) {
    next();
  } else {
    const error = result.error.format();
    return res.json({
      success: false,
      errors: {
        email: error.email?._errors,
        password: error.password?._errors,
      },
    });
  }
}

export function registerValidate(req: Request, res: Response, next: NextFunction) {
  const registerSchema = z
    .object({
      name: z.string().min(1, { message: "Username is required" }),
      email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be longer than 8 character" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" })
        .min(8, { message: "Confirm Password must be longer than 8 character" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm Password don't match",
      path: ["confirmPassword"],
    });

  const validation = registerSchema.safeParse(req.body);

  if (validation.success) {
    next();
  } else {
    const error = validation.error.format();
    return res.json({
      success: false,
      errors: {
        name: error.name?._errors[0],
        email: error.email?._errors[0],
        password: error.password?._errors[0],
        confirmPassword: error.confirmPassword?._errors[0],
      },
    });
  }
}

export function addProductValidate(req: Request, res: Response, next: NextFunction) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const productStoreSchema = z.object({
    sku: z.string().min(1, { message: "Product SKU is required." }),
    name: z.string().min(1, { message: "Product name is required." }),
    category: z.string(),
    description: z.string().optional(),
    price: z.coerce.number().positive().int().min(1, { message: "Product price is required." }),
    quantity: z.coerce.number().positive().int().min(1, { message: "Product quantity is required." }),
    productImage: z
      .custom<Express.Multer.File[]>()
      .refine(
        (files) => {
          return Array.from(files ?? []).length !== 0;
        },
        { message: "Image is required." }
      )
      .refine(
        (files) => {
          return Array.from(files ?? []).every((file) => file.size <= MAX_FILE_SIZE);
        },
        { message: `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` }
      )
      .refine(
        (files) => {
          return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype));
        },
        { message: "Only .jpg, .jpeg, .png and .webp files are accepted." }
      ),
  });

  const validation = productStoreSchema.safeParse({ ...req.body, productImage: req.files });

  if (validation.success) {
    next();
  } else {
    const error = validation.error.format();
    return res.json({
      success: false,
      errors: {
        sku: error.sku?._errors[0],
        name: error.name?._errors[0],
        category: error.category?._errors[0],
        price: error.price?._errors[0],
        quantity: error.quantity?._errors[0],
        productImage: error.productImage?._errors[0],
      },
    });
  }
}
