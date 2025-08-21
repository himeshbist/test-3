import { cn } from "../../lib/utils";

/**
 * Horizontal separator
 */
export default function Separator({ className }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}