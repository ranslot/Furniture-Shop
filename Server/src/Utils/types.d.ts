declare namespace Express {
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
  }
  interface Locals {
    imgNames: string[];
    perm: boolean;
  }
}

declare type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean | null;
  createdAt: Date | null;
  modifiedAt: Date | null;
};

declare type UserRegister = Pick<User, "name" | "email" | "password">;

declare type Product = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  productImage: Express.Multer.File[];
  description?: string | null;
};
