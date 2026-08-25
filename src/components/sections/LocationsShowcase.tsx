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
 * the pointer, falling back to the Bazyan tile (the Figma's resting state)
 * when nothing is hovered. Column height is viewport-capped so the whole
 * section always fits within 100vh.
 */
function Tile({
  tile,
  active,
  onActivate,
  hideOnMobile = false,
}: {
  tile: ShowcaseTile;
  active: boolean;
  onActivate: () => void;
  hideOnMobile?: boolean;
}) {
  return (
    <Link
      href="/locations"
      aria-label={`${tile.title} — ${showcaseCta}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      /* The mobile column is auto-height, so the tile has to size itself from
         its aspect ratio — `basis-0` (which the md+ flex-grow mosaic needs)
         would collapse it to nothing there. */
      className={`group relative min-h-0 basis-auto overflow-hidden rounded-2xl bg-ink/10 md:basis-0 ${
        hideOnMobile ? "hidden md:block" : "block aspect-3/2 md:aspect-auto"
      }`}
      style={{ flexGrow: tile.tall ? 320 : 234 }}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes="(max-width: 768px) 92vw, 25vw"
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

export function LocationsShowcase() {
  // Index into the flattened column-major grid; 0 is Bazyan, the Figma default.
  const [active, setActive] = useState(0);

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

        <div
          className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-[346fr_207fr_340fr_237fr] md:gap-4"
          onMouseLeave={() => setActive(0)}
        >
          {locationShowcase.map((col, c) => (
            <Reveal
              key={c}
              delay={c * 90}
              className="flex h-auto flex-col gap-3 md:h-[min(46vw,calc(100svh-330px))] md:min-h-[320px] md:max-h-[571px] md:gap-[17px]"
            >
              {col.map((tile, r) => {
                const index = c * 2 + r;
                return (
                  <Tile
                    key={tile.src}
                    tile={tile}
                    active={index === active}
                    onActivate={() => setActive(index)}
                    /* Single column on mobile, so only the first tile of each
                       column is shown — four in all; md+ keeps the full mosaic. */
                    hideOnMobile={r > 0}
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
