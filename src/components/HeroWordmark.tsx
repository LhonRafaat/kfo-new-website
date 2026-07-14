"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/icons";

// Rotating hero identity — the mark + word slide up together every few seconds.
const WORDS = ["KURDISTAN FILM COMMISSION", "CREATIVE KURDISTAN", "KURDISTAN FILM FUND"];
const HOLD_MS = 2800;
const SLIDE_MS = 700;

export function HeroWordmark() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // A duplicate of the first row at the end makes the loop seamless.
  const items = [...WORDS, WORDS[0]];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => i + 1), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index === WORDS.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, SLIDE_MS);
      return () => clearTimeout(t);
    }
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [index, animate]);

  return (
    <span className="block h-9 overflow-hidden sm:h-12 md:h-14">
      <span
        className="block will-change-transform"
        style={{
          transform: `translateY(-${(index * 100) / items.length}%)`,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.76, 0, 0.24, 1)` : "none",
        }}
      >
        {items.map((word, i) => (
          <span
            key={i}
            className="flex h-9 items-center justify-center gap-3 sm:h-12 sm:gap-4 md:h-14"
          >
            <LogoMark className="h-6 w-[46px] shrink-0 drop-shadow-sm sm:h-8 sm:w-[62px] md:h-9 md:w-[69px]" />
            <span className="whitespace-nowrap">{word}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
