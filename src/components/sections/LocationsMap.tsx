"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight } from "@/components/icons";
import { media } from "@/lib/media";
import type { City, LocationsPage } from "@/lib/strapi";

/**
 * The location database map: a silhouette of the Kurdistan Region with a
 * counted pin over each city. The chips beside the heading and the pins select
 * the same city, so either one dims the rest of the map.
 *
 * This is the full-page 900×800 variant; the redesign uses the smaller hero map
 * in `LocationsIntro` instead, so nothing renders this today.
 */
export function LocationsMap({
  heading,
  filtersLabel,
  map,
  cities,
}: {
  heading: string;
  filtersLabel: string;
  map: LocationsPage["mapImage"];
  cities: City[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (city: string) =>
    setSelected((s) => (s === city ? null : city));

  // Only cities whose pin has been placed appear on the artboard.
  const placed = cities.filter((c) => c.pinX != null && c.pinY != null);
  const chips = showAll ? placed : placed.filter((c) => c.primary);
  const image = media(map);

  return (
    <Container className="relative z-10 pt-24 pb-32 md:pt-42.5 md:pb-60">
      <Reveal
        as="div"
        className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="font-serif text-[32px] font-medium leading-[1.14] text-ink">
          {heading}
        </h2>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {chips.map((city) => {
            const isOn = selected === city.name;
            return (
              <button
                key={city.slug}
                type="button"
                onClick={() => toggle(city.name)}
                aria-pressed={isOn}
                className={`font-sans text-base font-semibold uppercase transition-colors duration-300 ${
                  isOn
                    ? "text-accent [box-shadow:inset_0_-2px_0_0_currentColor]"
                    : "text-espresso hover:text-accent"
                }`}
              >
                {city.name}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="flex items-center gap-2 font-sans text-base font-semibold uppercase text-espresso transition-colors duration-300 hover:text-accent"
          >
            {showAll ? "Fewer Filters" : filtersLabel}
            <CaretRight
              className={`h-6 w-6 text-espresso/80 transition-transform duration-300 ${
                showAll ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>
      </Reveal>

      {/* 900×800 artboard from Figma — pins are positioned as a % of it, so the
          whole thing scales down together on narrow screens. */}
      <div className="relative mx-auto mt-16 aspect-[900/800] w-full max-w-[900px] md:mt-28">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          // Vector already; the optimizer rejects SVG unless it is globally
          // allowlisted, which we do not want to do for remote images.
          unoptimized
          className="object-contain"
        />

        {placed.map((city) => {
          const isOn = selected === city.name;
          const dimmed = selected !== null && !isOn;
          return (
            <button
              key={city.slug}
              type="button"
              onClick={() => toggle(city.name)}
              aria-pressed={isOn}
              style={{ left: `${city.pinX}%`, top: `${city.pinY}%` }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 hover:z-10 focus-visible:z-10 ${
                dimmed ? "opacity-30" : "opacity-100"
              } ${isOn ? "z-10" : ""}`}
            >
              {/* Pin: a solid accent dot inside a soft accent halo */}
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full bg-accent/25 transition-transform duration-300 ease-out group-hover:scale-125 md:h-6 md:w-6 ${
                  isOn ? "scale-125" : ""
                }`}
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2.5 md:w-2.5" />
              </span>

              {/* Pills are laid out for the 900px artboard, so they shrink on
                  narrow screens to stop neighbouring cities colliding. */}
              <span
                className={`absolute left-1/2 top-3.5 flex h-8 -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2 text-white transition-colors duration-300 md:top-5.25 md:h-11 md:px-2.5 ${
                  isOn ? "bg-accent" : "bg-black group-hover:bg-ink"
                }`}
              >
                <span className="font-sans text-xs font-light md:text-base">
                  {city.locationCount}
                </span>
                <span className="font-sans text-xs font-semibold md:text-base">
                  {city.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Container>
  );
}
