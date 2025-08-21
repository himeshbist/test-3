import { cn } from "../../lib/utils";

/**
 * Simple badge component.
 */
export default function Badge({ children, className, variant = "default" }) {
  const base = "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold";
  const variants = {
    default: "bg-secondary text-secondary-foreground border-transparent",
    outline: "text-foreground",
  };
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}