import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import {
  ContactTable,
  type ContactTableRow,
} from "@/components/ui/ContactTable";
import { CaretRight } from "@/components/icons";
import { media } from "@/lib/media";
import type { Agency, IndustryGuidePage } from "@/lib/strapi";

/**
 * One industry-guide listing opened up (Figma "Agency Opened", 507:906).
 *
 * The frame is a centred back-link and title over a 2×2 block: the agency's
 * logo on a 580×372 black card with its blurb bottom-aligned beside it, then
 * its category + domain centred under the card with the team photo beside
 * that. A full-width contact table and a closing line sit underneath.
 *
 * Columns are 580/556 with a 48px gutter (1184 in total); the two rows are
 * both 372 tall with 40px between them. Because the two cards carry almost the
 * same aspect (1.559 vs 1.495) against columns in the same 580:556 ratio, the
 * rows stay level at every width without hard-coding a height.
 *
 * The Figma authored exactly one of these pages, which every listing opened
 * verbatim. Each listing is its own record now, so the page shows that
 * listing's own mark, blurb, category and contact details.
 */
export function AgencyDetail({
  agency,
  copy,
}: {
  agency: Agency;
  copy: IndustryGuidePage;
}) {
  const photo = media(agency.image);
  const mark = media(agency.mark);

  const rows: ContactTableRow[] = [
    { label: "E-mail", value: agency.email, href: `mailto:${agency.email}` },
    {
      label: "Phone Number",
      value: agency.phone,
      href: `tel:${agency.phone.replace(/\s/g, "")}`,
    },
    {
      label: "Location",
      lines: agency.address.split("\n"),
      valueWidth: "284px",
    },
  ];

  return (
    <Container className="pb-12 pt-12">
      {/* Figma 541:2212 — centred, 64% opacity, caret pointing back. */}
      <Reveal className="flex justify-center">
        <Link
          href="/industry-guide"
          className="group flex items-center gap-2 opacity-64 transition-opacity duration-300 hover:opacity-100"
        >
          <CaretRight
            className="h-5 w-5 rotate-180 text-cocoa/80 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            aria-hidden
          />
          <span className="font-sans text-base font-semibold uppercase leading-[1.4] tracking-label text-espresso">
            {copy.backLabel}
          </span>
        </Link>
      </Reveal>

      <Reveal
        as="h1"
        delay={80}
        className="heading-section mt-10 text-center text-ink"
      >
        {agency.displayName}
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[580fr_556fr] lg:gap-x-12">
        {/* Logo card (507:1036) — the mark centred on flat black at r8. */}
        <Reveal className="aspect-580/372 w-full self-start overflow-hidden rounded-lg bg-black">
          <span className="flex h-full w-full items-center justify-center">
            <Image
              src={mark.src}
              alt={mark.alt || `${agency.displayName} logo`}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          </span>
        </Reveal>

        {/* Blurb (507:955) — sits on the base line of the logo card. */}
        <Reveal
          as="p"
          delay={120}
          className="self-end font-sans text-base font-semibold leading-6 text-ink/60"
        >
          {agency.blurb}
        </Reveal>

        {/* Category + domain (541:2341), centred against the photo beside it. */}
        <Reveal
          delay={80}
          className="flex flex-col items-center gap-4 self-center text-center"
        >
          <p className="eyebrow leading-[1.4]">{agency.category?.name}</p>
          <a
            href={`https://${agency.website}`}
            target="_blank"
            rel="noreferrer noopener"
            className="heading-section text-ink transition-colors duration-300 hover:text-accent"
          >
            {agency.website}
          </a>
        </Reveal>

        {/* Team photo (541:2339) — black and white like the directory card. */}
        <Reveal
          delay={120}
          className="relative aspect-556/372 w-full overflow-hidden rounded-lg"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 556px"
            className="object-cover grayscale"
          />
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <ContactTable rows={rows} />
      </Reveal>

      <Reveal
        as="p"
        delay={80}
        className="mt-16.5 text-center font-sans text-2xl font-medium leading-9 text-ink"
      >
        {copy.contactLine}
      </Reveal>
    </Container>
  );
}
