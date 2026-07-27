import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { quickLinks } from "@/lib/content";

/**
 * Homepage hero (Figma 317:717): full-viewport mountain photo, static page
 * title, and the four explore quick-links pinned to the bottom band. The whole
 * section is exactly one viewport tall, per the V2 design.
 */
export function Hero() {
  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-ink">
      <Image
        src="/images/hero-home.jpg"
        alt="Snow-dusted mountains of Kurdistan glowing at golden hour"
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
          The New Filming
          <br />
          Destination in the
          <br />
          <em className="font-bold italic">Mena Region</em>
        </Reveal>
        <Reveal
          as="p"
          delay={150}
          className="mt-4 font-serif text-xl text-white/95 md:text-[1.78rem] md:leading-[1.125]"
        >
          Discover Kurdistan Through the Art of Filmmaking
        </Reveal>
      </div>

      {/* Explore quick links (Figma 551:2728) */}
      <Container className="relative z-10 pb-8 pt-8 text-white">
        <Reveal
          as="div"
          delay={250}
          className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-[450fr_205fr_205fr_205fr] md:gap-x-10"
        >
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex flex-col ${item.featured ? "md:px-6" : ""}`}
            >
              <span className="font-sans text-base uppercase leading-[1.375] text-white">
                {item.label}
              </span>
              <span className="mt-2 font-serif text-[1.375rem] font-medium italic leading-[1.14] transition-colors duration-300 group-hover:text-accent-soft">
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
