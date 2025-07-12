// src/context/CartContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

/* ────────── Types ────────── */
export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type CartItem = Product & { quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  total: number;
  isOpen: boolean;
  toggle: () => void;
};

/* ────────── Context ────────── */
const CartContext = createContext<CartCtx | null>(null);

/* ────────── Provider ────────── */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // SSR‑safe: empty on server, hydrate in browser
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /* Load cart from localStorage once in the browser */
  useEffect(() => {
    const stored: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(stored);
  }, []);

  /* Write cart to localStorage whenever it changes */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  /* ────────── Helpers ────────── */
  const add = useCallback((p: Product) => {
    setItems(prev => {
      const found = prev.find(i => i.id === p.id);
      return found
        ? prev.map(i =>
            i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...p, quantity: 1 }];
    });
    setIsOpen(true); // open drawer when item added
  }, []);

  const inc = useCallback((id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const dec = useCallback((id: number) => {
    setItems(prev =>
      prev.flatMap(i =>
        i.id === id
          ? i.quantity > 1
            ? [{ ...i, quantity: i.quantity - 1 }]
            : [] // remove if quantity drops to 0
          : [i]
      )
    );
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const toggle = () => setIsOpen(o => !o);

 
  return (
    <CartContext.Provider
      value={{ items, add, inc, dec, total, isOpen, toggle }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
