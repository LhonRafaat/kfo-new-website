"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight, MagnifyingGlassIcon } from "@/components/icons";
import { locationDbRows, locationPins, type LocationDbRow } from "@/lib/content";

const primaryCities = locationPins.filter((p) => p.primary).map((p) => p.city);
const categories = Array.from(new Set(locationDbRows.map((row) => row.type)));

function matches(row: LocationDbRow, query: string) {
  const haystack = `${row.title} ${row.citySuffix} ${row.type}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

/**
 * "Locations" bar + refine-search dropdown + the row list itself (Figma
 * "Location DB - V2", frames 338:277 "Frame 93", 338:516 "Frame 95" and
 * 338:228 "Frame 91"). One client component because the chips, the panel's
 * checkboxes and the row list all share the same filter state.
 */
export function LocationsList() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleSet = (
    setter: Dispatch<SetStateAction<Set<string>>>,
    value: string,
  ) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });

  // Close the panel on outside click / Escape, like the nav menu overlay.
  useEffect(() => {
    if (!panelOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panelOpen]);

  const filtered = useMemo(
    () =>
      locationDbRows.filter((row) => {
        if (query && !matches(row, query)) return false;
        if (
          cities.size > 0 &&
          ![...cities].some((city) =>
            row.citySuffix.toLowerCase().includes(city.toLowerCase()),
          )
        )
          return false;
        if (types.size > 0 && !types.has(row.type)) return false;
        return true;
      }),
    [query, cities, types],
  );

  const activeCount = cities.size + types.size + (query ? 1 : 0);

  return (
    <Container className="relative z-10 pb-24 pt-16 md:pb-32">
      <Reveal
        as="div"
        className="relative z-30 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="font-serif text-[32px] font-medium leading-tight text-ink">
          Locations
        </h2>

        <div ref={panelRef} className="relative flex flex-wrap items-center gap-x-6 gap-y-3">
          {primaryCities.map((city) => {
            const isOn = cities.has(city);
            return (
              <button
                key={city}
                type="button"
                onClick={() => toggleSet(setCities, city)}
                aria-pressed={isOn}
                className={`font-sans text-base font-semibold uppercase transition-colors duration-300 ${
                  isOn
                    ? "text-accent [box-shadow:inset_0_-2px_0_0_currentColor]"
                    : "text-espresso/80 hover:text-accent"
                }`}
              >
                {city}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-controls="locations-refine-panel"
            className="flex items-center gap-2 font-sans text-base font-semibold uppercase text-espresso/80 transition-colors duration-300 hover:text-accent"
          >
            More Filters
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent font-sans text-xs font-semibold normal-case text-white">
                {activeCount}
              </span>
            )}
            <CaretRight
              className={`h-6 w-6 text-espresso/80 transition-transform duration-300 ${
                panelOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {panelOpen && (
            <div
              id="locations-refine-panel"
              className="absolute right-0 top-full z-20 mt-4 w-73 animate-menu-in rounded-2xl bg-panel p-4 shadow-xl"
            >
              <label className="flex items-center gap-2.5 rounded-lg bg-black px-3 py-2">
                <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-white" />
                <span className="sr-only">Search locations</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent font-sans text-base text-white placeholder:text-white/70 focus:outline-none"
                />
              </label>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setCategoryOpen((v) => !v)}
                  aria-expanded={categoryOpen}
                  className="flex items-center justify-between font-sans text-base font-semibold text-ink"
                >
                  Category
                  <CaretRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      categoryOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {categoryOpen && (
                  <div className="flex flex-col items-start gap-2 pl-1">
                    {categories.map((type) => {
                      const isOn = types.has(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleSet(setTypes, type)}
                          aria-pressed={isOn}
                          className={`font-sans text-sm font-semibold uppercase transition-colors duration-300 ${
                            isOn ? "text-accent" : "text-espresso/80 hover:text-accent"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between font-sans text-base font-semibold text-ink">
                  City
                  <CaretRight className="h-4 w-4 rotate-90" />
                </div>
                <div className="flex flex-col items-start gap-2 pl-1">
                  {primaryCities.map((city) => {
                    const isOn = cities.has(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => toggleSet(setCities, city)}
                        aria-pressed={isOn}
                        className={`font-sans text-sm font-semibold uppercase transition-colors duration-300 ${
                          isOn ? "text-accent" : "text-espresso/80 hover:text-accent"
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="mt-4 w-full rounded-lg bg-ink py-2 font-sans text-base font-light text-white transition-colors duration-300 hover:bg-ink/85"
              >
                Refine Search
              </button>
            </div>
          )}
        </div>
      </Reveal>

      {/* Figma's row list is dense: 24px between rows (auto-layout itemSpacing),
          40px below the filter bar. Mobile keeps a larger gap so stacked rows
          stay visually separate from their own internal spacing. */}
      <div className="mt-10 flex flex-col gap-10 md:gap-6">
        {filtered.length === 0 ? (
          <p className="body-lg py-12 text-center text-ink/70">
            No locations match your filters yet — try clearing a few.
          </p>
        ) : (
          filtered.map((row) => <LocationRow key={row.title} row={row} />)
        )}
      </div>
    </Container>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Labels sit at 64% opacity in the Figma; values are full ink. */}
      <p className="font-sans text-xl font-normal text-ink/65">{label}</p>
      <p className="font-sans text-xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function LocationRow({ row }: { row: LocationDbRow }) {
  const titleClass =
    "font-serif text-2xl font-medium italic leading-tight text-ink";

  const titleBlock = (
    <div className="flex flex-col gap-1">
      <h3 className={titleClass}>
        {row.slug ? (
          <Link href={`/locations/${row.slug}`} className="link-underline">
            {row.title}
          </Link>
        ) : (
          row.title
        )}
      </h3>
      <p className="font-sans text-xl font-normal text-ink">{row.citySuffix}</p>
    </div>
  );

  const image = (
    <div className="relative h-64 w-full overflow-hidden rounded sm:h-80 md:h-100">
      <Image
        src={row.image}
        alt={row.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 587px"
        className="object-cover"
      />
    </div>
  );

  if (row.variant === "compact") {
    return (
      <Reveal
        as="article"
        className="grid grid-cols-1 gap-6 md:grid-cols-[388fr_388fr_388fr] md:items-center md:gap-4"
      >
        {titleBlock}
        <Field label="Type" value={row.type} />
        {image}
      </Reveal>
    );
  }

  return (
    <Reveal
      as="article"
      className="grid grid-cols-1 gap-6 md:grid-cols-[587fr_587fr] md:items-center md:gap-4"
    >
      <div className="relative flex flex-col gap-4">
        {row.watermark && (
          <Image
            src={`/images/location-row-watermark-${row.watermark}.svg`}
            alt=""
            aria-hidden
            width={302}
            height={268}
            unoptimized
            className="pointer-events-none absolute -bottom-6 right-0 hidden w-3/5 max-w-75 opacity-90 md:block"
          />
        )}
        <div className="relative">{titleBlock}</div>
        <div className="relative">
          <Field label="Type" value={row.type} />
        </div>
        {row.area && (
          <div className="relative">
            <Field label="Area" value={row.area} />
          </div>
        )}
        {row.lastActiveDate && (
          <div className="relative">
            <Field label="Last Active Date" value={row.lastActiveDate} />
          </div>
        )}
      </div>
      {image}
    </Reveal>
  );
}
