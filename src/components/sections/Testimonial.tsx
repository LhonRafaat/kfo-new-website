import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { FounderMessage } from "@/components/sections/FounderMessage";

/**
 * Founder testimonial card (Figma 513:62): a rounded slate panel — B&W
 * portrait filling the left half with the name overlaid at its base, the
 * statement column on the right. The folded-paper scan lies over the whole
 * card — Figma node 513:74, "Plus darker" (linear burn) at 60%, rebuilt by the
 * .burn-* sandwich in globals.css.
 *
 * The portrait sits in an absolutely-positioned background stack rather than in
 * the grid, because the burn has to blend against the slate and the photo but
 * NOT the copy (Figma paints both text frames above it). The grid above it
 * keeps a matching spacer column, so the layout is unchanged.
 */
export function Testimonial() {
  return (
    <section className="relative">
      <Container className="relative z-10">
        <Reveal className="relative isolate overflow-hidden rounded-2xl">
          {/* ---- Background stack: slate + portrait, burned by the paper ---- */}
          <div className="burn-restore absolute inset-0 isolate [container-type:size]">
            <div className="burn-scope absolute inset-0 bg-slate">
              {/* Mirrors the spacer column below: full-width top band on
                  mobile, left half on md+. Below md both are sized from the
                  card's own width by the SAME aspect ratio, so the band ends
                  exactly where the statement begins at every viewport instead
                  of two fixed heights having to agree. 3:4 is the portrait's
                  own ratio (1200×1600), so nothing of it is cropped away. */}
              <div className="absolute inset-x-0 top-0 aspect-3/4 md:inset-y-0 md:left-0 md:aspect-auto md:h-auto md:w-1/2">
                <Image
                  src="/images/founder-bw.jpg"
                  alt="Bavi Yassin, Founder of the Kurdistan Film Commission"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            {/* Figma crops a tall slice out of the paper scan (imageTransform on
                node 513:74) and turns it 90° counter-clockwise, so a single
                crease runs down the middle of the card. This asset is that exact
                crop, stretched to the card the way Figma's fill does. */}
            <div className="burn-layer absolute inset-0 opacity-60" aria-hidden>
              {/* Below lg: turned a further 90°. The wrapper is sized to the
                  card's diagonal-swapped box (height × width) and rotated about
                  the centre, so the rotated fill still covers it edge to edge.
                  From lg up it goes back to the unturned, card-sized fill. */}
              <div
                className="absolute left-1/2 top-1/2 h-[100cqw] w-[100cqh] -translate-x-1/2 -translate-y-1/2 rotate-90 lg:h-full lg:w-full lg:rotate-0"
                style={{
                  backgroundImage:
                    "url(/images/texture-paper-testimonial.webp)",
                  backgroundSize: "100% 100%",
                }}
              />
            </div>
          </div>

          {/* ---- Copy, above the burn ---- */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
            {/* Spacer holding the portrait's footprint, with the name overlaid */}
            <div className="relative aspect-3/4 md:aspect-auto md:min-h-[448px]">
              <div className="absolute bottom-8 left-6 text-white md:bottom-16 md:left-12">
                <p className="heading-card font-serif font-bold italic leading-normal">
                  Bavi Yassin
                </p>
                <p className="font-serif text-base font-medium leading-6">
                  Founder, Kurdistan Film Commission
                </p>
              </div>
            </div>

            {/* Statement */}
            <div className="flex flex-col gap-6 px-6 py-10 md:px-16 md:py-16">
              <Reveal as="h2" className="heading-section text-ink">
                We have so much more
                <br />
                than just <em className="font-normal italic">the mountains</em>.
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="heading-card font-serif font-medium text-ink"
              >
                Founder&rsquo;s Statement &amp; Vision
              </Reveal>
              <Reveal as="blockquote" delay={140} className="max-w-[512px]">
                <p className="font-sans text-base leading-6 text-[#291A1C]">
                  Kurdistan Film Commission is the newly established non-profit
                  film commission in the Kurdistan region of Iraq. The northern
                  region of Iraq is well-known for its rich history, beautiful
                  landscapes, charming cities, mountains, and vibrant cultural
                  heritage.
                </p>
              </Reveal>
              {/* Opens the founder's-message bottom sheet (Figma 537:1923)
                  rather than navigating away. */}
              <div className="mt-4">
                <FounderMessage />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
