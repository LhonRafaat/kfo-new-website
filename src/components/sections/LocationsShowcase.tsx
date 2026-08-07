"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import { media } from "@/lib/media";
import type { HomePage } from "@/lib/strapi";

type Showcase = HomePage["showcase"];
type Tile = Showcase["tiles"][number];

/**
 * "A Land of Untold Stories" mosaic (Figma "Location DB Variant 3", 317:631):
 * four columns of two staggered tiles. One tile at a time carries the Figma's
 * treatment — grayscale, dark gradient, title and CTA pill — and it follows
 * the pointer, falling back to the first tile (the Figma's resting state)
 * when nothing is hovered. Column height is viewport-capped so the whole
 * section always fits within 100vh.
 *
 * Strapi stores the tiles as one flat, ordered list with a `column` index on
 * each, since a repeatable component cannot nest a second repeatable one; they
 * are regrouped into the design's four columns here.
 */
function ShowcaseTile({
  tile,
  cta,
  href,
  active,
  onActivate,
}: {
  tile: Tile;
  cta: string;
  href: string;
  active: boolean;
  onActivate: () => void;
}) {
  const image = media(tile.image);

  return (
    <Link
      href={href}
      aria-label={`${tile.title} — ${cta}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative min-h-0 basis-0 overflow-hidden rounded-2xl bg-ink/10"
      style={{ flexGrow: tile.tall ? 320 : 234 }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 48vw, 25vw"
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
        <h3 className="font-serif text-[1.375rem] font-medium italic leading-[1.14]">
          {tile.title}
        </h3>
        <span className="rounded-full bg-white px-3 py-2 font-sans text-base font-semibold leading-[1.375] text-ink">
          {cta}
        </span>
      </div>
    </Link>
  );
}

export function LocationsShowcase({ showcase }: { showcase: Showcase }) {
  // Index into the flattened column-major grid; 0 is the Figma's default tile.
  const [active, setActive] = useState(0);

  const columns = useMemo(() => {
    const grouped = new Map<number, Tile[]>();
    for (const tile of showcase.tiles) {
      const column = grouped.get(tile.column) ?? [];
      column.push(tile);
      grouped.set(tile.column, column);
    }
    return [...grouped.entries()]
      .sort(([a], [b]) => a - b)
      .map(([, tiles]) => tiles);
  }, [showcase.tiles]);

  // The flat index a tile sits at, so hover state survives uneven columns.
  let flat = -1;

  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex max-w-[640px] flex-col gap-4">
            <Reveal as="h2" className="heading-section text-ink">
              {showcase.heading}
            </Reveal>
            <Reveal as="p" delay={80} className="body-md">
              {showcase.body}
            </Reveal>
          </div>
          <AccentLink href={showcase.ctaHref} className="shrink-0">
            {showcase.ctaLabel}
          </AccentLink>
        </div>

        <div
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-[346fr_207fr_340fr_237fr] md:gap-4"
          onMouseLeave={() => setActive(0)}
        >
          {columns.map((column, c) => (
            <Reveal
              key={c}
              delay={c * 90}
              className="flex h-[min(58vw,calc(100svh-390px))] min-h-[320px] flex-col gap-3 md:h-[min(46vw,calc(100svh-330px))] md:max-h-[571px] md:gap-[17px]"
            >
              {column.map((tile) => {
                const index = ++flat;
                return (
                  <ShowcaseTile
                    key={`${tile.column}-${tile.title}`}
                    tile={tile}
                    cta={showcase.tileCtaLabel}
                    href={showcase.ctaHref}
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
