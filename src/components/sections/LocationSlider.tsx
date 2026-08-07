"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { CarouselArrow } from "@/components/icons";
import type { Media } from "@/lib/media";

const SLIDE_MS = 700;
const SWIPE_PX = 40;

/**
 * Three-up photo strip under the body copy (Figma 338:1152–338:1154 with the
 * arrow row 529:1435): 379×372 tiles, 24px apart, paged one photo at a time by
 * arrows pinned to either end of the content column. Loops endlessly using the
 * same triple-reel trick as the homepage movie slider — the index lives in the
 * middle copy and snaps back a copy-length, un-animated, once it drifts out.
 */
export function LocationSlider({ images }: { images: Media[] }) {
  const n = images.length;
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const step = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  };

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

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const from = swipeStart.current;
    swipeStart.current = null;
    if (!from) return;
    const dx = e.clientX - from.x;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(e.clientY - from.y))
      return;
    step(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  const reel = [...images, ...images, ...images];
  const ease = animate
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
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
          onKeyDown={onKeyDown}
          aria-label="Photo strip — use the arrow keys to page through"
          className={`flex w-full touch-pan-y outline-offset-8 ${ease}`}
          style={
            {
              "--i": index,
              "--slide-w":
                "calc((100% - (var(--per) - 1) * var(--gap)) / var(--per))",
              gap: "var(--gap)",
              transform:
                "translateX(calc(-1 * var(--i) * (100% + var(--gap)) / var(--per)))",
            } as CSSProperties
          }
        >
          {reel.map((img, i) => {
            const clone = i < n || i >= 2 * n;
            return (
              <div
                key={i}
                aria-hidden={clone}
                className="relative aspect-379/372 w-[var(--slide-w)] shrink-0 overflow-hidden rounded-2xl"
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
