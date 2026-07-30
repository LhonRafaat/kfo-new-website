import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { servicesComingSoon } from "@/lib/content";

/**
 * "Coming soon — Production" card closing the services page (Figma 539:2130):
 * a 1184×432 rounded panel filled with a heavily under-exposed camera-operator
 * photo, the three lines of copy centred on it.
 *
 * Figma darkens the fill with an `exposure: -0.74` image filter, which has no
 * CSS equivalent; the exported asset has it baked in (measured against a render
 * of the node, mean error <1/255) so the card needs no scrim of its own.
 */
export function ProductionTeaser() {
  return (
    <section className="relative">
      <Container className="relative z-10 pt-10">
        <Reveal className="relative isolate flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl px-6 py-12 text-center text-white md:min-h-[432px] md:px-11">
          <Image
            src={servicesComingSoon.image.src}
            alt={servicesComingSoon.image.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            className="-z-10 object-cover object-center"
          />
          <div className="flex max-w-[1095px] flex-col items-center gap-[7px]">
            <p className="eyebrow-sm leading-6 tracking-[0.04em] text-white">
              {servicesComingSoon.eyebrow}
            </p>
            <h2 className="heading-section italic">
              {servicesComingSoon.title}
            </h2>
            <p className="body-md leading-6 text-white">
              {servicesComingSoon.body}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
