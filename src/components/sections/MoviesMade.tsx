"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Reveal } from "@/components/Reveal";
import { movies } from "@/lib/content";

export function MoviesMade() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Continuous marquee that accelerates with scroll speed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      boost = Math.min(boost + dy * 0.5, 45);
    };

    const tick = (now: number) => {
      const dt = (now - last) / 16.667;
      last = now;
      offset -= (BASE + boost) * dt;
      const half = track.scrollWidth / 2;
      if (half > 0 && -offset >= half) offset += half;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      boost *= 0.94; // ease back to base speed
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
      <TextureOverlay src="/images/floral-texture.webp" opacity={0.19} blend="soft-light" />

      <Container className="relative z-10 pt-20 md:pt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal as="h2" className="display-md text-white">
            Movies made
            <br />
            <em className="italic">in Kurdistan</em>
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="max-w-sm font-sans text-base leading-relaxed text-white/80 md:text-right"
          >
            Here are some of the movies that were shot in different regions of Kurdistan.
          </Reveal>
        </div>
      </Container>

      <div className="relative z-10 mt-14 overflow-hidden pb-20">
        <div ref={trackRef} className="flex w-max" style={{ willChange: "transform" }}>
          {reel.map((movie, i) => (
            <div
              key={`${movie.title}-${i}`}
              className="group relative mr-4 aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/30 sm:w-48 md:w-56"
            >
              <Image
                src={movie.src}
                alt={`${movie.title} — film poster`}
                fill
                sizes="(max-width: 640px) 40vw, 224px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
