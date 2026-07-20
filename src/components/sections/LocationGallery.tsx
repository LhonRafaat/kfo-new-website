import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { LocationEntry } from "@/lib/content";

/**
 * Figma lays the gallery out as a 782+378 pair, then a strip of four equal
 * tiles that runs off both edges of the page. Below `lg` the strip becomes a
 * swipeable row rather than a crop, so nothing is unreachable on a phone.
 */
export function LocationGallery({ gallery }: { gallery: LocationEntry["gallery"] }) {
  const [wide, beside, ...strip] = gallery;

  return (
    <Reveal as="div" className="mt-10">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[782fr_378fr]">
          <div className="relative h-60 overflow-hidden rounded sm:h-75 lg:h-93">
            <Image
              src={wide.src}
              alt={wide.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-60 overflow-hidden rounded sm:h-75 lg:h-93">
            <Image
              src={beside.src}
              alt={beside.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 32vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      <div className="no-scrollbar mt-6 overflow-x-auto">
        {/* The negative offset reproduces the Figma crop, where the strip
            starts 153px to the left of the viewport. */}
        <div className="flex gap-6 lg:-ml-38.25">
          {strip.map((img) => (
            <div
              key={img.src}
              className="relative h-60 w-61.25 shrink-0 overflow-hidden rounded sm:h-75 sm:w-76.5 lg:h-93 lg:w-94.75"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="379px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
