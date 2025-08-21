import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to conditionally join Tailwind classes while avoiding conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Currency formatter
 * Defaults to Indian Rupee and Indian numbering system.
 */
export function formatCurrency(value, currency = "INR", locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}