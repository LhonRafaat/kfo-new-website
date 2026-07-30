import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { serviceCategories, type ServiceCategorySlug } from "@/lib/content";

/**
 * A service category — heading, intro, the disclosure list, and the category
 * photo (Figma: Facilities at y896–1517, Logistics at y1637–2273).
 *
 * The two categories are laid out differently in the design and the data says
 * which: Facilities runs its intro across the full content column with the
 * photo to the right of the list; Logistics puts the photo on the left and
 * keeps heading, intro and list stacked in the column beside it. Both collapse
 * to one column below `lg`, with the copy always ahead of the photo.
 */
export function ServiceCategory({ slug }: { slug: ServiceCategorySlug }) {
  const category = serviceCategories.find((c) => c.slug === slug);
  if (!category) return null;

  const { heading, intro, image, introPlacement } = category;
  const introAbove = introPlacement === "above";

  const photo = (
    <Reveal delay={introAbove ? 160 : 80}>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-center"
        />
      </div>
    </Reveal>
  );

  const title = (
    <Reveal as="h2" className="heading-section text-ink">
      {heading}
    </Reveal>
  );

  // Figma measures the Facilities intro at 777px and the Logistics one at 492 —
  // the wider column it sits in, in each case.
  const lead = (
    <Reveal
      as="p"
      delay={80}
      className={`body-md mt-6 leading-6 ${introAbove ? "max-w-[777px]" : "max-w-[492px]"}`}
    >
      {intro}
    </Reveal>
  );

  return (
    <section className="relative">
      <Container
        className={`relative z-10 ${introAbove ? "pt-16" : "pt-20 lg:pt-[120px]"}`}
      >
        {introAbove && (
          <>
            {title}
            {lead}
          </>
        )}

        <div
          className={`grid gap-10 ${
            introAbove
              ? "mt-[50px] lg:grid-cols-[485fr_635fr] lg:gap-16"
              : "lg:grid-cols-[612fr_520fr] lg:gap-[52px]"
          }`}
        >
          {/* Logistics puts its photo in the first (612fr) column, so the copy
              is re-ordered on lg+ only — stacked, the copy always leads. */}
          <div className={introAbove ? "" : "lg:order-last"}>
            {!introAbove && (
              <>
                {title}
                {lead}
              </>
            )}
            <Reveal delay={120} className={introAbove ? "" : "mt-10"}>
              <ServiceAccordion slug={slug} />
            </Reveal>
          </div>
          {photo}
        </div>
      </Container>
    </section>
  );
}
