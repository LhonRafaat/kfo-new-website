import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { FundDisclosureList } from "@/components/sections/FundDisclosureList";
import { fundFaq } from "@/lib/content";

/**
 * "Frequently asked questions" (Figma "Section / FAQ"): the photo on the left,
 * the paged question list on the right. Figma desaturates and under-exposes
 * the photo with image filters (saturation −1, exposure −0.31), kept as CSS
 * filters so a colour photo dropped in later still reads as intended.
 */
export function FundFaq() {
  return (
    <section className="relative">
      <Container className="relative z-10 py-24 md:py-40">
        <Reveal as="h2" className="heading-section text-white">
          {fundFaq.heading}
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <Reveal
            delay={80}
            className="relative aspect-3/2 w-full overflow-hidden rounded-2xl lg:aspect-560/360 lg:w-[560px] lg:shrink-0 lg:self-start"
          >
            <Image
              src={fundFaq.image.src}
              alt={fundFaq.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-center grayscale brightness-[0.79]"
            />
          </Reveal>

          <Reveal delay={140} className="flex-1 lg:max-w-[592px]">
            <FundDisclosureList group="faq" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
