import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { locationPins } from "@/lib/content";

/**
 * The map is its own Figma export (611×543) rather than a scaled copy of the
 * 900×800 full-page silhouette, so its pins need their own percentages —
 * derived from each pin group's ellipse centre in that node's bounding box.
 * Re-verified against the redesigned hero map (529:1392, 650×577): identical
 * shape and identical pin placement, just drawn larger.
 */
const heroPinPositions: Record<string, { x: number; y: number }> = {
  Duhok: { x: 16.8, y: 2.3 },
  Erbil: { x: 39.9, y: 15.1 },
  Kifri: { x: 61.5, y: 24.3 },
  Sulaymaniyah: { x: 71.5, y: 41.6 },
  Halabjah: { x: 87.4, y: 62.4 },
};

/**
 * Opening block of the location database page (Figma 522:314): eyebrow,
 * split-italic headline and copy in a 449px column on the left, with the
 * Kurdistan silhouette — now half the frame wide — carrying a counted pin per
 * city on the right. The two columns are centred against each other.
 */
export function LocationsIntro() {
  return (
    // Figma: the map's top edge sits 62px under the 80px header, and the
    // "Locations" bar starts 161px below its bottom.
    <Container className="relative z-10 pb-24 pt-12 md:pb-40 md:pt-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[449fr_735fr] lg:gap-0">
        <div>
          <Reveal as="div">
            <Eyebrow>Database Access Required</Eyebrow>
          </Reveal>

          <Reveal as="h1" delay={60} className="heading-section mt-4 text-ink">
            Explore our
            <br />
            <em className="italic">Location Database</em>
            <span className="font-normal italic">.</span>
          </Reveal>

          {/* 32px between each block of the Figma's auto-layout column. */}
          <Reveal as="div" delay={120} className="mt-8">
            <p className="max-w-[368px] font-serif text-[1.375rem] font-medium leading-[1.5] text-ink">
              We offer you the largest location database{" "}
              <em className="italic">in the Kurdistan Region</em>.
            </p>
          </Reveal>

          <Reveal as="div" delay={160} className="mt-8 space-y-6">
            <p className="body-md leading-6">
              We also add new locations regularly. If you cannot find the
              location you are looking for, do not hesitate to contact us.
            </p>
            <p className="body-md leading-6">
              If you are based in Kurdistan and would like to add your property
              or have any other location you would like to add, do not hesitate
              to reach out to us.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={200}
          // Figma insets the map 23px from the content column's right edge
          // rather than centring it in the space left over.
          className="relative mx-auto aspect-611/543 w-full max-w-162.5 lg:ml-auto lg:mr-5.75"
        >
          <PinMap />
        </Reveal>
      </div>
    </Container>
  );
}

/** Non-interactive silhouette of the Kurdistan Region with a counted pin per city. */
function PinMap() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/kurdistan-map-hero.svg"
        alt="Map of the Kurdistan Region showing how many catalogued locations sit in each city"
        fill
        // Vector already; the optimizer rejects SVG unless globally allowlisted.
        unoptimized
        className="object-contain"
      />

      {locationPins.map((pin) => {
        const pos = heroPinPositions[pin.city];
        if (!pos) return null;
        return (
          <span
            key={pin.city}
            // Decorative: the map's alt text already carries this information.
            aria-hidden
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {/* Figma keeps the badges at a fixed size however small the map
                renders, so these don't scale with the artboard. */}
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/25 md:h-6.5 md:w-6.5">
              <span className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2.75 md:w-2.75" />
            </span>
            <span className="absolute left-1/2 top-3.5 flex h-8 -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-black px-2 text-white md:top-8.5 md:h-11.75 md:px-2.75">
              <span className="font-sans text-xs font-light md:text-[1.0625rem]">
                {pin.count}
              </span>
              <span className="font-sans text-xs font-semibold md:text-[1.0625rem]">
                {pin.city}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
