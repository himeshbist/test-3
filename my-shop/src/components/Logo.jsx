import { cn } from "../lib/utils";

/**
 * Classy, minimal brand mark (shopping bag outline) + wordmark.
 * - Monochrome, scalable, looks great on light/dark backgrounds
 * - Uses currentColor so it adapts to text color
 * - withWordmark: show/hide the "MyShop" text
 */
export default function Logo({
  size = 28,
  withWordmark = true,
  className = "",
  markClassName = "text-foreground",
  wordmarkClassName = "text-foreground",
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark size={size} className={markClassName} />
      {withWordmark && (
        <span
          className={cn(
            "select-none font-semibold tracking-tight",
            "text-[17px] leading-none md:text-[18px]",
            wordmarkClassName
          )}
        >
          MyShop
        </span>
      )}
    </span>
  );
}

function BrandMark({ size = 28, className = "" }) {
  // A refined bag outline with rounded corners + handle curve
  // Stroke-based, crisp at small sizes, adapts to currentColor
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="MyShop logo"
      className={cn("shrink-0", className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Bag body */}
        <rect x="7.5" y="11.5" width="17" height="15" rx="5.5" />
        {/* Handle curve */}
        <path d="M12 12c0-3 2.4-5 4-5s4 2 4 5" />
        {/* Subtle base detail for a premium feel */}
        <path d="M10 23.5h12" opacity="0.45" />
      </g>
    </svg>
  );
}