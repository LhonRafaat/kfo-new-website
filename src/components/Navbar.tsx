"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { CloseIcon, HamburgerIcon } from "@/components/icons";
import { primaryNav, secondaryNav } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {/* Transparent header sitting over the hero */}
      <header className="absolute inset-x-0 top-0 z-40">
        <Container className="flex items-center justify-between py-6 text-white">
          <Logo
            wordmarkClassName="hidden h-[18px] w-auto sm:block"
            markClassName="h-[22px] w-[42px] sm:h-[25px] sm:w-[48px]"
          />
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
          <Container className="relative py-6">
            <div className="flex items-center justify-between">
              <Logo
                wordmarkClassName="h-[14px] w-auto sm:h-[18px]"
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

            <nav className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group block"
                >
                  <span className="block font-serif text-2xl italic text-ink/50">
                    {item.index}
                  </span>
                  <span className="mt-1 block font-serif text-4xl font-medium italic leading-[1.14] transition-colors duration-300 group-hover:text-accent md:text-5xl">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-8 pb-14 md:mt-16">
              {secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="link-underline font-serif text-2xl font-medium italic"
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
