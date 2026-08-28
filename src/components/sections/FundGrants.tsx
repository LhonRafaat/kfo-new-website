import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { fundGrants } from "@/lib/content";

/**
 * "Grants" (Figma "Frame 218"): the intro over three format cards — a 379×301
 * photo with an uppercase label and a slate paragraph under it.
 */
export function FundGrants() {
  return (
    <section id="grants" className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="flex max-w-[691px] flex-col gap-4">
          <h2 className="heading-section text-white">{fundGrants.heading}</h2>
          {/* The frame's own line breaks, honoured only where the measure it
              ragged for actually applies. */}
          <div className="font-sans text-base leading-[1.6] text-slate">
            {fundGrants.intro.map((paragraph) => (
              <p key={paragraph} className="lg:whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fundGrants.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90} className="flex flex-col gap-4">
              <div className="relative aspect-379/301 w-full overflow-hidden rounded-2xl bg-white/10">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 379px"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-base font-semibold uppercase leading-[1.4] tracking-label text-white">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-[1.6] text-slate">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
