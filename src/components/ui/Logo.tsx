import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { site } from "@/lib/content";

/**
 * Lockup: the framed-landscape mark plus the letter-spaced wordmark.
 * Colour is inherited (currentColor) so it can sit on light or dark grounds.
 */
export function Logo({
  className = "",
  markClassName = "h-[26px] w-[50px]",
  wordmarkClassName = "text-base",
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
      <span
        className={`font-serif font-bold uppercase leading-none tracking-wordmark ${wordmarkClassName}`}
      >
        {site.wordmark}
      </span>
    </Link>
  );
}
