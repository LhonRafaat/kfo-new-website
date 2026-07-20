import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import type { LocationEntry } from "@/lib/content";

/**
 * "Location" block: the city heading and blurb over a silhouette of the
 * governorate, with the single pin linking out to Google Maps.
 */
export function LocationRegion({
  city,
  cityBlurb,
  pin,
  mapsUrl,
}: Pick<LocationEntry, "city" | "cityBlurb" | "pin" | "mapsUrl">) {
  return (
    <Container className="relative z-10 mt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[434px_439px] lg:justify-between">
        <Reveal as="div">
          <Eyebrow>Location</Eyebrow>
          <h2 className="display-lg mt-4 text-ink">{city}</h2>
        </Reveal>
        <Reveal as="p" delay={80} className="body-lg lg:col-start-2 lg:pt-1">
          {cityBlurb}
        </Reveal>
      </div>

      {/* 644×572 artboard — the pin is placed as a % of it so both scale as one */}
      <div className="relative mx-auto mt-20 aspect-644/572 w-full max-w-161">
        {/* Figma's SVG export flattens away the contour waves inside the
            silhouette, so this is its 2× PNG render instead. */}
        <Image
          src="/images/kurdistan-region-map.png"
          alt={`Map of the ${city} region`}
          fill
          sizes="(max-width: 644px) 100vw, 644px"
          className="object-contain"
        />

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/25 transition-transform duration-300 ease-out group-hover:scale-125 md:h-6 md:w-6">
            <span className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2.5 md:w-2.5" />
          </span>
          <span className="absolute left-1/2 top-3.5 flex h-8 -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-black px-2.5 font-sans text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-accent md:top-5.25 md:h-11 md:px-2.5 md:text-base">
            Open in Google Maps
          </span>
        </a>
      </div>
    </Container>
  );
}
