import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { LogoWordmark } from "@/components/LogoWordmark";
import { site } from "@/lib/content";

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
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <LogoMark className={markClassName} />
      <LogoWordmark className={wordmarkClassName} />
    </Link>
  );
}
