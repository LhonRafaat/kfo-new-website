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

      <Reveal className="mt-7 flex h-[130px] w-full items-center overflow-hidden bg-[#E7E1D9]">
        <div className="flex w-max animate-marquee items-center gap-[58px] pl-[58px]">
          {reel.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className={`relative h-[104px] shrink-0 ${
                logo.wide ? "w-[174px]" : "w-[104px]"
              }`}
            >
              <Image
                src={logo.src}
                alt={i < aboutPartners.logos.length ? logo.name : ""}
                aria-hidden={i >= aboutPartners.logos.length}
                fill
                sizes="174px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
