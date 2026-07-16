import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Reveal } from "@/components/Reveal";
import { ScrollCurve } from "@/components/ScrollCurve";

export function Introduction() {
  return (
    <section className="relative bg-cream">
      <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />
      {/* Signature flowing line — draws on scroll, threading the headline and
          bottoming out at the "Untold Stories" heading below */}
      <ScrollCurve
        variant="intro"
        className="pointer-events-none absolute left-[-9%] top-[32%] z-0 h-[102%] w-[106%] text-ink/45"
      />

      <Container className="relative z-10 py-16">
        <Reveal as="div">
          <Eyebrow>Introduction</Eyebrow>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal as="h2" className="display-lg text-ink lg:col-span-7">
            Shaping Stories.
            <br />
            Enabling Productions.
            <br />
            Showcasing Kurdistan.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="body-lg max-w-md self-end lg:col-span-5 lg:col-start-8 lg:pb-3"
          >
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
