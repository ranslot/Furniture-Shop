declare type User = {
  email: string;
  password: string;
  id: number;
  name: string;
  isAdmin?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
};

declare interface Product {
  productId: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  description?: string | null;
}

declare interface ProductShow extends Product {
  createdAt: Date;
  modifiedAt: Date;
  productImage: string[];
  category: string;
}
