"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Reveal } from "@/components/Reveal";
import { movies } from "@/lib/content";

export function MoviesMade() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState<number | null>(null);

  // Continuous marquee: travels left while the page scrolls down and reverses
  // to the right when it scrolls up, easing up a little with scroll speed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let offset = 0;
    let dir = -1; // -1 = drifting left (scrolling down), 1 = right (up)
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    const BASE = 0.5; // px per frame at 60fps

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy > 0) dir = -1;
      else if (dy < 0) dir = 1;
      boost = Math.min(boost + Math.abs(dy) * 0.12, 10); // short-lived nudge
    };

    const tick = (now: number) => {
      const dt = (now - last) / 16.667;
      last = now;
      offset += dir * (BASE + boost) * dt;
      // Keep the offset inside one copy of the reel so the loop is seamless in
      // both directions.
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (offset <= -half) offset += half;
        else if (offset >= 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset}px,0,0)`;
      boost *= 0.9; // ease back to base speed quickly
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Duplicate the reel so the loop is seamless.
  const reel = [...movies, ...movies];

  return (
    <section className="relative overflow-hidden bg-cocoa text-white">
      {/* Floral grunge — Figma composites this at 19% with a LINEAR_BURN layer
          blend; CSS has no linear-burn, and `color-burn` reproduces it almost
          exactly over the cocoa base (soft-light washed it out and read too pale). */}
      <TextureOverlay
        src="/images/floral-texture.webp"
        opacity={0.19}
        blend="color-burn"
      />

      <Container className="relative z-10 pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal as="h2" className="display-md text-white">
            Movies made
            <br />
            <em className="italic">in Kurdistan</em>
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="max-w-sm font-sans text-xl leading-relaxed tracking-[0.4px] text-white/80 md:text-right"
          >
            Here are some of the movies that were shot in different regions of
            Kurdistan.
          </Reveal>
        </div>
      </Container>

      <div className="relative z-10 mt-6 overflow-hidden pb-16 pt-8">
        <div
          ref={trackRef}
          className="flex w-max"
          style={{ willChange: "transform" }}
        >
          {reel.map((movie, i) => (
            <a
              key={`${movie.title}-${i}`}
              href={
                movie.href ??
                `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setPopped((prev) => (prev === i ? null : i))}
              aria-label={`${movie.title} — open film page in a new tab`}
              className={`group relative mr-4 block aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/30 transition-transform duration-300 ease-out sm:w-48 md:w-56 ${
                popped === i ? "z-10 -translate-y-4 scale-105 shadow-2xl" : ""
              }`}
            >
              <Image
                src={movie.src}
                alt={`${movie.title} — film poster`}
                fill
                sizes="(max-width: 640px) 40vw, 224px"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
