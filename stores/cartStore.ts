// Cart state is intentionally not persisted.
// This project focuses on UI and state management for demonstration purposes.

import { create } from 'zustand'

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

/* Pure helper functions */
const calculateSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const calculateTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

/* Store types */
interface CartState {
  items: CartItem[];
  totalItems:  number;
  subtotal:  number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  subtotal: 0,
  totalItems: 0,

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);

      const items = existing
        ? state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.items, item];

      return {
        items,
        subtotal: calculateSubtotal(items),
        totalItems: calculateTotalItems(items),
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id);

      return {
        items,
        subtotal: calculateSubtotal(items),
        totalItems: calculateTotalItems(items),
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );

      return {
        items,
        subtotal: calculateSubtotal(items),
        totalItems: calculateTotalItems(items),
      };
    }),

  clearCart: () =>
  set({
    items: [],
    subtotal: 0,
    totalItems: 0,
  }),
}));