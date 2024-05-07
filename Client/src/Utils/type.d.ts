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
  productImgs: string[];
  category: string;
  description?: string | null;
}

declare interface ProductShow extends Product {
  createdAt: Date;
  modifiedAt: Date;
}
