import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { quickLinks } from "@/lib/content";

export function QuickLinks() {
  return (
    <section className="relative bg-cream">
      <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />
      <Container className="relative grid grid-cols-1 gap-x-6 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group flex flex-col justify-center rounded-sm px-6 py-6 transition-colors duration-300 ${
              item.featured ? "bg-black/[0.07]" : "px-1"
            }`}
          >
            <span className="eyebrow-light text-ink/70">{item.label}</span>
            <span className="mt-2 font-serif text-2xl italic text-ink transition-colors duration-300 group-hover:text-accent md:text-[1.75rem]">
              {item.title}
            </span>
          </Link>
        ))}
      </Container>
    </section>
  );
}
