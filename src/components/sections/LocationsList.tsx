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
import {
  CaretRight,
  DotsThree,
  MagnifyingGlassIcon,
  Underline,
} from "@/components/icons";
import {
  LocationAccessBar,
  type AccessStatus,
} from "@/components/sections/LocationAccessBar";
import {
  freeLocations,
  locationDbRows,
  locationPins,
  locationsGate,
  locationsPerPage,
  type LocationDbRow,
} from "@/lib/content";

/** Remembers a verified visitor between visits. See the note on
 *  `locationsGate` in content.ts — there is no backend behind this yet. */
const UNLOCKED_KEY = "kfo:locations-unlocked";

const primaryCities = locationPins.filter((p) => p.primary).map((p) => p.city);
const categories = Array.from(new Set(locationDbRows.map((row) => row.type)));

function matches(row: LocationDbRow, query: string) {
  const haystack = `${row.title} ${row.citySuffix} ${row.type}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

/**
 * "Locations" bar + refine-search dropdown + the card list and its pagination
 * (Figma 522:314 — bar 522:474, panel 522:538, cards 528:1194, pager 529:1369).
 * One client component because the chips, the panel's options, the list and the
 * page number all share the same filter state.
 */
export function LocationsList() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<AccessStatus | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // `?verified=1` stands in for the link the verification e-mail would carry.
  // Read from `window` rather than `useSearchParams` so this page keeps
  // prerendering without a Suspense boundary.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("verified") === "1") {
      localStorage.setItem(UNLOCKED_KEY, "1");
      setUnlocked(true);
      setStatus("verified");
      return;
    }
    if (localStorage.getItem(UNLOCKED_KEY) === "1") setUnlocked(true);
  }, []);

  // The success notice states something the page now shows for itself.
  useEffect(() => {
    if (status !== "verified") return;
    const t = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(t);
  }, [status]);

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

  const pageCount = Math.max(1, Math.ceil(filtered.length / locationsPerPage));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * locationsPerPage;
  const shown = filtered.slice(start, start + locationsPerPage);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    // Land at the top of the list rather than wherever the last card left you.
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeCount = cities.size + types.size + (query ? 1 : 0);

  return (
    <Container className="relative z-10 pb-12 pt-0">
      <Reveal
        as="div"
        className="relative z-30 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="heading-section text-ink">Locations</h2>

        <div
          ref={panelRef}
          className="relative flex flex-wrap items-center gap-x-6 gap-y-3"
        >
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
                    : "text-cocoa/80 hover:text-accent"
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
            className="flex items-center gap-2 font-sans text-base font-semibold uppercase text-cocoa/80 transition-colors duration-300 hover:text-accent"
          >
            More Filters
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent font-sans text-xs font-semibold normal-case text-white">
                {activeCount}
              </span>
            )}
            <CaretRight
              className={`h-6 w-6 transition-transform duration-300 ${
                panelOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {panelOpen && (
            <RefinePanel
              query={query}
              setQuery={(value) => {
                setPage(1);
                setQuery(value);
              }}
              cities={cities}
              types={types}
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
              onToggleCity={(city) => toggleSet(setCities, city)}
              onToggleType={(type) => toggleSet(setTypes, type)}
              onClose={() => setPanelOpen(false)}
            />
          )}
        </div>
      </Reveal>

      {/* Figma: 48px from the bar to the first card, 24px between cards. */}
      <div ref={listRef} className="mt-12 flex scroll-mt-24 flex-col gap-6">
        {shown.length === 0 ? (
          <p className="body-lg py-12 text-center text-ink/70">
            No locations match your filters yet — try clearing a few.
          </p>
        ) : (
          shown.map((row, i) => (
            <LocationCard
              key={row.title}
              row={row}
              locked={!unlocked && start + i >= freeLocations}
              onRequestAccess={() => setStatus("email")}
            />
          ))
        )}
      </div>

      {status && (
        <LocationAccessBar status={status} onSubmit={() => setStatus("sent")} />
      )}

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

/** White dropdown under "More Filters" (Figma 522:538). */
function RefinePanel({
  query,
  setQuery,
  cities,
  types,
  categoryOpen,
  setCategoryOpen,
  onToggleCity,
  onToggleType,
  onClose,
}: {
  query: string;
  setQuery: (value: string) => void;
  cities: Set<string>;
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
      id="locations-refine-panel"
      className="absolute right-0 top-full z-20 mt-6 flex w-91 animate-menu-in flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl"
    >
      <label className="flex h-10 items-center gap-2.5 rounded-lg bg-black/8 px-3">
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-black" />
        <span className="sr-only">Search locations</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
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
            className={`h-4 w-4 text-cocoa/80 transition-transform duration-300 ${
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
          {primaryCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onToggleCity(city)}
              aria-pressed={cities.has(city)}
              className={option(cities.has(city))}
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
 * One database entry as a full-bleed photo card (Figma 528:1195): 1184×400,
 * r16, with black fading left→right at 64% over the photo so the white details
 * stay legible, and the text block centred vertically in 48px of padding.
 */
function LocationCard({
  row,
  locked,
  onRequestAccess,
}: {
  row: LocationDbRow;
  locked: boolean;
  onRequestAccess: () => void;
}) {
  const fields = [
    { label: "Type", value: row.type },
    { label: "Area", value: row.area },
    { label: "Last Active Date", value: row.lastActiveDate },
  ].filter((f) => f.value);

  const body = (
    <>
      <Image
        src={row.image}
        alt={row.imageAlt}
        fill
        sizes="(max-width: 1280px) 100vw, 1184px"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-64"
      />

      <div className="relative flex h-full flex-col justify-center p-6 text-white md:p-12">
        <div className="flex max-w-120 flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif italic text-[1.375rem] font-medium leading-[1.139]">
              {row.title}
            </h3>
            <p className="font-sans text-base leading-[1.4]">
              {row.citySuffix}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4 pt-1.5">
            {fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-1">
                <p className="font-sans text-base leading-[1.4]">
                  {field.label}
                </p>
                <p className="font-sans text-base font-semibold leading-[1.4]">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const shell =
    "group relative block h-90 w-full overflow-hidden rounded-2xl md:h-100";

  // Registration gate (Figma "Frame 204", 651:524): the card blurs and darkens
  // behind a centred invitation. `scale-105` pushes the blur's soft edges past
  // the rounded clip so the corners stay crisp.
  if (locked) {
    return (
      // `reveal-underline` opts the CTA's rule into drawing itself in with the
      // card — `.underline-wave` starts fully clipped otherwise.
      <Reveal as="article" className="reveal-underline">
        <div className={shell}>
          <div aria-hidden className="absolute inset-0 scale-105 blur-[6px]">
            {body}
          </div>
          {/* Figma's own render of this state sits at ~12/255 mean luminance;
              80% left the card at 17, 85% lands on 12.5. */}
          <div aria-hidden className="absolute inset-0 bg-black/85" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <p className="font-serif text-[1.375rem] font-medium italic leading-[1.139]">
              {locationsGate.title}
            </p>
            {/* 4px under the title, per the container's item spacing. */}
            <p className="mt-1 font-sans text-base leading-[1.4]">
              {locationsGate.body}
            </p>

            <button
              type="button"
              onClick={onRequestAccess}
              className="mt-12 pb-2.5 pt-4 transition-colors duration-300 hover:text-accent"
            >
              <span className="relative inline-block">
                <span className="font-serif text-xl font-medium capitalize italic leading-[1.139] tracking-label">
                  {locationsGate.cta}
                </span>
                {/* Figma draws the rule exactly as wide as the label. The wave
                    fills 115 of the SVG's 150-unit box, so a box of 130.44% of
                    the label does that at any text size — and taking it out of
                    the flow keeps the button's width the label's, so the group
                    centres on the marks rather than on the box's empty tail. */}
                <Underline className="absolute left-0 top-full mt-[3px] !h-[7px] w-[130.44%]" />
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal as="article">
      {row.slug ? (
        <Link href={`/locations/${row.slug}`} className={shell}>
          {body}
        </Link>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </Reveal>
  );
}

/** "1-5 of 9 LOCATIONS" plus the numbered pager (Figma 529:1369). */
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
      aria-label="Location database pages"
      className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
    >
      <p className="font-sans text-base font-semibold uppercase text-cocoa/80">
        {from}-{to} of {total} Locations
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
