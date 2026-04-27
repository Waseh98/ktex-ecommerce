import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  items: [
    {
      id: 1,
      name: "Charcoal Gold Zari Velvet Suit",
      price: "PKR 18,500",
      image: "/images/bestseller-1.png",
      quantity: 1,
      size: "M",
      color: "Charcoal"
    }
  ],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i))
  })),
}));
