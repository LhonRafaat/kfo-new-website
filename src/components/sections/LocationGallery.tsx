import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { LocationSlider } from "@/components/sections/LocationSlider";
import type { LocationEntry } from "@/lib/content";

/**
 * Gallery for a location: the first two images are the hero pair (782+378 in
 * the Figma), and everything after them feeds the slider underneath.
 */
export function LocationGallery({
  gallery,
}: {
  gallery: LocationEntry["gallery"];
}) {
  const [wide, beside, ...rest] = gallery;

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

      {rest.length > 0 && <LocationSlider images={rest} />}
    </Reveal>
  );
}
