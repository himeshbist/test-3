import { useEffect, useState } from "react";

/**
 * useLocalStorage - Persist a value to localStorage with a given key.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (storage full, privacy mode, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}