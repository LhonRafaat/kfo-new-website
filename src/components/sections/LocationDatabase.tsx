import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Parallax } from "@/components/Parallax";
import { locationTiles, type LocationTile } from "@/lib/content";

// Rebuild the Figma masonry: four columns, each a stack of one short + one tall tile.
const columns: LocationTile[][] = [
  [locationTiles[0], locationTiles[4]],
  [locationTiles[1], locationTiles[5]],
  [locationTiles[2], locationTiles[6]],
  [locationTiles[3], locationTiles[7]],
];

function Tile({ tile }: { tile: LocationTile }) {
  return (
    <div
      className="relative min-h-0 basis-0 overflow-hidden rounded-sm bg-ink/10"
      style={{ flexGrow: tile.tall ? 320 : 234 }}
    >
      <Parallax speed={0.08} className="absolute inset-0">
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 768px) 45vw, 22vw"
          className="object-cover"
        />
      </Parallax>
      {tile.overlay && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20 p-4 text-center text-white">
          <h3 className="font-serif text-xl italic md:text-2xl">{tile.overlay.title}</h3>
          <p className="font-sans text-sm text-white/85">{tile.overlay.subtitle}</p>
          <Link
            href="/locations"
            className="mt-3 rounded-full bg-white px-5 py-2 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-cream"
          >
            Get access to all database
          </Link>
        </div>
      )}
    </div>
  );
}

export function LocationDatabase() {
  return (
    <section className="relative">
      <Container className="relative z-10 py-20 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-lg text-ink">
              A Land of
              <br />
              Untold Stories
            </h2>
            <p className="body-lg mt-6 max-w-2xl">
              We offer you the largest location database in the Kurdistan Region. We also add new
              locations regularly. If you cannot find the location you are looking for, do not
              hesitate to contact us.
            </p>
          </div>
          <AccentLink href="/locations" className="shrink-0 md:pb-2">
            View all database
          </AccentLink>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-[346fr_207fr_340fr_237fr] md:gap-4">
          {columns.map((col, i) => (
            <div
              key={i}
              className="flex h-[440px] flex-col gap-3 sm:h-[520px] md:h-[560px] md:gap-4"
            >
              {col.map((tile) => (
                <Tile key={tile.src} tile={tile} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
