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
  clearCart: () => void;
}

// Load from localStorage
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("ktex-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("ktex-cart", JSON.stringify(items));
  } catch {}
}

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  items: loadCart(),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...state.items, item];
      }
      saveCart(newItems);
      return { items: newItems };
    }),
  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      saveCart(newItems);
      return { items: newItems };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems = state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      saveCart(newItems);
      return { items: newItems };
    }),
  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },
}));
