"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CarouselArrow } from "@/components/icons";
import { movies } from "@/lib/content";

const SLIDE_MS = 700;
const N = movies.length;

/** Three copies of the reel so it can travel in either direction without ever
 *  running out of posters. The index lives in the middle copy; once it drifts
 *  into an outer one it snaps back by a copy-length with the transition off,
 *  which is invisible because the poster under it is the same film. */
const reel = [...movies, ...movies, ...movies];

/**
 * "Movies made in Kurdistan" (Figma "Movies Variant 3", 317:674): a poster
 * strip that bleeds off both edges, looping endlessly. The active poster holds
 * the second slot — taller and captioned — while the reel slides through it.
 *
 * Geometry is proportional to the 1280px design frame: slide 212px (16.56vw),
 * gap 23px (1.78vw), active slot at x=149px (11.64vw), strip 359px (28.05vw).
 * Every poster is absolutely positioned inside that fixed-height strip, so
 * resizing the active one can never reflow the sections below it.
 */
export function MoviesMade() {
  const [index, setIndex] = useState(N + 1); // Bekas, per the Figma
  const [animate, setAnimate] = useState(true);

  const step = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  };

  useEffect(() => {
    // Drifted out of the middle copy — wait for the slide to land, then jump
    // back a copy-length with animation off.
    if (index >= 2 * N || index < N) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex((i) => (i >= 2 * N ? i - N : i + N));
      }, SLIDE_MS);
      return () => clearTimeout(id);
    }
    // Re-arm the transition a frame after that silent jump has painted.
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
  }, [index, animate]);

  const ease = animate
    ? "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
    : "transition-none";

  return (
    <section className="relative overflow-hidden">
      <Container className="relative z-10 pt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <Reveal as="h2" className="heading-section text-ink">
            Movies made <em className="font-normal italic">in Kurdistan</em>
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="max-w-[374px] font-sans text-base leading-6 tracking-[0.02em] text-ink"
          >
            Here are some of the movies that were shot in different regions of
            Kurdistan.
          </Reveal>
        </div>
      </Container>

      <Reveal className="relative z-10 mt-12 pb-12">
        {/* Fixed-height strip — poster sizes animate inside it, never below it */}
        <div
          className={`flex h-[clamp(237px,28.05vw,359px)] w-max ${ease}`}
          style={
            {
              "--slide": "clamp(140px, 16.56vw, 212px)",
              "--gap": "clamp(12px, 1.78vw, 23px)",
              gap: "var(--gap)",
              transform:
                "translateX(calc(11.64vw - var(--i) * (var(--slide) + var(--gap))))",
              "--i": index,
            } as CSSProperties
          }
        >
          {reel.map((movie, i) => {
            const isActive = i === index;
            return (
              <a
                key={i}
                href={
                  movie.href ??
                  `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${movie.title} — open film page in a new tab`}
                aria-current={isActive}
                aria-hidden={i < N || i >= 2 * N}
                tabIndex={i < N || i >= 2 * N ? -1 : 0}
                className="relative block h-full w-[var(--slide)] shrink-0"
              >
                <div
                  className={`absolute inset-x-0 overflow-hidden rounded ${ease}`}
                  style={{
                    height: isActive ? "89.69%" : "78.27%",
                    bottom: isActive ? "10.31%" : "0%",
                  }}
                >
                  <Image
                    src={movie.src}
                    alt={`${movie.title} — film poster`}
                    fill
                    sizes="(max-width: 640px) 40vw, 212px"
                    className="object-cover"
                  />
                </div>
                <p
                  className={`absolute inset-x-0 bottom-0 font-sans text-lg font-bold leading-[1.5] text-ink ${ease} ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {movie.caption}
                </p>
              </a>
            );
          })}
        </div>

        {/* Edge arrows, level with the top of the active poster */}
        <Container className="pointer-events-none absolute inset-x-0 top-6 z-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous movie"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center text-ink transition-colors duration-300 hover:text-accent"
          >
            <CarouselArrow direction="left" className="h-[19px] w-[22px]" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next movie"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center text-ink transition-colors duration-300 hover:text-accent"
          >
            <CarouselArrow className="h-[19px] w-[22px]" />
          </button>
        </Container>
      </Reveal>
    </section>
  );
}
