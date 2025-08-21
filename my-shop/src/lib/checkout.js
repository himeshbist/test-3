const KEY = "checkout-items";

/**
 * Start a checkout flow.
 * items: array of { id, title, price, image, qty }
 * source: "single" | "cart" to know whether to clear cart after purchase
 */
export function startCheckout(items, source = "single") {
  sessionStorage.setItem(
    KEY,
    JSON.stringify({
      items,
      source,
      startedAt: Date.now(),
    })
  );
}

export function loadCheckout() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearCheckout() {
  sessionStorage.removeItem(KEY);
}