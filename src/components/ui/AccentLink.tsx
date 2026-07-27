"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Underline } from "@/components/icons";

/**
 * Italic-serif call-to-action with the signature orange underline used across
 * the site (View all database, Read full message, Read all news …).
 * The underline draws itself in the first time the link scrolls into view.
 */
export function AccentLink({
  href,
  children,
  showArrow = false,
  className = "",
  underlineClassName = "",
}: {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
  /** Controls the underline's length/thickness, e.g. "w-32" or "w-full". */
  underlineClassName?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Low threshold so the line starts drawing as soon as the link shows up,
      // not only once it's 70% visible (which read as "animating late").
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={`accent-link ${visible ? "is-visible" : ""} ${className}`}
    >
      <div className="flex flex-col">
        <span>{children}</span>
        <Underline className={underlineClassName} />
      </div>
      {showArrow && <ArrowRight className="arrow h-4 w-4" />}
    </Link>
  );
}
