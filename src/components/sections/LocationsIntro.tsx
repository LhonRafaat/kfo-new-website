import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { lines } from "@/lib/text";
import { media } from "@/lib/media";
import type { City, LocationsPage } from "@/lib/strapi";

/**
 * Opening block of the location database page (Figma 522:314): eyebrow,
 * split-italic headline and copy in a 449px column on the left, with the
 * Kurdistan silhouette — now half the frame wide — carrying a counted pin per
 * city on the right. The two columns are centred against each other.
 */
export function LocationsIntro({
  page,
  cities,
}: {
  page: LocationsPage;
  cities: City[];
}) {
  return (
    // Figma: the map's top edge sits 62px under the 80px header, and the
    // "Locations" bar starts 161px below its bottom.
    <Container className="relative z-10 pb-24 pt-12 md:pb-40 md:pt-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[449fr_735fr] lg:gap-0">
        <div>
          <Reveal as="div">
            <Eyebrow>{page.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal as="h1" delay={60} className="heading-section mt-4 text-ink">
            {lines(page.heading)}
            {page.headingEmphasis && (
              <>
                <br />
                <em className="italic">{page.headingEmphasis}</em>
              </>
            )}
          </Reveal>

          {/* 32px between each block of the Figma's auto-layout column. */}
          <Reveal as="div" delay={120} className="mt-8">
            <p className="max-w-[368px] font-serif text-[1.375rem] font-medium leading-[1.5] text-ink">
              {page.lead}
              {page.leadEmphasis && (
                <>
                  {" "}
                  <em className="italic">{page.leadEmphasis}</em>
                </>
              )}
            </p>
          </Reveal>

          <Reveal as="div" delay={160} className="mt-8 space-y-6">
            {page.body.map((paragraph, i) => (
              <p key={i} className="body-md leading-6">
                {paragraph.text}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={200}
          // Figma insets the map 23px from the content column's right edge
          // rather than centring it in the space left over.
          className="relative mx-auto aspect-611/543 w-full max-w-162.5 lg:ml-auto lg:mr-5.75"
        >
          <PinMap image={page.mapImage} cities={cities} />
        </Reveal>
      </div>
    </Container>
  );
}

/**
 * Non-interactive silhouette of the Kurdistan Region with a counted pin per
 * city.
 *
 * This map is its own export (611×543) rather than a scaled copy of the 900×800
 * full-page silhouette, so its pins need their own percentages — `heroPinX` /
 * `heroPinY` on each city, derived from that node's bounding box. (Re-verified
 * against the redesigned hero map, 529:1392 at 650×577: identical shape and
 * identical pin placement, just drawn larger.)
 */
function PinMap({
  image,
  cities,
}: {
  image: LocationsPage["mapImage"];
  cities: City[];
}) {
  const map = media(image);

  return (
    <div className="relative h-full w-full">
      <Image
        src={map.src}
        alt={map.alt}
        fill
        // Vector already; the optimizer rejects SVG unless globally allowlisted.
        unoptimized
        className="object-contain"
      />

      {/* A city only gets a pin once someone has placed it — the record exists
          as soon as a location names it, but its coordinates are left blank
          until then, and an unplaced pin would land in the map's top corner. */}
      {cities
        .filter((city) => city.heroPinX != null && city.heroPinY != null)
        .map((city) => (
        <span
          key={city.slug}
          // Decorative: the map's alt text already carries this information.
          aria-hidden
          style={{ left: `${city.heroPinX}%`, top: `${city.heroPinY}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          {/* Figma keeps the badges at a fixed size however small the map
              renders, so these don't scale with the artboard. */}
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/25 md:h-6.5 md:w-6.5">
            <span className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2.75 md:w-2.75" />
          </span>
          <span className="absolute left-1/2 top-3.5 flex h-8 -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-black px-2 text-white md:top-8.5 md:h-11.75 md:px-2.75">
            <span className="font-sans text-xs font-light md:text-[1.0625rem]">
              {city.locationCount}
            </span>
            <span className="font-sans text-xs font-semibold md:text-[1.0625rem]">
              {city.name}
            </span>
          </span>
        </span>
        ))}
    </div>
  );
}
