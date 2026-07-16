import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";

export function FounderStatement() {
  return (
    <section className="relative bg-slate text-ink">
      {/* Folded-paper texture stretched to fill — its natural centre crease reads as
          the vertical fold between the two columns, exactly like the Figma. */}
      <TextureOverlay
        src="/images/texture-paper-founder.webp"
        opacity={0.6}
        blend="multiply"
        stretch
        flipX
      />
      <TextureOverlay
        src="/images/floral-texture.webp"
        opacity={0.18}
        blend="soft-light"
      />

      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait + caption — sized to the Figma (560 × 419, full column width) */}
          <figure className="w-full">
            <Parallax
              speed={0.15}
              className="relative aspect-560/419 w-full rounded-sm bg-ink/10 shadow-lg"
            >
              <Image
                src="/images/founder.jpg"
                alt="Bavi Yassin, Founder of the Kurdistan Film Commission"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </Parallax>
            <figcaption className="mt-6 text-center">
              <p className="font-serif text-2xl font-bold italic">
                Bavi Yassin
              </p>
              <p className="mt-1 font-serif text-2xl">
                Founder, Kurdistan Film Commission
              </p>
            </figcaption>
          </figure>

          {/* Statement */}
          <div>
            <Reveal as="h2" className="display-xl text-ink">
              We have so much more than just the mountains.
            </Reveal>
            <Reveal as="p" delay={80} className="mt-8 font-serif text-2xl">
              Founder&apos;s Statement &amp; Vision
            </Reveal>
            <blockquote className="mt-5 max-w-xl">
              <p className="body-lg relative pl-6 leading-relaxed">
                <span
                  className="absolute left-0 top-0 font-serif text-3xl leading-none text-accent"
                  aria-hidden
                >
                  &ldquo;
                </span>
                Kurdistan Film Commission is the newly established non-profit
                film commission in the Kurdistan region of Iraq. The northern
                region of Iraq is well-known for its rich history, beautiful
                landscapes, charming cities, mountains, and vibrant cultural
                heritage.
              </p>
            </blockquote>
            <div className="mt-8">
              <AccentLink href="/about">Read Full Message</AccentLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
