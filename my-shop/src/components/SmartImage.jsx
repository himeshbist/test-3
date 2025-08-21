import { useState, useMemo } from "react";
import { cn } from "../lib/utils";

/**
 * SmartImage
 * - Handles slow/failed image loads with a classy placeholder fallback
 * - Adds a subtle fade-in once loaded
 * - Works for cards, hero banners, and thumbnails
 */
export default function SmartImage({
    src,
    alt = "",
    className = "",
    imgClassName = "",
    fallbackSrc,
    loading = "lazy",
    sizes,
    ...rest
}) {
    const [errored, setErrored] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Lightweight inline SVG fallback (no network needed)
    const defaultFallback = useMemo(() => {
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='#f3f4f6'/>
          <stop offset='100%' stop-color='#e5e7eb'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <g fill='#9ca3af' font-family='system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial' font-size='28'>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text>
      </g>
    </svg>`;
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }, []);

    const finalFallback = fallbackSrc || defaultFallback;

    return (
        <div className={cn("relative overflow-hidden bg-muted", className)} {...rest}>
            <img
                src={errored ? finalFallback : src}
                alt={alt}
                loading={loading}
                sizes={sizes}
                onLoad={() => setLoaded(true)}
                onError={() => setErrored(true)}
                className={cn(
                    "h-full w-full object-cover transition-opacity duration-300",
                    loaded ? "opacity-100" : "opacity-0",
                    imgClassName
                )}
                draggable="false"
            />
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
            )}
        </div>
    );
}