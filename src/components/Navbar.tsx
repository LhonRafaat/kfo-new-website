"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { BackArrow, CloseIcon, HamburgerIcon } from "@/components/icons";
import { primaryNav, secondaryNav } from "@/lib/content";

/**
 * `overlay` floats the header over a full-bleed hero in white; `solid` sits in
 * the normal flow on a cream page and inks the lockup instead.
 *
 * The bar stays on screen at every scroll position (user, 2026-08-28) — `fixed`
 * for the overlay variant, which was already out of flow over its hero, and
 * `sticky` for the in-flow one. It rests transparent and takes a ground the
 * moment anything scrolls under it, or the copy below would read through it.
 */
export function Navbar({
  variant = "overlay",
  tone = "cream",
  backHref,
}: {
  variant?: "overlay" | "solid";
  /** Ground the bar takes once scrolled — `dark` for the film-fund pages. */
  tone?: "cream" | "dark";
  /** Renders a back arrow to the left of the lockup (location detail pages). */
  backHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll + close on Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // a reload part-way down the page starts scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const restingBar =
    variant === "overlay"
      ? "bg-transparent text-white"
      : "bg-transparent text-ink";
  // A hairline rather than a shadow: the ground is a paper scan, and a soft
  // drop shadow over it reads as a smudge.
  const scrolledBar =
    tone === "dark"
      ? "bg-ink-deep/90 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-sm"
      : "bg-cream/90 text-ink shadow-[0_1px_0_0_rgba(42,27,29,0.1)] backdrop-blur-sm";

  return (
    <>
      <header
        className={`${
          // The overlay bar was already out of flow over its hero, so `fixed`
          // costs the page no height; the solid one has to stay in flow, or
          // every page it sits on would jump up by its height.
          variant === "overlay" ? "fixed inset-x-0 top-0" : "sticky top-0"
        } z-40 transition-colors duration-300 ${
          scrolled ? scrolledBar : restingBar
        }`}
      >
        {/* Shorter on a phone, where the bar now eats into every screen. */}
        <Container className="flex items-center justify-between py-4 sm:py-6">
          <div className="flex items-center gap-6">
            {backHref && (
              <Link
                href={backHref}
                aria-label="Back to the location database"
                className="transition-transform duration-300 ease-out hover:-translate-x-1"
              >
                <BackArrow className="h-6 w-6" />
              </Link>
            )}
            <Logo
              wordmarkClassName="hidden h-[18px] w-auto sm:block"
              markClassName="h-[22px] w-[42px] sm:h-[25px] sm:w-[48px]"
            />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="group flex h-11 w-11 items-center justify-center"
          >
            <HamburgerIcon className="h-[13px] w-8 transition-[width] duration-300 ease-out group-hover:w-11" />
          </button>
        </Container>
      </header>

      {/* Full-screen menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 overflow-y-auto ${open ? "" : "pointer-events-none"}`}
      >
        {/* Backdrop over the page below */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />

        <div
          className={`texture-floral relative bg-cream text-ink shadow-2xl transition-transform duration-500 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* subtle tint so the floral texture reads as a soft watermark */}
          <div className="absolute inset-0 bg-cream/70" aria-hidden />
          {/* The whole panel is sized to clear a phone screen without
              scrolling: smaller type and tighter rhythm below `sm`, the
              drawn scale from `sm` up. */}
          <Container className="relative py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <Logo
                /* The wordmark is 19:1, so 14px of height is 264px of width —
                   which ran under the close button at 390. */
                wordmarkClassName="h-[11px] w-auto sm:h-[18px]"
                markClassName="h-[22px] w-[42px] sm:h-[25px] sm:w-[48px]"
                href="/"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-ink/5"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:mt-12 sm:grid-cols-2 sm:gap-y-8 md:mt-16 lg:grid-cols-3">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group block"
                >
                  <span className="block font-serif text-base italic text-ink/50 sm:text-2xl">
                    {item.index}
                  </span>
                  <span className="mt-0.5 block font-serif text-[1.75rem] font-medium italic leading-[1.14] transition-colors duration-300 group-hover:text-accent sm:mt-1 sm:text-4xl md:text-5xl">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pb-6 pt-4 sm:mt-12 sm:gap-x-8 sm:gap-y-3 sm:pb-14 sm:pt-8 md:mt-16">
              {secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="link-underline font-serif text-lg font-medium italic sm:text-2xl"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
