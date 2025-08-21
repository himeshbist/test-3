import { cn } from "../../lib/utils";

/**
 * Accessible form label
 */
export default function Label({ className, ...props }) {
  return (
    <label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}