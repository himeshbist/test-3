import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Wishlist stores just product IDs.
 */
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage("wishlist-v1", []);

  const toggle = (id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const remove = (id) => setIds((prev) => prev.filter((x) => x !== id));

  const value = {
    ids,
    isFavorite: (id) => ids.includes(id),
    toggle,
    remove,
    count: ids.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}