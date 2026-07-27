import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import { locationShowcase, type ShowcaseTile } from "@/lib/content";

/**
 * "A Land of Untold Stories" mosaic (Figma "Location DB Variant 3", 317:631):
 * four columns of two staggered tiles. The Bazyan tile is grayscale with a
 * permanent gradient + title + CTA pill, exactly like the Figma; colour eases
 * back in on hover. Column height is viewport-capped so the whole section
 * always fits within 100vh.
 */
function Tile({ tile }: { tile: ShowcaseTile }) {
  const inner = (
    <>
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes="(max-width: 768px) 48vw, 25vw"
        className={`object-cover ${
          tile.overlay
            ? "grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            : ""
        }`}
      />
      {tile.overlay && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        >
          <h3 className="font-serif text-[1.375rem] font-medium italic leading-[1.14]">
            {tile.overlay.title}
          </h3>
          <span className="rounded-full bg-white px-3 py-2 font-sans text-base font-semibold leading-[1.375] text-ink transition-colors duration-300 group-hover:bg-cream">
            {tile.overlay.cta}
          </span>
        </div>
      )}
    </>
  );

  const className =
    "group relative min-h-0 basis-0 overflow-hidden rounded-2xl bg-ink/10";
  const style = { flexGrow: tile.tall ? 320 : 234 };

  return tile.overlay ? (
    <Link href="/locations" aria-label={`${tile.overlay.title} — ${tile.overlay.cta}`} className={className} style={style}>
      {inner}
    </Link>
  ) : (
    <div className={className} style={style}>
      {inner}
    </div>
  );
}

export function LocationsShowcase() {
  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex max-w-[640px] flex-col gap-4">
            <Reveal as="h2" className="heading-section text-ink">
              A Land of Untold Stories
            </Reveal>
            <Reveal as="p" delay={80} className="body-md">
              We offer you the largest location database in the Kurdistan
              Region. We also add new locations regularly. If you cannot find
              the location you are looking for, do not hesitate to contact us.
            </Reveal>
          </div>
          <AccentLink href="/locations" className="shrink-0">
            View all database
          </AccentLink>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-[346fr_207fr_340fr_237fr] md:gap-4">
          {locationShowcase.map((col, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="flex h-[min(58vw,calc(100svh-390px))] min-h-[320px] flex-col gap-3 md:h-[min(46vw,calc(100svh-330px))] md:max-h-[571px] md:gap-[17px]"
            >
              {col.map((tile) => (
                <Tile key={tile.src} tile={tile} />
              ))}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
