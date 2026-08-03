import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight } from "@/components/icons";
import {
  industryAgencyContactLine,
  industryProfiles,
  type IndustryAgency,
} from "@/lib/content";

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
 */
export function AgencyDetail({ agency }: { agency: IndustryAgency }) {
  const profile = industryProfiles[agency.website];

  const rows: { label: string; value: string; href?: string }[] = [
    { label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
  ];
  if (profile.phone) {
    rows.push({
      label: "Phone Number",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    });
  }

  return (
    <>
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
              Back to Industry guide
            </span>
          </Link>
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="heading-section mt-10 text-center text-ink"
        >
          {profile.displayName}
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[580fr_556fr] lg:gap-x-12">
          {/* Logo card (507:1036) — the mark centred on flat black at r8. */}
          <Reveal className="aspect-580/372 w-full self-start overflow-hidden rounded-lg bg-black">
            <span className="flex h-full w-full items-center justify-center">
              <Image
                src={profile.mark}
                alt={`${profile.displayName} logo`}
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
            {profile.blurb}
          </Reveal>

          {/* Category + domain (541:2341), centred against the photo beside it. */}
          <Reveal
            delay={80}
            className="flex flex-col items-center gap-4 self-center text-center"
          >
            <p className="eyebrow leading-[1.4]">{agency.field.value}</p>
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
              src={agency.image}
              alt={agency.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 556px"
              className="object-cover grayscale"
            />
          </Reveal>
        </div>

        {/* Contact table (507:1047) — same hairline idiom as the directory
            cards, but full width with 18px serif labels and 16px gaps. */}
        <Reveal className="mt-16 flex flex-col gap-4 pb-3">
          {rows.map((row) => (
            <ContactRow key={row.label} {...row} />
          ))}
          {profile.address && (
            <ContactRow label="Location" lines={profile.address} />
          )}
        </Reveal>

        <Reveal
          as="p"
          delay={80}
          className="mt-16.5 text-center font-sans text-2xl font-medium leading-9 text-ink"
        >
          {industryAgencyContactLine}
        </Reveal>
      </Container>
    </>
  );
}

/**
 * One row of the contact table. Single-line values sit on the label's base
 * line (Figma's counter-axis MAX); the multi-line address is top-aligned and
 * right-ragged, exactly as 507:1063 lays it out.
 */
function ContactRow({
  label,
  value,
  href,
  lines,
}: {
  label: string;
  value?: string;
  href?: string;
  lines?: string[];
}) {
  const body = lines ? (
    <span className="text-right">
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </span>
  ) : href ? (
    <a href={href} className="transition-colors duration-300 hover:text-accent">
      {value}
    </a>
  ) : (
    value
  );

  return (
    <div className="relative pt-4">
      {/* Figma draws these as zero-height LINE nodes; positioning the hairline
          absolutely keeps the 16px above the row exactly 16px. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-black/16" />
      <div
        className={`flex justify-between gap-8 px-4 ${
          lines ? "items-start" : "items-end"
        }`}
      >
        <span className="font-serif text-lg font-medium leading-normal text-ink">
          {label}
        </span>
        <span className="font-sans text-base font-medium leading-6 text-ink">
          {body}
        </span>
      </div>
    </div>
  );
}
