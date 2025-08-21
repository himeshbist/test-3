import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { productsById } from "../data/products";

/**
 * Cart item structure: { id: string, title, price, image, qty }
 * We store a snapshot of product fields for stable display and to reduce lookups.
 */
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("cart-v1", []);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, 99) };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: Math.min(qty, 99),
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, 99)) } : i))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const enrichedItems = useMemo(
    () =>
      items.map((i) => {
        // Try to enrich with latest product data if available
        const latest = productsById[i.id];
        return {
          ...i,
          price: latest?.price ?? i.price,
          title: latest?.title ?? i.title,
          image: latest?.image ?? i.image,
        };
      }),
    [items]
  );

  const value = {
    items: enrichedItems,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}