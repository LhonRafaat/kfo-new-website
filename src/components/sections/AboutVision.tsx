import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { aboutVision } from "@/lib/content";

/**
 * "Vision" card (Figma "Testimonial Section", y1700): the same slate panel and
 * linear-burned paper scan as the homepage founder card — photo filling the
 * left half, statement column on the right — but with no name overlay and a
 * serif lead line above the body copy.
 *
 * As on the homepage the photo sits in an absolutely-positioned background
 * stack rather than in the grid: the burn has to blend against the slate and
 * the photo but NOT the copy, which Figma paints above it. The grid keeps a
 * matching spacer column so the layout is unchanged. See the `.burn-*` note in
 * globals.css for how "Plus darker" is rebuilt.
 */
export function AboutVision() {
  return (
    <section className="relative">
      <Container className="relative z-10">
        <Reveal className="relative isolate overflow-hidden rounded-2xl">
          {/* ---- Background stack: slate + photo, burned by the paper ---- */}
          <div className="burn-restore absolute inset-0 isolate">
            <div className="burn-scope absolute inset-0 bg-slate">
              {/* Mirrors the spacer column below: full-width top band on
                  mobile, left half on md+. */}
              <div className="absolute inset-x-0 top-0 h-[240px] md:inset-y-0 md:left-0 md:h-auto md:w-1/2">
                <Image
                  src={aboutVision.image.src}
                  alt={aboutVision.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  /* Figma desaturates this fill (saturation −1) rather than
                     shipping a B&W crop. */
                  className="object-cover object-center grayscale"
                />
              </div>
            </div>
            {/* The same scan and treatment as the homepage founder card —
                Figma crops a tall slice out of it so a single soft crease runs
                down the middle of the panel — so it reuses that card's asset
                rather than shipping a second crop of the same sheet. */}
            <div
              className="burn-layer absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url(/images/texture-paper-testimonial.webp)",
                backgroundSize: "100% 100%",
              }}
              aria-hidden
            />
          </div>

          {/* ---- Copy, above the burn ---- */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[593fr_593fr]">
            {/* Spacer holding the photo's footprint */}
            <div className="min-h-[240px] md:min-h-[560px]" />

            <div className="flex flex-col gap-6 px-6 py-10 md:px-12 md:py-16 lg:pl-[52px] lg:pr-[50px]">
              <Reveal as="h2" className="heading-section text-ink">
                {aboutVision.heading}
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="font-serif text-lg font-medium leading-[1.5] text-ink md:text-xl"
              >
                {aboutVision.lead}
              </Reveal>
              {/* Figma sets 12px under the lead, then 10px between paragraphs. */}
              <Reveal as="div" delay={140} className="-mt-3 flex flex-col gap-2.5">
                {aboutVision.body.map((paragraph) => (
                  <p key={paragraph} className="body-md leading-6">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
