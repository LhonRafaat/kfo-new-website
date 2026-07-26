import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { locationPins } from "@/lib/content";

/**
 * Opening block of the location database page (Figma "Location DB - V2",
 * node 338:191): eyebrow, split-italic headline and copy on the left, a small
 * decorative map with a pin per city on the right. Below ~900px in the Figma
 * this hands off to the "Locations" filter bar + row list (`LocationsList`).
 */
export function LocationsIntro() {
  return (
    <Container className="relative z-10 pt-16 md:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[531fr_610fr] lg:gap-10">
        <div>
          <Reveal as="div">
            <Eyebrow>Database Access Required</Eyebrow>
          </Reveal>

          <Reveal as="h1" delay={60} className="display-lg mt-4 text-ink">
            Explore our
            <br />
            <em className="italic">Location Database</em>
            <span className="font-normal italic">.</span>
          </Reveal>

          <Reveal as="div" delay={120} className="mt-6 space-y-2">
            <p className="font-serif text-2xl font-medium leading-tight text-ink">
              We offer you the largest location database{" "}
              <em className="italic">in the Kurdistan Region</em>.
            </p>
            <p className="body-lg leading-normal">
              We also add new locations regularly. If you cannot find the
              location you are looking for, do not hesitate to contact us.
            </p>
            <p className="body-lg leading-normal">
              If you are based in Kurdistan and would like to add your
              property or have any other location you would like to add, do
              not hesitate to reach out to us.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={160}
          className="relative mx-auto aspect-610/542 w-full max-w-105 lg:max-w-152.5"
        >
          <PinMap />
        </Reveal>
      </div>
    </Container>
  );
}

/** Small non-interactive silhouette of the Kurdistan Region with a counted pin per city. */
function PinMap() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/kurdistan-map.svg"
        alt="Map of the Kurdistan Region showing how many catalogued locations sit in each city"
        fill
        // Vector already; the optimizer rejects SVG unless globally allowlisted.
        unoptimized
        className="object-contain"
      />

      {locationPins.map((pin) => (
        <span
          key={pin.city}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent/25 sm:h-4 sm:w-4">
            <span className="block h-1 w-1 rounded-full bg-accent sm:h-1.5 sm:w-1.5" />
          </span>
          <span className="absolute left-1/2 top-2 flex h-6 -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-black px-2 text-white sm:top-2.5 sm:h-7">
            <span className="font-sans text-[10px] font-light sm:text-xs">
              {pin.count}
            </span>
            <span className="font-sans text-[10px] font-semibold sm:text-xs">
              {pin.city}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
