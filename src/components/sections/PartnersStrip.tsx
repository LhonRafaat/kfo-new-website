import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { aboutPartners } from "@/lib/content";

/**
 * "Partners" (Figma "Group 13"): the heading in the content column and, under
 * it, a full-bleed band of partner lock-ups that runs off both edges of the
 * frame. The row travels because the frame shows it mid-bleed with a second
 * copy of the logos already on screen — it holds two copies and translates
 * -50%, so the loop is seamless. It stands still under reduced motion.
 */
export function PartnersStrip() {
  // Two copies: the first is read by assistive tech, the second is decorative.
  const reel = [...aboutPartners.logos, ...aboutPartners.logos];

  return (
    <section className="relative pb-12 pt-12 md:pb-[71px] md:pt-[72px]">
      <Container className="relative z-10">
        <Reveal as="h2" className="heading-section text-ink">
          {aboutPartners.heading}
        </Reveal>
      </Container>

      {/* The strip rests in black and white; a logo colours up under the
          pointer and the row stops travelling while the band is hovered, so a
          lock-up can be read without chasing it. */}
      <Reveal className="group mt-7 flex h-[130px] w-full items-center overflow-hidden bg-[#E7E1D9]">
        <div className="flex w-max animate-marquee items-center gap-[58px] pl-[58px] group-hover:[animation-play-state:paused]">
          {reel.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className={`group/logo relative h-[104px] shrink-0 ${
                logo.wide ? "w-[174px]" : "w-[104px]"
              }`}
            >
              <Image
                src={logo.src}
                alt={i < aboutPartners.logos.length ? logo.name : ""}
                aria-hidden={i >= aboutPartners.logos.length}
                fill
                sizes="174px"
                /* Chases the pointer, so it runs on the interactive token
                   rather than the slower entrance one. */
                className="object-contain grayscale transition-[filter] duration-(--fade-duration-interactive) ease-(--fade-ease) group-hover/logo:grayscale-0"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
