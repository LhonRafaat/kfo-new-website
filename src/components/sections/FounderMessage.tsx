"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, Underline } from "@/components/icons";
import { useInView } from "@/lib/useInView";
import { founderMessage } from "@/lib/content";

/**
 * "Read Full Message" on the founder card, and the dialog it opens
 * (Figma "Testimonial Section", 537:1923).
 *
 * The panel is the frame's 1232×504: portrait filling the left 632px
 * edge-to-edge with the name over its base, statement column at x672 and 524
 * wide, close at 1160/48. The paper scan behind it is a 1232×666 rect starting
 * 81px above the panel's top, linear-burned at 60% and clipped by it, so only
 * a slice of the crease shows.
 *
 * Three deliberate deviations from the frame, all requested: it is **centred**
 * rather than pinned to the bottom of the viewport (so all four corners are
 * rounded, not just the top two), it animates both in and out, and the page
 * behind it dims to half. The exit animation is why closing runs through
 * `requestClose` and a timer instead of unmounting on the spot.
 */
/** Matches the `sheet-out` / `scrim-out` durations in tailwind.config.ts. */
const EXIT_MS = 300;

export function FounderMessage() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // The card is wrapped in a `Reveal`, whose transform makes it the containing
  // block for `position: fixed` descendants — the sheet would sit inside the
  // 1184px content column instead of the viewport. Portal it to the body.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Same observer as every other reveal, so the trigger's underline draws in
  // with the copy above it. Doubles as the element focus returns to on close.
  const [triggerRef, visible] = useInView<HTMLButtonElement>();

  // Play the exit animation, then unmount.
  const requestClose = () => setClosing(true);
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      // Keep tabbing inside the sheet while it is open.
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open && !closing}
        className={`accent-link text-left ${visible ? "is-visible" : ""}`}
      >
        <span className="flex flex-col">
          <span>Read Full Message</span>
          <Underline />
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Half-dark scrim over the page, and the click target that
                dismisses the dialog. */}
            <div
              aria-hidden
              onPointerDown={requestClose}
              className={`absolute inset-0 bg-black/50 ${
                closing ? "animate-scrim-out" : "animate-scrim-in"
              }`}
            />
            <div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={`relative isolate flex max-h-full w-full max-w-[1232px] flex-col overflow-y-auto overflow-x-hidden rounded-2xl lg:h-[504px] lg:flex-row lg:overflow-y-hidden ${
                closing ? "animate-sheet-out" : "animate-sheet-in"
              }`}
            >
              {/* Cream under the paper scan, linear-burned at 60% (537:1924).
                Everything else paints above this sandwich — anything nested
                inside it would come out colour-inverted. */}
              <div
                className="burn-restore absolute inset-0 isolate"
                aria-hidden
              >
                <div className="burn-scope absolute inset-0 bg-cream" />
                <div
                  className="burn-layer absolute inset-x-0 -top-[16.07%] h-[132.14%] opacity-60"
                  style={{
                    backgroundImage: "url(/images/texture-paper-modal.webp)",
                    backgroundSize: "100% 100%",
                  }}
                />
              </div>

              {/* Portrait panel (649:191) — 632 of the sheet's 1232, full height,
                with the name block inset 32px from its left and base. */}
              <div className="relative aspect-3/2 w-full shrink-0 lg:aspect-auto lg:h-full lg:w-[51.3%]">
                <Image
                  src={founderMessage.image.src}
                  alt={founderMessage.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 632px"
                  className="object-cover object-top"
                />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-serif text-xl font-bold italic leading-7 lg:text-2xl lg:leading-9">
                    {founderMessage.name}
                  </p>
                  <p className="font-serif text-xl font-medium leading-7 lg:text-2xl lg:leading-9">
                    {founderMessage.title}
                  </p>
                </div>
              </div>

              {/* Statement column (537:1931) — x672 of 1232, 524 wide, 32px gaps. */}
              <div className="relative flex flex-1 flex-col gap-8 px-8 pb-12 pt-12 lg:pl-10 lg:pr-9">
                <h2 id={titleId} className="heading-section text-ink">
                  {founderMessage.heading}
                  <em className="font-normal italic">
                    {founderMessage.headingItalic}
                  </em>
                </h2>

                <p className="max-w-[493px] font-sans text-base font-medium leading-6 tracking-label text-[#291A1C]">
                  {founderMessage.body}
                </p>

                <a
                  href={founderMessage.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="accent-link is-visible self-start"
                >
                  <span className="flex flex-col">
                    <span>{founderMessage.linkedin.label}</span>
                    {/* 133px drawn; the wave fills 115 of the 150-unit box. */}
                    <Underline className="!h-[5px] w-[173px]" />
                  </span>
                </a>
                <a
                  href={founderMessage.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="accent-link is-visible self-start"
                >
                  <span className="flex flex-col">
                    <span>{founderMessage.readStatement}</span>
                    {/* 133px drawn; the wave fills 115 of the 150-unit box. */}
                    <Underline className="!h-[5px] w-[173px]" />
                  </span>
                </a>
              </div>

              {/* Close (537:1937) — a 32px white square 40px in from the sheet's
                right edge and 48px down, with a 20px glyph. */}
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the founder's message"
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-black transition-colors duration-300 hover:text-accent lg:right-10 lg:top-12"
              >
                <CloseIcon className="h-7 w-7" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
