import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import {
  ContactTable,
  type ContactTableRow,
} from "@/components/ui/ContactTable";
import { ContactForm } from "@/components/sections/ContactForm";
import { media } from "@/lib/media";
import type { ContactPage } from "@/lib/strapi";

/**
 * /contact (Figma "Contact Us", 508:1077): a two-column band — the invitation
 * and the letter form on the left, one 657×518 photo on the right — over the
 * commission's own contact table.
 *
 * Columns are 480/657 with the frame's 48px gutter. Both sides are 518 tall at
 * the design width: the intro (122) plus its 48px gap plus the form (348)
 * comes to exactly the photo's height, so the two edges line up.
 */
export function ContactSection({ page }: { page: ContactPage }) {
  const image = media(page.image);
  const { details } = page;

  const rows: ContactTableRow[] = [
    {
      label: details.emailLabel,
      value: details.email,
      href: `mailto:${details.email}`,
    },
    {
      label: details.phoneLabel,
      value: details.phone,
      href: `tel:${details.phone.replace(/\s/g, "")}`,
    },
    {
      label: details.addressLabel,
      lines: details.address.split("\n"),
      valueWidth: "329px",
    },
  ];

  return (
    <Container className="pb-12 pt-14">
      <div className="grid gap-10 lg:grid-cols-[480fr_657fr] lg:gap-x-12">
        <div className="flex flex-col">
          <Reveal className="max-w-[311px]">
            <h1 className="heading-section text-ink">{page.heading}</h1>
            {/* 14px under the heading, per the intro frame's item spacing. */}
            <p className="mt-3.5 font-sans text-base font-semibold leading-6 text-ink/60">
              {page.intro}
            </p>
          </Reveal>

          {/* `reveal-underline` opts the submit rule into drawing itself in
              with the form, the same gesture as the services page title. */}
          <Reveal delay={120} className="reveal-underline mt-12">
            <ContactForm form={page.form} email={details.email} />
          </Reveal>
        </div>

        <Reveal
          delay={80}
          className="relative aspect-657/518 w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 657px"
            className="object-cover"
          />
        </Reveal>
      </div>

      <Reveal className="mt-18">
        <ContactTable rows={rows} />
      </Reveal>
    </Container>
  );
}
