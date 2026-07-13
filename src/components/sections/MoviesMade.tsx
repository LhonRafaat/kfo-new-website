"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { movies } from "@/lib/content";

export function MoviesMade() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-cocoa text-white">
      <TextureOverlay src="/images/floral-texture.webp" opacity={0.19} blend="soft-light" />

      <Container className="relative z-10 pt-20 md:pt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display-md text-white">
            Movies made
            <br />
            <em className="italic">in Kurdistan</em>
          </h2>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="max-w-sm font-sans text-base leading-relaxed text-white/80 md:text-right">
              Here are some of the movies that were shot in different regions of Kurdistan.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous posters"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:bg-white/10"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next posters"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:bg-white/10"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="no-scrollbar relative z-10 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-6 pb-20 pt-14 sm:px-8 lg:px-12 xl:px-[52px]"
      >
        {movies.map((movie) => (
          <div
            key={movie.title}
            className={`group relative aspect-[2/3] w-40 shrink-0 snap-start overflow-hidden rounded-sm shadow-lg shadow-black/30 transition-transform duration-500 ease-out sm:w-48 md:w-56 ${
              movie.featured ? "-translate-y-6" : "hover:-translate-y-3"
            }`}
          >
            <Image
              src={movie.src}
              alt={`${movie.title} — film poster`}
              fill
              sizes="(max-width: 640px) 40vw, 224px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
