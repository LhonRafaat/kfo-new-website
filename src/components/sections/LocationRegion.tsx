import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import type { LocationEntry } from "@/lib/content";

/**
 * "Location" block (Figma 338:1167 / 522:665): the city heading on the left, its
 * blurb on the right, and the Kurdistan silhouette between them — the same
 * vector as the database hero map, now filled slate and carrying a single ink
 * pin that links out to Google Maps. It overlaps both text columns slightly, as
 * the Figma lays it out, so the middle grid column is deliberately narrower
 * than the map and the map bleeds out of it.
 */
export function LocationRegion({
  city,
  cityBlurb,
  pin,
  mapsUrl,
}: Pick<LocationEntry, "city" | "cityBlurb" | "pin" | "mapsUrl">) {
  return (
    <Container className="relative z-10 mt-16">
      {/* No column gap at lg: the Figma's three columns tile the 1184 content
          width exactly (434 + 311 + 439) and the map bleeds out of the middle
          one over its neighbours. */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[434fr_311fr_439fr] lg:gap-0">
        <Reveal as="div">
          <Eyebrow>Location</Eyebrow>
          <h2 className="heading-section mt-4 text-ink">{city}</h2>
        </Reveal>

        {/* Order: on mobile the map drops below both text blocks. */}
        <Reveal
          delay={120}
          className="relative order-last mx-auto aspect-611/543 w-full max-w-100.75 lg:order-none lg:mt-12 lg:-mx-11.5 lg:w-[calc(100%+5.75rem)] lg:max-w-none"
        >
          <div
            role="img"
            aria-label={`Map of the Kurdistan Region with ${city} marked`}
            // Same silhouette as the database hero, recoloured by masking
            // rather than shipping a second copy of the path data.
            className="absolute inset-0 bg-slate [mask-image:url(/images/kurdistan-map-hero.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url(/images/kurdistan-map-hero.svg)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          />

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="flex h-3.75 w-3.75 items-center justify-center rounded-full bg-ink/25 transition-transform duration-300 ease-out group-hover:scale-125">
              <span className="block h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            <span className="absolute left-1/2 top-5.75 flex h-7 -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-black px-1.5 font-sans text-[0.625rem] font-semibold leading-[1.5] text-white transition-colors duration-300 group-hover:bg-accent">
              Open in Google Maps
            </span>
          </a>
        </Reveal>

        <Reveal as="p" delay={80} className="body-md leading-6 text-ink/60">
          {cityBlurb}
        </Reveal>
      </div>
    </Container>
  );
}
