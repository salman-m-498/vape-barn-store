"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/lib/products";

export type CartLine = {
  slug: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "vapebarn-cart";

export function lineTotal(slug: string, qty: number) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return 0;
  return product.price * qty;
}

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.slug === "string" && typeof l.qty === "number" && l.qty > 0,
    );
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {}
}

let snapshot: CartLine[] = [];
const listeners = new Set<() => void>();
let initialized = false;

// Stable server snapshot reference to avoid useSyncExternalStore infinite loops.
const EMPTY_SNAPSHOT: CartLine[] = [];

function init() {
  if (initialized) return;
  initialized = true;
  snapshot = readStorage();
}

function emit() {
  writeStorage(snapshot);
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  init();
  return snapshot;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);

  const add = useCallback((slug: string, qty = 1) => {
    const existing = snapshot.find((l) => l.slug === slug);
    snapshot = existing
      ? snapshot.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
      : [...snapshot, { slug, qty }];
    emit();
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    snapshot =
      qty <= 0
        ? snapshot.filter((l) => l.slug !== slug)
        : snapshot.map((l) => (l.slug === slug ? { ...l, qty } : l));
    emit();
  }, []);

  const remove = useCallback((slug: string) => {
    snapshot = snapshot.filter((l) => l.slug !== slug);
    emit();
  }, []);

  const clear = useCallback(() => {
    snapshot = [];
    emit();
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + lineTotal(l.slug, l.qty), 0);
    return { lines, count, subtotal, add, setQty, remove, clear };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
