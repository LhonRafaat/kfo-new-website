"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import type { LocationEntry } from "@/lib/content";

/**
 * The secondary photo strip below the two hero images. It runs off the right
 * edge of the page and pages one tile at a time — the Figma frame shows it
 * mid-scroll, with the first tile cropped.
 */
export function LocationSlider({
  images,
}: {
  images: LocationEntry["gallery"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    // 1px of slack keeps the end state stable on fractional layouts
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.firstElementChild as HTMLElement | null;
    const step = tile ? tile.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Container className="mt-6">
      <div
        ref={trackRef}
        onScroll={sync}
        // flex lives on the scroller itself so `firstElementChild` is a tile,
        // which is what the paging step measures
        className="no-scrollbar -mr-6 flex snap-x snap-mandatory gap-6 overflow-x-auto sm:-mr-8 lg:-mr-12"
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative h-60 w-61.25 shrink-0 snap-start overflow-hidden rounded sm:h-75 sm:w-76.5 lg:h-93 lg:w-94.75"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="379px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Previous photos"
          className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="Next photos"
          className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight className="h-7 w-7" />
        </button>
      </div>
    </Container>
  );
}
