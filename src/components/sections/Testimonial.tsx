import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { FounderMessage } from "@/components/sections/FounderMessage";
import { lines } from "@/lib/text";
import { media } from "@/lib/media";
import type { HomePage } from "@/lib/strapi";

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
export function Testimonial({
  testimonial,
  founder,
}: {
  testimonial: HomePage["testimonial"];
  founder: HomePage["founderMessage"];
}) {
  const portrait = media(testimonial.portrait);

  return (
    <section className="relative">
      <Container className="relative z-10">
        <Reveal className="relative isolate overflow-hidden rounded-2xl">
          {/* ---- Background stack: slate + portrait, burned by the paper ---- */}
          <div className="burn-restore absolute inset-0 isolate">
            <div className="burn-scope absolute inset-0 bg-slate">
              {/* Mirrors the spacer column below: full-width top band on mobile,
                  left half on md+. */}
              <div className="absolute inset-x-0 top-0 h-[320px] md:inset-y-0 md:left-0 md:h-auto md:w-1/2">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            {/* Figma crops a tall slice out of the paper scan (imageTransform on
                node 513:74) and turns it 90° counter-clockwise, so a single
                crease runs down the middle of the card. That exact crop is the
                `paperTestimonial` asset, stretched to the card the way Figma's
                fill does. */}
            <div
              className="burn-layer absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "var(--asset-paper-testimonial, url(/images/texture-paper-testimonial.webp))",
                backgroundSize: "100% 100%",
              }}
              aria-hidden
            />
          </div>

          {/* ---- Copy, above the burn ---- */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
            {/* Spacer holding the portrait's footprint, with the name overlaid */}
            <div className="relative min-h-[320px] md:min-h-[448px]">
              <div className="absolute bottom-8 left-12 text-white md:bottom-16 md:left-12">
                <p className="font-serif text-[1.375rem] font-bold italic leading-normal">
                  {testimonial.name}
                </p>
                <p className="font-serif text-base font-medium leading-6">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Statement */}
            <div className="flex flex-col gap-6 px-6 py-10 md:px-16 md:py-16">
              <Reveal as="h2" className="heading-section text-ink">
                {lines(testimonial.heading)}
                {testimonial.headingEmphasis && (
                  <>
                    {" "}
                    <em className="font-normal italic">
                      {testimonial.headingEmphasis}
                    </em>
                    .
                  </>
                )}
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="font-serif text-[1.375rem] font-medium leading-[1.14] text-ink"
              >
                {testimonial.subheading}
              </Reveal>
              <Reveal as="blockquote" delay={140} className="max-w-[512px]">
                <p className="font-sans text-base leading-6 text-[#291A1C]">
                  <span className="text-accent">&ldquo;</span>
                  {testimonial.quote}
                </p>
              </Reveal>
              {/* Opens the founder's-message bottom sheet (Figma 537:1923)
                  rather than navigating away. */}
              <div className="mt-4">
                <FounderMessage
                  triggerLabel={testimonial.ctaLabel}
                  founder={founder}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
