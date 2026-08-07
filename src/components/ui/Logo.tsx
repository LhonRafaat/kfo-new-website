import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { LogoWordmark } from "@/components/LogoWordmark";

/**
 * Lockup: the framed-landscape mark plus the outlined wordmark logotype
 * (vector from Figma, not the live font). Colour is inherited (currentColor)
 * so it can sit on light or dark grounds.
 */
export function Logo({
  className = "",
  markClassName = "h-[25px] w-[48px]",
  wordmarkClassName = "h-[18px] w-auto",
  href = "/",
  siteName,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  href?: string;
  /** From Strapi's `global`; only used for the link's accessible name. */
  siteName: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${siteName} — home`}
      className={`inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <LogoMark className={markClassName} />
      <LogoWordmark className={wordmarkClassName} />
    </Link>
  );
}
