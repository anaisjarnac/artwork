"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartItem = {
  id: string | number;
  nom: string;
  prix: number;
  qty: number;
};

type AddItemPayload = Omit<CartItem, "qty"> & { qty?: number };

type CartContextType = {
  items: CartItem[];
  addItem: (item: AddItemPayload) => void;
  removeItem: (id: string | number) => void;
  updateQty: (id: string | number, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      // ignore and return empty
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (item: AddItemPayload) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + (item.qty ?? 1) } : p
        );
      }
      return [
        ...prev,
        { ...(item as Omit<CartItem, "qty">), qty: item.qty ?? 1 } as CartItem,
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string | number) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id: string | number, qty: number) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.prix, 0),
    [items]
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    count,
    total,
    isOpen,
    open,
    close,
    toggle,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
