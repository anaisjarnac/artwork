"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartItem = {
  id: string | number;
  nom: string;
  prix: number; // en euros (number)
  qty: number;
};

type AddItemPayload = {
  id: string | number;
  nom: string;
  prix: number | string;
  qty?: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (p: AddItemPayload) => void;
  removeItem: (id: string | number, nom: string) => void;
  updateQty: (id: string | number, nom: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const normalizePrix = (p: number | string) => {
    if (typeof p === "number" && Number.isFinite(p)) return p;
    if (typeof p === "string") {
      const n = parseFloat(p.replace(",", "."));
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  const addItem = useCallback((payload: AddItemPayload) => {
    const payloadPrix = normalizePrix(payload.prix);
    const qtyToAdd =
      payload.qty && payload.qty > 0 ? Math.floor(payload.qty) : 1;

    setItems((prev) => {
      // Match by BOTH id AND nom to distinguish format variants (e.g., "KURT — A4" vs "KURT — toile")
      const idx = prev.findIndex(
        (i) => i.id === payload.id && i.nom === payload.nom
      );
      if (idx >= 0) {
        // increment qty
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qtyToAdd };
        return next;
      }
      // push new item
      return [
        ...prev,
        {
          id: payload.id,
          nom: payload.nom,
          prix: payloadPrix,
          qty: qtyToAdd,
        },
      ];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string | number, nom: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.nom === nom)));
  }, []);

  const updateQty = useCallback(
    (id: string | number, nom: string, qty: number) => {
      const q = Math.max(0, Math.floor(qty));
      setItems((prev) => {
        if (q === 0) return prev.filter((i) => !(i.id === id && i.nom === nom));
        return prev.map((i) =>
          i.id === id && i.nom === nom ? { ...i, qty: q } : i
        );
      });
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const total = useMemo(
    () => items.reduce((s, it) => s + Number(it.prix) * it.qty, 0),
    [items]
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
