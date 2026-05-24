import { useSyncExternalStore } from "react";
import type { Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };
type State = { items: CartItem[]; wishlist: string[]; cartOpen: boolean };

let state: State = { items: [], wishlist: [], cartOpen: false };
const listeners = new Set<() => void>();

function emit() { listeners.forEach((l) => l()); }
function set(next: Partial<State>) { state = { ...state, ...next }; emit(); }

export const cart = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  get() { return state; },
  add(p: Product, qty = 1) {
    const items = [...state.items];
    const idx = items.findIndex((i) => i.product.id === p.id);
    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty };
    else items.push({ product: p, qty });
    set({ items, cartOpen: true });
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id);
    set({ items: state.items.map((i) => i.product.id === id ? { ...i, qty } : i) });
  },
  remove(id: string) { set({ items: state.items.filter((i) => i.product.id !== id) }); },
  toggleWish(id: string) {
    set({ wishlist: state.wishlist.includes(id) ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id] });
  },
  openCart(open: boolean) { set({ cartOpen: open }); },
};

export function useCart() {
  return useSyncExternalStore(cart.subscribe, cart.get, cart.get);
}
