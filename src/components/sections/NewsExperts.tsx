"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { ScrollCurve } from "@/components/ScrollCurve";
import { ArrowLeft, ArrowRight, PauseIcon, PlayIcon } from "@/components/icons";
import { news } from "@/lib/content";

const ROTATE_MS = 5000;
const PAGE_SIZE = 3;
const pages = Math.ceil(news.length / PAGE_SIZE);

export function NewsExperts() {
  const [index, setIndex] = useState(0); // highlighted article across the whole pool
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

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

  // Kick off the slide-up the first time the list scrolls into view.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Arrows page through the pool — three brand-new articles each click.
  const goPage = (dir: 1 | -1) =>
    setIndex(((page + dir + pages) % pages) * PAGE_SIZE);

  return (
    <section className="relative overflow-hidden bg-cream">
      <TextureOverlay
        src="/images/texture-paper-news.webp"
        opacity={0.35}
        blend="multiply"
      />
      {/* Flowing line — reveals on scroll and rides over a portion of the image */}
      <ScrollCurve
        variant="news"
        className="pointer-events-none absolute right-0 top-[26%] z-[15] h-[74%] w-full text-ink/60"
      />

      <Container className="relative z-10 py-20 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Reveal as="h2" className="display-lg text-ink">
            News from Experts
          </Reveal>
          <AccentLink href="/news">Read all news</AccentLink>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* News list + controls */}
          <div className="order-2 lg:order-1">
            <div
              ref={listRef}
              key={page}
              className="flex flex-col gap-8 overflow-hidden"
            >
              {visible.map((item, i) => {
                const isActive = i === activeInPage;
                return (
                  <div
                    key={i}
                    className={revealed ? "news-rise" : "opacity-0"}
                    style={
                      {
                        ["--rise-delay" as string]: `${i * 110}ms`,
                      } as CSSProperties
                    }
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setIndex(page * PAGE_SIZE + i)}
                      className="group block"
                    >
                      <span className="font-sans text-sm tracking-wide text-ink/60">
                        {item.date}
                      </span>
                      <p
                        className={`mt-2 inline font-serif text-xl leading-snug transition-colors duration-500 md:text-2xl ${
                          isActive
                            ? "text-ink [box-shadow:inset_0_-2px_0_0_#F19352]"
                            : "text-ink/40 group-hover:text-ink/70"
                        }`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {playing ? (
                  <PauseIcon className="h-7 w-7" />
                ) : (
                  <PlayIcon className="h-7 w-7" />
                )}
              </button>
              <button
                type="button"
                onClick={() => goPage(-1)}
                aria-label="Previous articles"
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-7 w-7 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => goPage(1)}
                aria-label="Next articles"
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowRight className="h-7 w-7 rotate-90" />
              </button>
            </div>
          </div>

          {/* Feature image — crossfades to the highlighted item's image */}
          <div className="relative order-1 lg:order-2">
            <Parallax
              speed={0.15}
              className="relative aspect-[11/10] w-full rounded-sm bg-ink/10 shadow-md"
            >
              {visible.map((item, i) => (
                <Image
                  key={`${page}-${i}`}
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className={`object-cover transition-opacity duration-700 ease-out ${
                    i === activeInPage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </Parallax>
            {/* Brand-orange wash fading to transparent toward the right */}
            <div
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                background:
                  "linear-gradient(90deg, rgba(241,147,82,0.55) 0%, rgba(241,147,82,0.22) 30%, rgba(241,147,82,0) 62%)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
