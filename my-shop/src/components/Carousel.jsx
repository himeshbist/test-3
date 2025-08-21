import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import SmartImage from "./SmartImage";

/**
 * Accessible, auto-playing Carousel for hero sections.
 * - Keyboard: arrow left/right to navigate
 * - Auto-play with pause on hover/focus
 * - Dots to jump to a slide
 */
export default function Carousel({
  slides = [],
  interval = 4500,
  className,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = (i) => setIndex((i + total) % total);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [interval, paused, total]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  if (!total) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card shadow-soft",
        className
      )}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative min-w-full h-[260px] sm:h-[360px] lg:h-[460px] select-none"
            aria-hidden={i !== index}
          >
         <SmartImage
                    src={s.image}
                    alt={s.alt ?? s.title ?? "Slide"}
                    loading="eager"
                    sizes="100vw"
                    className="absolute inset-0 h-full w-full"
                    imgClassName="object-cover"
                />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent" />
            <div className="relative z-10 h-full w-full p-6 md:p-10 flex flex-col justify-end gap-3 text-white">
              {s.kicker ? (
                <span className="text-xs md:text-sm uppercase tracking-wider opacity-90">
                  {s.kicker}
                </span>
              ) : null}
              {s.title ? (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight drop-shadow">
                  {s.title}
                </h2>
              ) : null}
              {s.subtitle ? (
                <p className="max-w-2xl text-sm md:text-base text-white/90 drop-shadow">
                  {s.subtitle}
                </p>
              ) : null}
              {s.ctaTo ? (
                <div className="mt-2">
                  <Button asChild size="lg">
                    <Link to={s.ctaTo}>{s.ctaLabel ?? "Learn more"}</Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Prev/Next controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-white/70",
              i === index ? "bg-white" : "bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}