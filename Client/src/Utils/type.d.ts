declare type User = {
  email: string;
  password: string;
  id: number;
  name: string;
  isAdmin?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
};

declare type Product = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  productImage: string[];
  description?: string | null;
};
