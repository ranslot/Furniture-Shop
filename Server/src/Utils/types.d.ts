declare namespace Express {
  export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean | null;
  }
  interface Locals {
    imgNames: string[];
    productId: number;
    perm: boolean;
  }
}

declare type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean | null;
};

declare type Product = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  productImage: Express.Multer.File[];
  description?: string | null;
};
