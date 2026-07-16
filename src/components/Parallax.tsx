"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps an image (or any content) so it drifts against the scroll for a parallax
 * effect. The inner layer is oversized and translated within an overflow-hidden
 * box, so edges never show. All instances share one scroll listener + rAF loop.
 */

type Item = { el: HTMLElement; speed: number };
const items = new Set<Item>();
let raf = 0;
let bound = false;

function tick() {
  raf = 0;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  for (const { el, speed } of items) {
    const box = el.parentElement;
    if (!box) continue;
    const r = box.getBoundingClientRect();
    // p: -1 (entering from bottom) → 0 (centred) → 1 (exited past top)
    let p = (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2);
    p = p < -1 ? -1 : p > 1 ? 1 : p;
    el.style.transform = `translate3d(0, ${(p * r.height * speed).toFixed(1)}px, 0)`;
  }
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function ensureBound() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

export function Parallax({
  speed = 0.12,
  className = "",
  innerClassName = "",
  children,
}: {
  speed?: number;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureBound();
    const item: Item = { el, speed };
    items.add(item);
    onScroll();
    return () => {
      items.delete(item);
    };
  }, [speed]);

  return (
    // caller supplies the positioning context (`relative` or `absolute inset-0`)
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className={`absolute will-change-transform ${innerClassName}`}
        // oversize vertically only — horizontal expansion is not needed for the
        // translateY movement and would cause images to appear zoomed in
        style={{
          top: `${-(speed * 130)}%`,
          bottom: `${-(speed * 130)}%`,
          left: 0,
          right: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
