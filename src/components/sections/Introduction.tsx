import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { CurveIntro } from "@/components/icons";

export function Introduction() {
  return (
    <section className="relative bg-cream">
      <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />
      {/* Signature flowing line — deliberately overflows into the section below */}
      <CurveIntro className="pointer-events-none absolute left-0 top-[38%] z-0 h-[150%] w-full text-ink/30" />

      <Container className="relative z-10 py-20 md:py-28">
        <Eyebrow>Introduction</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <h2 className="display-lg text-ink lg:col-span-7">
            Shaping Stories.
            <br />
            Enabling Productions.
            <br />
            <em className="italic">Showcasing Kurdistan.</em>
          </h2>
          <p className="body-lg max-w-md self-end lg:col-span-5 lg:col-start-8 lg:pb-3">
            The Kurdistan Film Commission supports filmmakers from around the world in bringing
            their stories to life. From breathtaking landscapes to rich cultural narratives, we
            provide the foundation for seamless, high-quality productions.
          </p>
        </div>
      </Container>
    </section>
  );
}
