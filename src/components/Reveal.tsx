"use client";

import {
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useInView } from "@/lib/useInView";

/**
 * Slides its content up + fades it in the first time it scrolls into view.
 * Renders the element type given by `as` (so headings stay headings).
 */
export function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  });

  return createElement(
    as,
    {
      ref,
      className: `reveal ${inView ? "is-in" : ""} ${className}`,
      style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
