import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

/**
 * Italic-serif call-to-action with the signature orange underline used across
 * the site (View all database, Read full message, Read all news …).
 */
export function AccentLink({
  href,
  children,
  showArrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`accent-link ${className}`}>
      <span>{children}</span>
      {showArrow && <ArrowRight className="arrow h-4 w-4" />}
    </Link>
  );
}
