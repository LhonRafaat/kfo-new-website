import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { fundApplication, fundApplyHref } from "@/lib/content";

/**
 * "Application" card (Figma "Frame 222"): a 1184×422 rounded panel filled with
 * a band of the mountain photo — the one place on this dark page where the
 * copy runs in ink rather than white, because the band is bright sky.
 */
export function FundApplication() {
  return (
    <section id="application" className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="reveal-underline relative isolate overflow-hidden rounded-2xl">
          <Image
            src={fundApplication.image.src}
            alt={fundApplication.image.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            /* The crop's aspect is the card's at the design width, so this
               only bites on a phone, where the card turns tall: anchoring the
               sky keeps the copy off the bright ridge. */
            className="-z-10 object-cover object-top"
          />

          {/* Below lg the card turns tall and the ridge rises behind the copy;
              a haze over the lower half keeps the ink readable. At the design
              width the card is the frame's 422 and the copy is all over sky,
              so this is off there entirely. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/35 to-white/60 lg:hidden"
            aria-hidden
          />

          {/* Figma's card is 422 tall: hold that at lg so the copy stays over
              the sky rather than dropping onto the ridge line. */}
          <div className="flex flex-col gap-10 px-6 py-10 text-ink md:px-14 md:py-14 lg:min-h-[422px] lg:flex-row lg:gap-[167px]">
            <div className="flex flex-col gap-6 lg:w-[242px] lg:shrink-0">
              <h2 className="font-serif text-[2rem] font-medium leading-[1.14] md:text-5xl">
                {fundApplication.heading}
              </h2>
              <Link
                href={fundApplyHref}
                className="self-start font-serif text-[1.375rem] font-medium italic leading-[1.14] tracking-label transition-colors duration-300 hover:text-accent md:text-[2rem]"
              >
                {fundApplication.cta}
                <Underline className="!mt-1 !h-[5px] w-full text-rust" />
              </Link>
            </div>

            {/* The opening line is set in the serif a size up; the two under it
                drop to 16px sans, 8px apart. */}
            <div className="flex max-w-[494px] flex-col gap-2">
              <p className="font-serif text-lg font-medium leading-[1.5] md:text-xl">
                {fundApplication.lead}
              </p>
              {fundApplication.body.map((paragraph) => (
                <p key={paragraph} className="font-sans text-base leading-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
