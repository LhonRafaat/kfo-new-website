"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Parallax } from "@/components/Parallax";
import { ScrollCurve } from "@/components/ScrollCurve";
import { ArrowLeft, ArrowRight, PauseIcon, PlayIcon } from "@/components/icons";
import { news } from "@/lib/content";

const ROTATE_MS = 5000;

export function NewsExperts() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback((dir: 1 | -1) => {
    setActive((i) => (i + dir + news.length) % news.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((i) => (i + 1) % news.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section className="relative overflow-hidden bg-cream">
      <TextureOverlay src="/images/texture-paper-news.webp" opacity={0.35} blend="multiply" />
      <ScrollCurve
        variant="news"
        className="pointer-events-none absolute bottom-0 left-0 h-[55%] w-full text-ink/40"
      />

      <Container className="relative z-10 py-20 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="display-lg text-ink">
            News from <em className="italic">Experts</em>
          </h2>
          <AccentLink href="/news">Read all news</AccentLink>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* News list + controls */}
          <div className="order-2 lg:order-1">
            <ul className="flex flex-col gap-8">
              {news.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.title}>
                    <Link href={item.href} onMouseEnter={() => setActive(i)} className="group block">
                      <span className="font-sans text-sm tracking-wide text-ink/60">{item.date}</span>
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
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {playing ? <PauseIcon className="h-7 w-7" /> : <PlayIcon className="h-7 w-7" />}
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous news item"
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-7 w-7 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next news item"
                className="border-b border-ink/40 pb-1 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowRight className="h-7 w-7 rotate-90" />
              </button>
            </div>
          </div>

          {/* Feature image — crossfades to the highlighted item's image */}
          <div className="order-1 lg:order-2">
            <Parallax speed={0.1} className="relative aspect-[11/10] w-full rounded-sm bg-ink/10 shadow-md">
              {news.map((item, i) => (
                <Image
                  key={item.title}
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className={`object-cover transition-opacity duration-700 ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
