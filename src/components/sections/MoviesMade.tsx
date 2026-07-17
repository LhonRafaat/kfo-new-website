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

  // Continuous marquee that eases up a little with scroll speed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let offset = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    const BASE = 0.5; // px per frame at 60fps

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      boost = Math.min(boost + dy * 0.12, 10); // gentle, short-lived nudge
    };

    const tick = (now: number) => {
      const dt = (now - last) / 16.667;
      last = now;
      offset -= (BASE + boost) * dt;
      const half = track.scrollWidth / 2;
      if (half > 0 && -offset >= half) offset += half;
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
            <button
              type="button"
              key={`${movie.title}-${i}`}
              onClick={() => setPopped((prev) => (prev === i ? null : i))}
              aria-label={movie.title}
              className={`group relative mr-4 aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/30 transition-transform duration-300 ease-out sm:w-48 md:w-56 ${
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
