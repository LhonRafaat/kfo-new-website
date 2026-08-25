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
    <section className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="reveal-underline relative isolate overflow-hidden rounded-2xl">
          <Image
            src={fundApplication.image.src}
            alt={fundApplication.image.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            className="-z-10 object-cover object-center"
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
                className="self-start font-serif text-[1.375rem] font-medium italic leading-[1.14] transition-colors duration-300 hover:text-accent md:text-[2rem]"
              >
                {fundApplication.cta}
                <Underline className="!mt-1.5 !h-[5px] w-full" />
              </Link>
            </div>

            <div className="flex max-w-[494px] flex-col gap-4">
              {fundApplication.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-base leading-[1.5] md:text-xl md:leading-[1.5]"
                >
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
