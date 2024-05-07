import { create } from "zustand";

type CartState = {
  products: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>()((set, get) => ({
  products: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (product: Product) => {
    const updatedCart = [...get().products, product];
    set({ products: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ products: [] });
    localStorage.removeItem("cart");
  },
}));

export default useCartStore;
