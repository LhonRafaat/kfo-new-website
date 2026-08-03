import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { industryGuideHero } from "@/lib/content";

/**
 * Industry Guide hero (Figma 507:789 + 507:793): one full-viewport photo with
 * the title and intro centred over it — the only section on the site whose
 * copy sits dead centre rather than on the base line.
 *
 * Figma darkens the photo with its own image filters (exposure −0.60, contrast
 * −0.09, saturation −1.0) rather than a wash layer, so the treatment is baked
 * into `industry-hero.jpg` instead of stacking a gradient over it — see the
 * asset note in the page's build script.
 *
 * The text block is 567px wide with the paragraph held to 521px, both left
 * aligned inside it, and 24px between them.
 */
export function IndustryGuideHero() {
  return (
    <section className="relative flex h-svh min-h-[560px] items-center justify-center overflow-hidden bg-ink">
      <Image
        src={industryGuideHero.image.src}
        alt={industryGuideHero.image.alt}
        fill
        priority
        sizes="100vw"
        // The photo is a near-flat dark grayscale sky; at the optimiser's
        // default quality of 75 the gradient bands into visible contours.
        quality={92}
        className="object-cover object-center"
      />

      <div className="container-edge relative z-10">
        <div className="mx-auto flex max-w-[567px] flex-col gap-6">
          <Reveal as="h1" className="heading-section text-cream">
            {industryGuideHero.title}
            <em className="font-normal italic">
              {industryGuideHero.titleItalic}
            </em>
          </Reveal>

          <Reveal
            as="p"
            delay={120}
            className="max-w-[521px] font-sans text-base font-semibold leading-6 text-white"
          >
            {industryGuideHero.intro}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
