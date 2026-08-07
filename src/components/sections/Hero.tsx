import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { lines } from "@/lib/text";
import { media } from "@/lib/media";
import type { HomePage } from "@/lib/strapi";

/**
 * Homepage hero (Figma 317:717): full-viewport mountain photo, static page
 * title, and the four explore quick-links pinned to the bottom band. The whole
 * section is exactly one viewport tall, per the V2 design.
 *
 * The title's line breaks are authored into the CMS field; the design puts the
 * emphasised run on its own last line, which stays here rather than in the copy.
 */
export function Hero({ hero }: { hero: HomePage["hero"] }) {
  const image = media(hero.image);

  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-ink">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Figma's legibility wash: transparent until ~38%, ink at 48% by the base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,27,29,0) 37.7%, rgba(42,27,29,0.48) 100%)",
        }}
        aria-hidden
      />

      {/* Title block — centered in the space above the quick links */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center text-white">
        <Reveal as="h1" className="display-title max-w-[680px]">
          {lines(hero.title)}
          {hero.titleEmphasis && (
            <>
              <br />
              <em className="font-bold italic">{hero.titleEmphasis}</em>
            </>
          )}
        </Reveal>
        <Reveal
          as="p"
          delay={150}
          className="mt-4 font-serif text-xl text-white/95 md:text-[1.78rem] md:leading-[1.125]"
        >
          {hero.subtitle}
        </Reveal>
      </div>

      {/* Explore quick links (Figma 551:2728) */}
      <Container className="relative z-10 pb-8 pt-8 text-white">
        <Reveal
          as="div"
          delay={250}
          className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-[450fr_205fr_205fr_205fr] md:gap-x-10"
        >
          {hero.quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex flex-col ${item.featured ? "md:px-6" : ""}`}
            >
              <span className="font-sans text-base uppercase leading-[1.375] text-white">
                {item.label}
              </span>
              {/* Title colour is fixed per Figma — only the underline reacts to hover */}
              <span className="mt-2 font-serif text-[1.375rem] font-medium italic leading-[1.14]">
                {item.title}
              </span>
              <Underline
                className={`mt-[7px] !h-[5px] max-w-[115px] ${
                  item.featured
                    ? ""
                    : "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                }`}
                style={{ clipPath: item.featured ? "inset(0 0 0 0)" : undefined }}
              />
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
