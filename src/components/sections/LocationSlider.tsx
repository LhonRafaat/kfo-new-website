"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { CarouselArrow } from "@/components/icons";
import { useDragSlider } from "@/lib/useDragSlider";
import type { LocationEntry } from "@/lib/content";

const SLIDE_MS = 700;

/**
 * Three-up photo strip under the body copy (Figma 338:1152–338:1154 with the
 * arrow row 529:1435): 379×372 tiles, 24px apart, paged one photo at a time by
 * arrows pinned to either end of the content column. Loops endlessly using the
 * same triple-reel trick as the homepage movie slider — the index lives in the
 * middle copy and snaps back a copy-length, un-animated, once it drifts out.
 */
export function LocationSlider({
  images,
}: {
  images: LocationEntry["gallery"];
}) {
  const n = images.length;
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);

  const step = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  };

  // Touch drag — the strip follows the finger and snaps on release.
  const { handlers, dragX, dragging } = useDragSlider(step);

  useEffect(() => {
    if (index >= 2 * n || index < n) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex((i) => (i >= 2 * n ? i - n : i + n));
      }, SLIDE_MS);
      return () => clearTimeout(id);
    }
    if (!animate) {
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setAnimate(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
  }, [index, animate, n]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  const reel = [...images, ...images, ...images];
  // Still while a finger is on it — the transform is the finger's position.
  const ease =
    animate && !dragging
      ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      : "transition-none";

  return (
    <div
      aria-roledescription="carousel"
      aria-label="More photos of this location"
    >
      <div className="overflow-hidden [--gap:1rem] [--per:1] sm:[--per:2] lg:[--gap:1.5rem] lg:[--per:3]">
        <div
          role="group"
          tabIndex={0}
          {...handlers}
          onKeyDown={onKeyDown}
          aria-label="Photo strip — swipe, or use the arrow keys, to page through"
          className={`flex w-full touch-pan-y outline-offset-8 ${ease}`}
          style={
            {
              "--i": index,
              "--slide-w":
                "calc((100% - (var(--per) - 1) * var(--gap)) / var(--per))",
              // Live finger travel, 0 at rest.
              "--drag": `${dragX}px`,
              gap: "var(--gap)",
              transform:
                "translateX(calc(-1 * var(--i) * (100% + var(--gap)) / var(--per) + var(--drag)))",
            } as CSSProperties
          }
        >
          {reel.map((img, i) => {
            const clone = i < n || i >= 2 * n;
            return (
              <div
                key={i}
                aria-hidden={clone}
                className="relative aspect-3/2 w-[var(--slide-w)] shrink-0 overflow-hidden rounded-2xl md:aspect-379/372"
              >
                <Image
                  src={img.src}
                  alt={clone ? "" : img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 379px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows sit 32px under the strip, one at each end of the column. */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photos"
          className="flex h-8 w-8 items-center justify-center text-ink transition-colors duration-300 hover:text-accent"
        >
          <CarouselArrow direction="left" className="h-[19px] w-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photos"
          className="flex h-8 w-8 items-center justify-center text-ink transition-colors duration-300 hover:text-accent"
        >
          <CarouselArrow className="h-[19px] w-[22px]" />
        </button>
      </div>
    </div>
  );
}
