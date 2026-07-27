"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight, Underline } from "@/components/icons";
import { useInView } from "@/lib/useInView";

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
  // Same observer and trigger point as every other reveal on the page, so the
  // underline draws in step with the copy above it instead of on its own clock.
  const [ref, visible] = useInView<HTMLAnchorElement>();

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
