import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { lines } from "@/lib/text";
import type { HomePage } from "@/lib/strapi";

/**
 * Introduction (Figma 317:623): eyebrow + three-line statement (third line
 * italic), with the supporting paragraph right-aligned underneath.
 */
export function Introduction({
  intro,
}: {
  intro: HomePage["introduction"];
}) {
  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        <div className="flex flex-col gap-4">
          <Reveal as="span" className="eyebrow-sm">
            {intro.eyebrow}
          </Reveal>
          <Reveal as="h2" className="heading-section text-ink">
            {lines(intro.heading)}
            {intro.headingEmphasis && (
              <>
                <br />
                <em className="font-normal italic">{intro.headingEmphasis}</em>
              </>
            )}
          </Reveal>
        </div>
        <div className="mt-6 flex justify-end">
          <Reveal as="p" delay={120} className="body-md max-w-[450px]">
            {intro.body}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
