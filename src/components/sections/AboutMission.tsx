import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { aboutBand, aboutIntro, aboutMission } from "@/lib/content";

/**
 * Everything between the hero and the vision card (Figma y896–1652): the
 * three-paragraph intro held to the right half of the content column, a
 * full-bleed photo strip, then the mission block back at the left edge.
 *
 * The strip bleeds past the content column, so it sits outside `Container`
 * and takes the page's full width.
 */
export function AboutMission() {
  return (
    <section className="relative">
      <Container className="relative z-10 py-16">
        <Reveal className="ml-auto flex max-w-[640px] flex-col gap-2">
          {aboutIntro.map((paragraph) => (
            <p key={paragraph} className="body-md leading-6">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>

      <Reveal className="relative h-[160px] w-full md:h-[240px]">
        <Image
          src={aboutBand.src}
          alt={aboutBand.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </Reveal>

      <Container className="relative z-10 pb-12 pt-16">
        <Reveal as="h2" className="heading-section text-ink">
          {aboutMission.heading}
        </Reveal>
        <Reveal as="p" delay={80} className="body-md mt-6 max-w-[693px] leading-6">
          {aboutMission.body}
        </Reveal>
      </Container>
    </section>
  );
}
