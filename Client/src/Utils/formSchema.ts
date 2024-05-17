import * as z from "zod";

const productOrderSchema = z.object({
  productId: z.number().int(),
  productAmount: z.number().int(),
});

export const userOrderSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  addressLine: z.string().min(1, { message: "Address line is required" }),
  city: z.string().min(1, { message: "City is required" }),
  district: z.string().min(1, { message: "District is required" }),
  subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  userId: z.number().int(),
  product: z.array(productOrderSchema),
  totalPrice: z.number().int(),
});

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productFormSchema = z.object({
  sku: z.string().min(1, { message: "Product SKU is required." }),
  name: z.string().min(1, { message: "Product name is required." }),
  category: z.string().min(1, { message: "Product category is required." }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .positive()
    .int()
    .min(1, { message: "Product price is required." }),
  quantity: z.coerce
    .number()
    .positive()
    .int()
    .min(1, { message: "Product quantity is required." }),
  productImage: z
    .custom<FileList>()
    .refine((files) => files.length <= MAX_IMAGES, {
      message: "You can't upload more than 5 images.",
    })
    .refine(
      (files) => {
        return Array.from(files ?? []).length !== 0;
      },
      { message: "Image is required." },
    )
    .refine(
      (files) => {
        return Array.from(files ?? []).every(
          (file) => file.size <= MAX_FILE_SIZE,
        );
      },
      { message: `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
    )
    .refine(
      (files) => {
        return Array.from(files ?? []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        );
      },
      { message: "Only .jpg, .jpeg, .png and .webp files are accepted." },
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be longer than 8 character." }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be longer than 8 character." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." })
      .min(8, { message: "Confirm Password must be longer than 8 character." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password not match.",
    path: ["confirmPassword"],
  });
