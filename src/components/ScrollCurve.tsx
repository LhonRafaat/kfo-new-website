"use client";

import { useEffect, useRef } from "react";

// Figma vector geometry. Kept inside this client module and selected by a string
// `variant` so no object crosses the server→client boundary (which would turn it
// into a client-reference proxy and drop viewBox/d).
const CURVES = {
  intro: {
    viewBox: "0 0 1281 440",
    d: "M0.0788769 209.16C295.865 123.379 576.702 -203.374 576.702 189.939C576.702 473.624 856.115 593.575 1280.4 123.379",
    reveal: "ltr" as const,
  },
  news: {
    viewBox: "0 0 1484 433",
    d: "M1483.92 227.527C1188.17 141.755 703.83 -210.643 703.83 182.629C703.83 466.284 424.446 586.223 0.210479 116.076",
    reveal: "rtl" as const,
  },
};

/**
 * Decorative flowing line that reveals itself as the section scrolls up through
 * the viewport, via a scroll-driven clip-path wipe applied directly to the SVG.
 * (No SVG path-length math — Chrome reports 0 length for these stretched paths.)
 */
export function ScrollCurve({
  variant,
  className = "",
}: {
  variant: keyof typeof CURVES;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const { viewBox, d, reveal } = CURVES[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // clip = percent of the box still hidden (100 → hidden, 0 → fully shown)
    const setClip = (clip: number) => {
      el.style.clipPath = reveal === "rtl" ? `inset(0 0 0 ${clip}%)` : `inset(0 ${clip}% 0 0)`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setClip(0);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Slow reveal over ~1.1 viewport heights, finishing while still on screen.
      const start = vh * 1.1;
      const end = vh * 0.0;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setClip((1 - progress) * 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reveal]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ clipPath: reveal === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
      aria-hidden
    >
      <path d={d} stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
