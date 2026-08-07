"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight, DotsThree, MagnifyingGlassIcon } from "@/components/icons";
import { media } from "@/lib/media";
import type { Agency, IndustryGuidePage } from "@/lib/strapi";

/** Lowercase and flatten punctuation, so the Figma's "post-production" chip
 *  still matches a listing filed as "Post Production". */
const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** The third card row's value — the listing's category, by name. */
const fieldValue = (agency: Agency) => agency.category?.name ?? "";

function haystack(agency: Agency) {
  return normalise(
    `${agency.name} ${agency.displayName} ${agency.city} ${agency.website} ${fieldValue(agency)}`,
  );
}

/**
 * The directory half of /industry-guide (Figma 507:795): the count headline and
 * its quick filters, the three-up card grid, and the pager underneath.
 *
 * One client component for the same reason as the location database — the
 * chips, the refine panel, the grid and the page number are all one piece of
 * filter state.
 */
export function IndustryDirectory({
  page: copy,
  agencies,
}: {
  page: IndustryGuidePage;
  agencies: Agency[];
}) {
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<Set<string>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [page, setPage] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // The refine panel's own lists, taken from whatever the directory holds.
  const cities = useMemo(
    () => Array.from(new Set(agencies.map((a) => a.city))),
    [agencies],
  );
  const categories = useMemo(
    () => Array.from(new Set(agencies.map(fieldValue).filter(Boolean))),
    [agencies],
  );

  const toggleSet = (
    setter: Dispatch<SetStateAction<Set<string>>>,
    value: string,
  ) => {
    setPage(1); // a narrower list can't keep the page you were on
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

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
      agencies.filter((agency) => {
        const text = haystack(agency);
        if (query && !text.includes(normalise(query))) return false;
        // The chips are a free-text match rather than a taxonomy lookup, so a
        // real dataset's categories start working the moment it lands.
        if (quick.size > 0 && ![...quick].some((q) => text.includes(q)))
          return false;
        if (selectedCities.size > 0 && !selectedCities.has(agency.city))
          return false;
        if (types.size > 0 && !types.has(fieldValue(agency))) return false;
        return true;
      }),
    [agencies, query, quick, selectedCities, types],
  );

  const perPage = copy.perPage;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * perPage;
  const shown = filtered.slice(start, start + perPage);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    // Land at the top of the grid rather than wherever the last card left you.
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeCount = selectedCities.size + types.size + (query ? 1 : 0);

  return (
    <Container className="relative z-10 pb-12 pt-12">
      {/* Figma 505:116 — headline left, quick filters right, 24px apart. */}
      <Reveal
        as="div"
        className="relative z-30 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="font-serif text-[1.375rem] font-medium leading-[1.139] text-ink">
          {copy.countLine}
        </h2>

        <div
          ref={panelRef}
          className="relative flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {copy.quickFilters.map((filter) => {
            const key = normalise(filter.value || filter.label);
            const isOn = quick.has(key);
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => toggleSet(setQuick, key)}
                aria-pressed={isOn}
                className={`font-sans text-base font-semibold uppercase transition-colors duration-300 ${
                  isOn
                    ? "text-accent [box-shadow:inset_0_-2px_0_0_currentColor]"
                    : "text-cocoa/80 hover:text-accent"
                }`}
              >
                {filter.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-controls="industry-refine-panel"
            className="flex items-center gap-2 font-sans text-base font-semibold uppercase text-cocoa/80 transition-colors duration-300 hover:text-accent"
          >
            {copy.filtersLabel}
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent font-sans text-xs font-semibold normal-case text-white">
                {activeCount}
              </span>
            )}
            {/* Figma draws this caret pointing down (505:125), so it rests at
                90° and swings back up when the panel is open. */}
            <CaretRight
              className={`disclosure-caret h-6 w-6 ${
                panelOpen ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>

          {panelOpen && (
            <RefinePanel
              copy={copy}
              cities={cities}
              categories={categories}
              query={query}
              setQuery={(value) => {
                setPage(1);
                setQuery(value);
              }}
              selectedCities={selectedCities}
              types={types}
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
              onToggleCity={(city) => toggleSet(setSelectedCities, city)}
              onToggleType={(type) => toggleSet(setTypes, type)}
              onClose={() => setPanelOpen(false)}
            />
          )}
        </div>
      </Reveal>

      {/* Figma: 40px from the bar to the first row, 24px between cards. */}
      <div
        ref={listRef}
        className="mt-10 grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.length === 0 ? (
          <p className="body-lg col-span-full py-12 text-center text-ink/70">
            {copy.emptyMessage}
          </p>
        ) : (
          shown.map((agency, i) => (
            <AgencyCard
              key={agency.slug}
              agency={agency}
              // Cards cascade across each row rather than all landing at once.
              delay={(i % 3) * 80}
            />
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <Pager
          page={current}
          pageCount={pageCount}
          from={start + 1}
          to={start + shown.length}
          total={filtered.length}
          onGo={goTo}
        />
      )}
    </Container>
  );
}

/** White dropdown under "More Filters", shared idiom with /locations. */
function RefinePanel({
  copy,
  cities,
  categories,
  query,
  setQuery,
  selectedCities,
  types,
  categoryOpen,
  setCategoryOpen,
  onToggleCity,
  onToggleType,
  onClose,
}: {
  copy: IndustryGuidePage;
  cities: string[];
  categories: string[];
  query: string;
  setQuery: (value: string) => void;
  selectedCities: Set<string>;
  types: Set<string>;
  categoryOpen: boolean;
  setCategoryOpen: Dispatch<SetStateAction<boolean>>;
  onToggleCity: (city: string) => void;
  onToggleType: (type: string) => void;
  onClose: () => void;
}) {
  const option = (isOn: boolean) =>
    `font-sans text-base font-semibold uppercase transition-colors duration-300 ${
      isOn ? "text-accent" : "text-cocoa/80 hover:text-accent"
    }`;

  return (
    <div
      id="industry-refine-panel"
      className="absolute right-0 top-full z-20 mt-6 flex w-91 animate-menu-in flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl"
    >
      <label className="flex h-10 items-center gap-2.5 rounded-lg bg-black/8 px-3">
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-black" />
        <span className="sr-only">Search the industry guide</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="w-full bg-transparent font-sans text-base tracking-[0.02em] text-ink placeholder:text-ink/60 focus:outline-none"
        />
      </label>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => setCategoryOpen((v) => !v)}
          aria-expanded={categoryOpen}
          className="flex h-9.5 items-center justify-between rounded-lg bg-black/2 px-4 font-sans text-base font-semibold text-ink"
        >
          Category
          <CaretRight
            className={`disclosure-caret h-4 w-4 text-cocoa/80 ${
              categoryOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        {categoryOpen && (
          <div className="flex flex-col items-start gap-2.5 px-4">
            {categories.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onToggleType(type)}
                aria-pressed={types.has(type)}
                className={option(types.has(type))}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {/* The city list is the open disclosure in the Figma, so it starts open. */}
        <div className="flex h-9.5 items-center justify-between rounded-lg bg-black/2 px-4 font-sans text-base font-semibold text-ink">
          City
          <CaretRight className="h-4 w-4 rotate-90 text-cocoa/80" />
        </div>
        <div className="flex flex-col items-start gap-2.5 px-4">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onToggleCity(city)}
              aria-pressed={selectedCities.has(city)}
              className={option(selectedCities.has(city))}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="h-10 w-full rounded-lg bg-ink font-sans text-base tracking-[0.02em] text-white transition-colors duration-300 hover:bg-ink/85"
      >
        Refine Search
      </button>
    </div>
  );
}

/**
 * One directory listing (Figma 425:221): a 379×427 card on the parchment
 * surface — photo across the top with the card's own 8px radius, then the
 * black avatar and agency name, then three label/value rows separated by
 * hairlines at 16% black. Everything inside is inset 16px; the rows and the
 * dividers sit 12px apart.
 *
 * The whole card is the link to its detail page; the photo eases up a touch on
 * hover, the same affordance the location cards use.
 */
function AgencyCard({ agency, delay }: { agency: Agency; delay: number }) {
  const photo = media(agency.image);
  const logo = media(agency.logo);

  const rows = [
    { label: "Location", value: agency.city },
    { label: "Website", value: agency.website },
    { label: agency.fieldLabel, value: fieldValue(agency) },
  ];

  return (
    <Reveal as="article" delay={delay} className="flex">
      <Link
        href={`/industry-guide/${agency.slug}`}
        className="group flex w-full flex-col overflow-hidden rounded-lg bg-card pb-3"
      >
        <div className="relative aspect-379/195 w-full overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 379px"
            // Figma desaturates the one colour photo among its six uploads
            // (fills on 425:292 / 507:729 carry saturation -1). Kept as a CSS
            // filter rather than baked into the asset so a colour photo dropped
            // in later still reads as the design intends.
            className="scale-100 object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-4 px-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
            <Image
              src={logo.src}
              alt=""
              width={46}
              height={41}
              className="h-10.25 w-11.5 object-contain"
            />
          </span>
          <h3 className="font-serif text-xl font-medium leading-normal text-black transition-colors duration-300 group-hover:text-accent">
            {agency.name}
          </h3>
        </div>

        {rows.map((row) => (
          <Fragment key={row.label}>
            {/* Figma draws these as zero-height LINE nodes, so the hairline is
                pulled back out of the flow (`h-px -mb-px`) and the 12px gaps on
                either side of it stay exactly 12px. */}
            <div aria-hidden className="mt-3 -mb-px h-px bg-black/16" />
            <div className="mt-3 flex h-6 items-center justify-between gap-4 px-4">
              <span className="font-serif text-base font-medium leading-6 text-ink">
                {row.label}
              </span>
              <span className="font-sans text-base font-medium leading-6 text-ink">
                {row.value}
              </span>
            </div>
          </Fragment>
        ))}
      </Link>
    </Reveal>
  );
}

/** "1-9 of 9 TEAMS" plus the numbered pager (Figma 507:843). */
function Pager({
  page,
  pageCount,
  from,
  to,
  total,
  onGo,
}: {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  onGo: (page: number) => void;
}) {
  // Figma shows first … current window … last; with few pages it's just the
  // plain run of numbers.
  const numbers: (number | "gap")[] = [];
  for (let n = 1; n <= pageCount; n++) {
    if (n === 1 || n === pageCount || Math.abs(n - page) <= 1) numbers.push(n);
    else if (numbers[numbers.length - 1] !== "gap") numbers.push("gap");
  }

  const arrow = "flex h-6 w-6 items-center justify-center disabled:opacity-40";

  return (
    <Reveal
      as="nav"
      aria-label="Industry guide pages"
      className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
    >
      <p className="font-sans text-base font-semibold uppercase text-cocoa/80">
        {from}-{to} of {total} Teams
      </p>

      <div className="flex items-center gap-6 text-cocoa/80">
        <button
          type="button"
          onClick={() => onGo(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={arrow}
        >
          <CaretRight className="h-4 w-4 rotate-180" />
        </button>

        {numbers.map((n, i) =>
          n === "gap" ? (
            <DotsThree key={`gap-${i}`} className="h-6 w-6" />
          ) : (
            <button
              key={n}
              type="button"
              onClick={() => onGo(n)}
              aria-current={n === page ? "page" : undefined}
              className={`flex h-6 min-w-6 items-center justify-center font-sans text-base font-semibold transition-colors duration-300 hover:text-accent ${
                n === page ? "text-accent" : ""
              }`}
            >
              {n}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onGo(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
          className={arrow}
        >
          <CaretRight className="h-4 w-4" />
        </button>
      </div>
    </Reveal>
  );
}
