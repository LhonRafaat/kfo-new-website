"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import {
  locationShowcase,
  showcaseCta,
  type ShowcaseTile,
} from "@/lib/content";

/**
 * "A Land of Untold Stories" mosaic (Figma "Location DB Variant 3", 317:631):
 * four columns of two staggered tiles. One tile at a time carries the Figma's
 * treatment — grayscale, dark gradient, title and CTA pill — and it follows
 * the pointer. **At rest no tile carries it** (user, 2026-08-28): the Figma
 * shows it on the Bazyan tile, but a permanent "Get access to all database"
 * pill reads as a badge on one photo rather than as the hover affordance it
 * is. Column height is viewport-capped so the whole section fits within 100vh.
 *
 * Below `md` the mosaic gives way to a swipable strip — see `ShowcaseStrip`.
 */
function Tile({
  tile,
  active,
  onActivate,
}: {
  tile: ShowcaseTile;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href="/locations"
      aria-label={`${tile.title} — ${showcaseCta}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative min-h-0 basis-0 overflow-hidden rounded-2xl bg-ink/10"
      style={{ flexGrow: tile.tall ? 320 : 234 }}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes="25vw"
        /* Follows the cursor, so it runs on the interactive token, not the
           slower entrance one — it shares the easing curve either way. */
        className={`object-cover transition-[filter] duration-(--fade-duration-interactive) ease-(--fade-ease) ${
          active ? "grayscale" : "grayscale-0"
        }`}
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center text-white transition-opacity duration-(--fade-duration-interactive) ease-(--fade-ease) ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <h3 className="heading-card font-serif font-medium italic">
          {tile.title}
        </h3>
        <span className="rounded-full bg-white px-3 py-2 font-sans text-base font-semibold leading-[1.375] text-ink">
          {showcaseCta}
        </span>
      </div>
    </Link>
  );
}

/**
 * The same photos on a phone: one horizontally swipable row of all eight
 * rather than a stack of four (user, 2026-08-28).
 *
 * Native scroll-snap rather than the `useDragSlider` reel the movies and
 * location strips run on — those are transform-driven because desktop arrows
 * page them, whereas this exists only below `md`, where letting the browser do
 * it buys momentum, fling and rubber-banding for nothing.
 *
 * **No hover treatment here.** A phone has no hover, so the title it used to
 * reveal is simply on, ranged bottom-left over a scrim, and the photo keeps
 * its colour. The CTA pill stays behind on the desktop mosaic — it is the
 * affordance for a state that no longer exists, and the section's own "View
 * all database" link is right above the strip.
 */
function ShowcaseStrip() {
  return (
    <Reveal
      /* Bleeds past the container's gutter so the strip runs to the screen
         edge, while the first card still lines up with the copy above it. */
      className="no-scrollbar mt-10 -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 md:hidden"
    >
      {locationShowcase.flat().map((tile) => (
        <Link
          key={tile.src}
          href="/locations"
          aria-label={`${tile.title} — ${showcaseCta}`}
          className="relative aspect-3/2 w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink/10"
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="78vw"
            className="object-cover"
          />
          {/* The frame's own gradient, weighted to the base: it has to carry
              the title without dimming the whole photo, since here it is never
              off. Same 0.8 at the foot as the hover treatment. */}
          <div
            className="absolute inset-x-0 bottom-0 top-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
            }}
            aria-hidden
          />
          <h3 className="heading-card absolute bottom-4 left-4 right-4 font-serif font-medium italic text-white">
            {tile.title}
          </h3>
        </Link>
      ))}
    </Reveal>
  );
}

export function LocationsShowcase() {
  // Index into the flattened column-major grid; null while nothing is hovered.
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex max-w-[640px] flex-col gap-4">
            <Reveal as="h2" className="heading-section text-ink">
              A Land of Untold Stories
            </Reveal>
            <Reveal as="p" delay={80} className="body-md">
              We offer you the largest location database in the Kurdistan
              Region. We also add new locations regularly. If you cannot find
              the location you are looking for, do not hesitate to contact us.
            </Reveal>
          </div>
          <AccentLink href="/locations" className="shrink-0">
            View all database
          </AccentLink>
        </div>

        <ShowcaseStrip />

        <div
          className="mt-10 hidden grid-cols-[346fr_207fr_340fr_237fr] gap-4 md:grid"
          onMouseLeave={() => setActive(null)}
        >
          {locationShowcase.map((col, c) => (
            <Reveal
              key={c}
              delay={c * 90}
              className="flex h-[min(46vw,calc(100svh-330px))] min-h-[320px] max-h-[571px] flex-col gap-[17px]"
            >
              {col.map((tile, r) => {
                const index = c * 2 + r;
                return (
                  <Tile
                    key={tile.src}
                    tile={tile}
                    active={index === active}
                    onActivate={() => setActive(index)}
                  />
                );
              })}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
