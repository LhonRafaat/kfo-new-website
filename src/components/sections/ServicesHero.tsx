import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { servicesHero } from "@/lib/content";

/**
 * Services hero (Figma 364:452 + 537:1955 + 537:1952): a full-viewport photo
 * under an ink wash, with the page title, its accent squiggle and the two
 * intro paragraphs sitting on the base line of the image — the same one-
 * viewport, bottom-anchored construction as the homepage hero.
 *
 * The wash here is a full-length gradient (transparent → 72% ink at the base)
 * rather than the homepage's late-starting one, because this page's copy sits
 * against sky rather than mountain.
 */
export function ServicesHero() {
  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-ink">
      <Image
        src="/images/services-hero.jpg"
        alt="Snow-capped peaks rising above the tree line in Kurdistan"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,27,29,0) 0%, rgba(42,27,29,0.72) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 mt-auto pb-12 text-white">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal className="reveal-underline max-w-[480px]">
            <h1 className="heading-section">{servicesHero.title}</h1>
            {/* Figma draws this 149px wide; the wave only occupies 115 of the
                SVG's 150-unit box, so the box has to run to 194px for the
                stroke itself to measure 149. */}
            <Underline className="mt-2.5 !h-[5px] max-w-[194px]" />
            <p className="mt-2.5 font-serif text-lg font-medium leading-[1.5]">
              {servicesHero.lead}
            </p>
          </Reveal>

          <Reveal
            as="p"
            delay={120}
            className="body-md max-w-[460px] leading-6 text-white"
          >
            {servicesHero.aside}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
