"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LocationEntry } from "@/lib/content";

// Enough copies that the track always overflows the viewport, so the seam
// never shows: the loop resets after one copy, leaving (COPIES - 1) copies
// spanning the screen.
const COPIES = 3;

/**
 * Full-bleed photo strip below the two hero images. It scrolls itself
 * continuously and wraps seamlessly, running off both edges of the page as the
 * Figma frame shows it.
 */
export function LocationSlider({
  images,
}: {
  images: LocationEntry["gallery"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Nothing scrolls itself, so let the reader scroll it — otherwise the
      // photos past the right edge would be unreachable.
      track.parentElement?.classList.add("overflow-x-auto", "no-scrollbar");
      return;
    }

    let offset = 0;
    let last = performance.now();
    let raf = 0;
    const SPEED = 0.45; // px per frame at 60fps

    const tick = (now: number) => {
      const dt = (now - last) / 16.667;
      last = now;
      offset -= SPEED * dt;
      const copy = track.scrollWidth / COPIES;
      if (copy > 0 && -offset >= copy) offset += copy;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const reel = Array.from({ length: COPIES }, () => images).flat();

  return (
    <div className="mt-6 overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max gap-6"
        style={{ willChange: "transform" }}
      >
        {reel.map((img, i) => (
          <div
            key={`${i}-${img.src}`}
            // only the first pass is exposed; the rest are visual duplicates
            aria-hidden={i >= images.length}
            className="relative h-60 w-61.25 shrink-0 overflow-hidden rounded sm:h-75 sm:w-76.5 lg:h-93 lg:w-94.75"
          >
            <Image
              src={img.src}
              alt={i < images.length ? img.alt : ""}
              fill
              sizes="379px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
