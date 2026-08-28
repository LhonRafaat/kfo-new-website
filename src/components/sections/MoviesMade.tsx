"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CarouselArrow, Underline } from "@/components/icons";
import { useDragSlider } from "@/lib/useDragSlider";
import { movies } from "@/lib/content";

const SLIDE_MS = 700;
const N = movies.length;

/** Three copies of the reel so it can travel in either direction without ever
 *  running out of posters. The index lives in the middle copy; once it drifts
 *  into an outer one it snaps back by a copy-length with the transition off,
 *  which is invisible because the poster under it is the same film. */
const reel = [...movies, ...movies, ...movies];

/**
 * "Movies made in Kurdistan" (Figma: heading 317:677, arrows 636:58, strip
 * 636:63, captions 636:68–636:87). A row of equal-sized posters that pages one
 * film at a time and loops endlessly — no autoplay, since the design gives this
 * slider no pause control (unlike the news pagination below it).
 *
 * Geometry from the 1280 frame / 1184 content column: five 218×281 posters
 * (r16) with a 24px gutter, each captioned 17px underneath with its title
 * (Flecha M 500, 22/25) and year (Cadiz 16/24). Widths are fractions of the
 * container rather than fixed pixels, so the same layout drops to four, three
 * and two across as the viewport narrows.
 */
export function MoviesMade() {
  const [index, setIndex] = useState(N); // first real poster of the middle copy
  const [animate, setAnimate] = useState(true);

  const step = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  };

  // Touch drag — the strip follows the finger and snaps on release.
  const { handlers, dragX, dragging } = useDragSlider(step);

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

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  // The reel never animates while a finger is on it — the transform is the
  // finger's position — and picks the transition back up when it lifts.
  const ease =
    animate && !dragging
      ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      : "transition-none";

  return (
    <section
      // Target of the hero's "Find movies / Made in Kurdistan" quick link.
      id="movies-made-in-kurdistan"
      // Clears the sticky header when the hero's quick link jumps here.
      className="relative scroll-mt-24"
      aria-roledescription="carousel"
      aria-label="Movies made in Kurdistan"
    >
      <Container className="relative z-10 pb-20 pt-10">
        <div className="flex items-center justify-between gap-6">
          <Reveal as="h2" className="heading-section text-ink">
            Movies made <em className="font-normal italic">in Kurdistan</em>
          </Reveal>

          {/* 32px arrows, right-aligned with the content column. They rest at
              24% ink and light up with the accent underline on hover/focus. */}
          <Reveal delay={100} className="flex shrink-0 gap-[26px]">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous movies"
              className="carousel-arrow"
            >
              <CarouselArrow direction="left" className="h-[19px] w-[22px]" />
              <Underline
                className="mt-2 h-[3px] w-[33px]"
                strokeWidth={1.1003}
              />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next movies"
              className="carousel-arrow"
            >
              <CarouselArrow className="h-[19px] w-[22px]" />
              <Underline
                className="mt-2 h-[3px] w-[33px]"
                strokeWidth={1.1003}
              />
            </button>
          </Reveal>
        </div>

        <Reveal
          className="mt-8 overflow-hidden [--gap:0.75rem] [--per:2] sm:[--gap:1rem] sm:[--per:3] lg:[--gap:1.5rem] lg:[--per:4] xl:[--per:5]"
          delay={150}
        >
          <div
            role="group"
            tabIndex={0}
            {...handlers}
            onKeyDown={onKeyDown}
            aria-label="Film posters — swipe, or use the arrow keys, to page through"
            className={`flex w-full touch-pan-y outline-offset-8 ${ease}`}
            style={
              {
                "--i": index,
                // A slide plus its gutter is (100% + gap) / per — the same
                // figure the transform steps by, so a step lands exactly one
                // poster along whatever the current per-view is.
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
            {reel.map((movie, i) => {
              const clone = i < N || i >= 2 * N;
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
                  aria-hidden={clone}
                  tabIndex={clone ? -1 : 0}
                  className="block w-[var(--slide-w)] shrink-0"
                >
                  <div className="relative aspect-[218/281] overflow-hidden rounded-2xl">
                    <Image
                      src={movie.src}
                      alt={`${movie.title} — film poster`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-[17px] font-serif text-lg font-medium leading-[1.139] text-ink md:text-xl xl:text-[1.375rem]">
                    {movie.title}
                  </h3>
                  {/* Kept in flow even when the year is unknown, so every
                      caption block reserves the same height. */}
                  <p className="mt-0.5 min-h-6 font-sans text-base leading-6 tracking-[0.02em] text-ink">
                    {movie.year}
                  </p>
                </a>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
