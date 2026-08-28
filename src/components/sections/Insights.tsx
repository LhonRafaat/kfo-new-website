"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import {
  ArrowDownSmall,
  ArrowUpSmall,
  PauseSmall,
  PlayIcon,
  Underline,
} from "@/components/icons";
import { news } from "@/lib/content";

const ROTATE_MS = 5000;
const PAGE_SIZE = 3;
const pages = Math.ceil(news.length / PAGE_SIZE);

/**
 * "Insights" (Figma "Highlights Section", 317:789): three headlines —
 * the active one at full ink with the wavy accent underline drawn beneath it,
 * the others dimmed to 56% — with pause/prev/next controls pinned to the
 * bottom of the column and the feature photo crossfading on the right.
 */
export function Insights() {
  const [index, setIndex] = useState(0); // highlighted article across the pool
  const [playing, setPlaying] = useState(true);

  const page = Math.floor(index / PAGE_SIZE);
  const activeInPage = index % PAGE_SIZE;
  const visible = news.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % news.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [playing]);

  // Arrows page through the pool — three brand-new articles each click.
  const goPage = (dir: 1 | -1) =>
    setIndex(((page + dir + pages) % pages) * PAGE_SIZE);

  // 44px on a phone — the Figma's 32px box is a comfortable mouse target but
  // an awkward thumb one — stepping back to the drawn size from md up.
  const controlClass =
    "flex h-11 w-11 items-center justify-center border-b-[0.57px] border-ink pb-1.5 text-ink transition-colors duration-300 hover:border-accent hover:text-accent md:h-8 md:w-8 md:pb-1";
  const controlIconClass = "h-[1.125rem] w-[1.125rem] md:h-3.5 md:w-3.5";

  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        {/* Heading and the "read all" link share a row at every width. */}
        <div className="flex flex-row items-center justify-between gap-4">
          <Reveal as="h2" className="heading-section text-ink">
            <em className="italic">Insights</em>
          </Reveal>
          <AccentLink href="/news" className="shrink-0">
            Read all insights
          </AccentLink>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Headlines + controls — stretched to the image's height */}
          <div className="order-2 flex flex-col md:order-1">
            <div key={page} className="flex flex-col gap-8 md:mt-[6.5rem]">
              {visible.map((item, i) => {
                const isActive = i === activeInPage;
                return (
                  <div key={i} className="relative">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setIndex(page * PAGE_SIZE + i)}
                      className={`crossfade group block ${
                        isActive ? "opacity-100" : "opacity-[0.56]"
                      }`}
                    >
                      <span className="font-sans text-base leading-6 tracking-[0.02em] text-ink">
                        {item.date}
                      </span>
                      <p className="heading-card mt-1 max-w-[435px] font-serif font-medium tracking-[0.02em] text-ink group-hover:text-espresso">
                        {item.title}
                      </p>
                    </Link>
                    {/* Wavy accent rule under the active headline, drawn inside the row gap */}
                    <Underline
                      strokeWidth={1.5} /* Figma node 317:803 */
                      className={`pointer-events-none !absolute -bottom-[15px] left-0 !mt-0 !h-[5px] !w-3/4 ${
                        isActive ? "" : "!opacity-0"
                      }`}
                      style={{ clipPath: isActive ? "inset(0 0 0 0)" : undefined }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex items-center gap-3 md:mt-auto md:gap-[9px]">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className={controlClass}
              >
                {playing ? (
                  <PauseSmall className={controlIconClass} />
                ) : (
                  <PlayIcon className={controlIconClass} />
                )}
              </button>
              <button
                type="button"
                onClick={() => goPage(-1)}
                aria-label="Previous articles"
                className={controlClass}
              >
                <ArrowUpSmall className={controlIconClass} />
              </button>
              <button
                type="button"
                onClick={() => goPage(1)}
                aria-label="Next articles"
                className={controlClass}
              >
                <ArrowDownSmall className={controlIconClass} />
              </button>
            </div>
          </div>

          {/* Feature image — crossfades to the highlighted item's image */}
          <Reveal className="order-1 md:order-2">
            <div className="relative aspect-3/2 w-full md:aspect-572/515 overflow-hidden rounded-2xl bg-ink/10 md:max-h-[calc(100svh-280px)]">
              {visible.map((item, i) => (
                <Image
                  key={`${page}-${i}`}
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 48vw"
                  className={`crossfade object-cover ${
                    i === activeInPage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
