import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

/**
 * Introduction (Figma 317:623): eyebrow + three-line statement (third line
 * italic), with the supporting paragraph right-aligned underneath.
 */
export function Introduction() {
  return (
    <section className="relative">
      <Container className="relative z-10 py-12">
        <div className="flex flex-col gap-4">
          <Reveal as="span" className="eyebrow-sm">
            Introduction
          </Reveal>
          <Reveal as="h2" className="heading-section text-ink">
            Shaping Stories.
            <br />
            Enabling Productions.
            <br />
            <em className="font-normal italic">Showcasing Kurdistan.</em>
          </Reveal>
        </div>
        <div className="mt-6 flex justify-end">
          <Reveal as="p" delay={120} className="body-md max-w-[450px]">
            The Kurdistan Film Commission supports filmmakers from around the
            world in bringing their stories to life. From breathtaking
            landscapes to rich cultural narratives, we provide the foundation
            for seamless, high-quality productions.
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
