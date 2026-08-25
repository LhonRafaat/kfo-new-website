import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { FundDisclosureList } from "@/components/sections/FundDisclosureList";
import { fundAbout, fundApplyHref } from "@/lib/content";

/**
 * "About / The Kurdistan Film Fund" (Figma y928–1887): the headline, the grant
 * total and the apply link in a narrow left column, the photo beside it, and
 * the vision/mission disclosures underneath.
 *
 * The caption under the photo is drafted copy: the frame carries a note to the
 * client there rather than words, so it needs sign-off — see content.ts.
 */
export function FundAbout() {
  return (
    <section className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[85px] lg:pl-[73px]">
          {/* Figma drops the copy column 99px against the photo's top edge. */}
          <Reveal className="reveal-underline flex flex-col lg:w-[318px] lg:shrink-0 lg:pt-[99px]">
            <h2 className="heading-section text-white">
              {fundAbout.heading}
              <br />
              <em className="italic">{fundAbout.headingItalic}</em>
            </h2>

            <p className="body-md mt-2 max-w-[183px] leading-6 text-slate">
              <span className="text-accent">{fundAbout.amount}</span>{" "}
              {fundAbout.amountSuffix}
            </p>

            <Link
              href={fundApplyHref}
              className="group mt-8 self-start font-serif text-[1.375rem] font-medium italic leading-[1.14] text-white transition-colors duration-300 hover:text-accent"
            >
              {fundAbout.cta}
              <Underline className="!mt-1.5 !h-[5px] w-full" />
            </Link>
          </Reveal>

          <Reveal
            delay={120}
            className="relative aspect-3/2 w-full overflow-hidden rounded-2xl lg:aspect-582/406 lg:max-w-[582px]"
          >
            <Image
              src={fundAbout.image.src}
              alt={fundAbout.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 582px"
              className="object-cover object-center"
            />
          </Reveal>
        </div>

        {/* Sits under the photo, aligned to its left edge (Figma y1358). */}
        <Reveal
          as="p"
          delay={160}
          className="mt-6 max-w-[592px] font-sans text-base leading-[1.6] text-slate lg:ml-[476px]"
        >
          {fundAbout.imageCaption}
        </Reveal>

        {/* Figma insets the disclosure block 99px from the content column. */}
        <div className="mt-20 md:mt-[136px] lg:px-[99px]">
          <FundDisclosureList group="about" />
        </div>
      </Container>
    </section>
  );
}
