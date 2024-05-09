import { create } from "zustand";

type CartState = {
  products: {
    product: Product;
    amount: number;
  }[];
  addToCart: (product: Product, amount: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>()((set, get) => ({
  products: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (product: Product, amount: number) => {
    const prod = { product: product, amount: amount };
    let updatedCart = [];
    let productExisted = false;

    get().products.forEach((p) => {
      if (p.product.productId === prod.product.productId) {
        p.amount++;
        productExisted = true;
      }
    });

    if (productExisted) {
      updatedCart = get().products;
    } else {
      updatedCart = [...get().products, prod];
    }

    set({ products: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ products: [] });
    localStorage.removeItem("cart");
  },
}));

export default useCartStore;
