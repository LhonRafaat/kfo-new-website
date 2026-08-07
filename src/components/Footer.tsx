import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";
import { getGlobal } from "@/lib/strapi";

const socialIcons = {
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const;

/** Footer (Figma "Footer VB", 529:1561) — compact sans links, pill newsletter.
 *  Every string and link comes from Strapi's `global` single type. */
export async function Footer() {
  const site = await getGlobal();

  return (
    <footer className="bg-espresso text-white">
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Brand + newsletter */}
          <div className="flex max-w-[401px] flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Logo
                siteName={site.siteName}
                wordmarkClassName="h-[14px] w-auto sm:h-[17px]"
                markClassName="h-[22px] w-[42px] sm:h-[25px] sm:w-[50px]"
              />
              <p className="font-sans text-base leading-6 tracking-[0.02em] text-white">
                {site.description}
              </p>
            </div>
            <NewsletterForm
              placeholder={site.newsletterPlaceholder}
              successMessage={site.newsletterSuccess}
            />
          </div>

          {/* Link columns */}
          <nav className="flex gap-16 lg:gap-24">
            {site.footerColumns.map((column, i) => (
              <ul key={i} className="flex min-w-[134px] flex-col gap-4">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      data-label={item.label}
                      className="link-bold font-sans text-base leading-[1.375] text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Socials + legal */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-[22px]">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              if (!Icon) return null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white transition-colors duration-300 hover:text-accent-soft"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-[22px] font-sans text-base leading-6 tracking-[0.02em] text-white">
            <span>{site.copyright}</span>
            {site.legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-label={item.label}
                className="link-bold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
