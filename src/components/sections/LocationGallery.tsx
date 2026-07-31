import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import type { LocationEntry } from "@/lib/content";

/**
 * Top of a location page (Figma 338:1140/338:1141): an 816×446 hero tile with
 * the category and summary in a 320px column bottom-aligned beside it, then the
 * full-width 1184×502 band underneath. Both are r16.
 */
export function LocationGallery({
  gallery,
  category,
  summary,
}: {
  gallery: LocationEntry["gallery"];
  category: string;
  summary: string;
}) {
  const [hero, wide] = gallery;

  return (
    <Container className="relative z-10 mt-12">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[816fr_320fr] lg:gap-12">
        <Reveal className="relative aspect-816/446 overflow-hidden rounded-2xl">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 816px"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-1">
          <Eyebrow>{category}</Eyebrow>
          <p className="body-md leading-6 text-ink/60">{summary}</p>
        </Reveal>
      </div>

      {wide && (
        <Reveal
          delay={60}
          className="relative mt-12 aspect-1184/502 overflow-hidden rounded-2xl"
        >
          <Image
            src={wide.src}
            alt={wide.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            className="object-cover"
          />
        </Reveal>
      )}
    </Container>
  );
}
