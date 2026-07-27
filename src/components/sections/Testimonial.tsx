import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";

/**
 * Founder testimonial card (Figma 513:62): a rounded slate panel — B&W
 * portrait filling the left half with the name overlaid at its base, the
 * statement column on the right. The folded-paper scan lies over the whole
 * card (Figma LINEAR_BURN @ 60% ≈ CSS multiply) with the text above it.
 */
export function Testimonial() {
  return (
    <section className="relative">
      <Container className="relative z-10">
        <Reveal className="relative isolate overflow-hidden rounded-2xl bg-slate">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Portrait — bleeds below the card's crop, name pinned bottom-left */}
            <div className="relative min-h-[320px] md:min-h-[448px]">
              <Image
                src="/images/founder-bw.jpg"
                alt="Bavi Yassin, Founder of the Kurdistan Film Commission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute bottom-8 left-12 z-20 text-white md:bottom-16 md:left-12">
                <p className="font-serif text-[1.375rem] font-bold italic leading-normal">
                  Bavi Yassin
                </p>
                <p className="font-serif text-base font-medium leading-6">
                  Founder, Kurdistan Film Commission
                </p>
              </div>
            </div>

            {/* Statement */}
            <div className="relative z-20 flex flex-col gap-6 px-6 py-10 md:px-16 md:py-16">
              <Reveal as="h2" className="heading-section text-ink">
                We have so much more
                <br />
                than just <em className="font-normal italic">the mountains</em>.
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="font-serif text-[1.375rem] font-medium leading-[1.14] text-ink"
              >
                Founder&rsquo;s Statement &amp; Vision
              </Reveal>
              <Reveal as="blockquote" delay={140} className="max-w-[512px]">
                <p className="font-sans text-base leading-6 text-[#291A1C]">
                  <span className="text-accent">&ldquo;</span>
                  Kurdistan Film Commission is the newly established non-profit
                  film commission in the Kurdistan region of Iraq. The northern
                  region of Iraq is well-known for its rich history, beautiful
                  landscapes, charming cities, mountains, and vibrant cultural
                  heritage.
                </p>
              </Reveal>
              <div className="mt-4">
                <AccentLink href="/about">Read Full Message</AccentLink>
              </div>
            </div>
          </div>

          {/* Folded-paper burn across the whole card, above the imagery,
              below the text columns (both are z-20) */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-multiply"
            style={{
              backgroundImage: "url(/images/texture-paper-founder.webp)",
              backgroundSize: "100% 100%",
            }}
            aria-hidden
          />
        </Reveal>
      </Container>
    </section>
  );
}
