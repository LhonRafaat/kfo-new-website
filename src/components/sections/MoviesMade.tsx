"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CarouselArrow } from "@/components/icons";
import { movies } from "@/lib/content";

/**
 * "Movies made in Kurdistan" (Figma "Movies Variant 3", 317:674): a poster
 * strip that bleeds off both edges. The active poster sits in the second slot
 * — in colour, taller, captioned — while the rest use the halftone B&W
 * artwork. The arrows slide the strip one poster at a time; the active slot
 * stays put and the reel moves through it.
 *
 * Geometry is proportional to the 1280px design frame: slide 212px (16.56vw),
 * gap 23px (1.78vw), active slot at x=149px (11.64vw), inactive posters
 * dropped 78px (6.1vw) so the active one reads raised.
 */
export function MoviesMade() {
  const [active, setActive] = useState(1); // Bekas, per the Figma

  const step = (dir: 1 | -1) =>
    setActive((a) => (a + dir + movies.length) % movies.length);

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
        {/* Poster reel — full-bleed, slides so the active poster holds slot 2 */}
        <div
          className="flex w-max items-start transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            gap: "clamp(12px, 1.78vw, 23px)",
            transform: `translateX(calc(11.64vw - ${active} * (clamp(140px, 16.56vw, 212px) + clamp(12px, 1.78vw, 23px))))`,
          }}
        >
          {movies.map((movie, i) => {
            const isActive = i === active;
            return (
              <a
                key={movie.title}
                href={
                  movie.href ??
                  `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${movie.title} — open film page in a new tab`}
                aria-current={isActive}
                className="group block w-[clamp(140px,16.56vw,212px)] shrink-0"
              >
                <div
                  className={`relative w-full overflow-hidden rounded transition-[margin,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isActive
                      ? "mt-0 aspect-[212/322]"
                      : "mt-[clamp(44px,6.1vw,78px)] aspect-[212/281]"
                  }`}
                >
                  {/* Colour + halftone stacked; opacity crossfades on activation */}
                  <Image
                    src={movie.src}
                    alt={`${movie.title} — film poster`}
                    fill
                    sizes="(max-width: 640px) 40vw, 212px"
                    className={`object-cover transition-opacity duration-500 ${
                      isActive ? "opacity-100" : movie.bw ? "opacity-0" : "opacity-100 grayscale contrast-125"
                    }`}
                  />
                  {movie.bw && (
                    <Image
                      src={movie.bw}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 40vw, 212px"
                      className={`object-cover transition-opacity duration-500 ${
                        isActive ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`mt-2.5 font-sans text-lg font-bold leading-[1.5] text-ink transition-opacity duration-500 ${
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
