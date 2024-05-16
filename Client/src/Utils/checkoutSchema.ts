import * as z from "zod";

export const userAddressSchema = z.object({
  id: z.number().int(), // Assuming 'serial' is an auto-incrementing integer
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  phoneNumber: z.string().min(1).max(20),
  addressLine: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  district: z.string().min(1).max(255),
  subdistrict: z.string().min(1).max(255),
  postalCode: z.string().min(1).max(20),
  userId: z.number().int(),
});
