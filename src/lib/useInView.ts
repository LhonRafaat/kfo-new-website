"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled into view (and stays true after).
 *
 * Belt and braces on purpose: an IntersectionObserver alone occasionally never
 * reports an element that was already on screen when it mounted — the entry can
 * land before layout settles — which leaves the content stuck at opacity 0
 * until a reload. The rAF rect check after first paint covers that case, and
 * because it runs a frame *after* mount the CSS transition still plays.
 */
/**
 * Shared trigger point for every scroll-driven fade on the site.
 *
 * The negative bottom margin pulls the trigger line ~12% of the viewport up
 * from the bottom edge, so an element has to be genuinely *inside* the frame
 * before it starts. With a 0px margin a tall block fired the moment its first
 * pixel row crossed the fold, and by the time it was actually readable the
 * animation had already finished — the reveal was spent off-screen.
 *
 * Kept modest on purpose: a high threshold (0.7 was tried once) makes long
 * blocks wait until they are most of the way up the screen, which reads as
 * animating late.
 */
export const REVEAL_TRIGGER = {
  threshold: 0.1,
  rootMargin: "0px 0px -12% 0px",
} as const;

export function useInView<T extends HTMLElement>({
  threshold = REVEAL_TRIGGER.threshold,
  rootMargin = REVEAL_TRIGGER.rootMargin,
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 0 && r.top < vh;
    };

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const raf = requestAnimationFrame(() => {
      if (onScreen()) setInView(true);
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}
