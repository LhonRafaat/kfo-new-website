import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FundWordmark } from "@/components/FundWordmark";
import { LogoMark } from "@/components/icons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";
import { footerColumns, fundFooter, site, socials } from "@/lib/content";

const socialIcons = {
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const;

/**
 * Footer (Figma "Footer VB", 529:1561) — compact sans links, pill newsletter.
 *
 * `variant="fund"` is the film fund pages' copy of the same block (753:68):
 * identical geometry, turned over onto a slate ground with espresso type, and
 * carrying the fund's own wordmark, links and byline rather than the site's.
 */
export function Footer({ variant = "site" }: { variant?: "site" | "fund" }) {
  const fund = variant === "fund";
  const columns = fund ? fundFooter.columns : footerColumns;
  const description = fund ? fundFooter.description : site.description;
  const copyright = fund
    ? fundFooter.copyright
    : "© 2026 Kurdistan Film Commission";

  return (
    <footer
      className={
        fund ? "bg-slate text-espresso" : "bg-espresso text-white"
      }
    >
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Brand + newsletter */}
          <div className="flex max-w-[401px] flex-col gap-10">
            <div className="flex flex-col gap-4">
              {fund ? (
                <Link
                  href="/film-fund"
                  aria-label={`${fundFooter.wordmark} — film fund`}
                  className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
                >
                  <LogoMark className="h-[22px] w-[42px] sm:h-[25px] sm:w-[50px]" />
                  <FundWordmark className="h-[14px] w-auto sm:h-[17px]" />
                </Link>
              ) : (
                <Logo
                  wordmarkClassName="h-[14px] w-auto sm:h-[17px]"
                  markClassName="h-[22px] w-[42px] sm:h-[25px] sm:w-[50px]"
                />
              )}
              <p
                className={`font-sans text-base leading-6 tracking-[0.02em] ${
                  fund ? "text-espresso" : "text-white"
                }`}
              >
                {description}
              </p>
            </div>
            <NewsletterForm tone={fund ? "ink" : "light"} />
          </div>

          {/* Link columns */}
          <nav className="flex gap-16 lg:gap-24">
            {columns.map((column, i) => (
              <ul key={i} className="flex min-w-[134px] flex-col gap-4">
                {column.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      data-label={item.label}
                      className={`link-bold font-sans text-base leading-[1.375] ${
                        fund ? "text-espresso" : "text-white"
                      }`}
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
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`transition-colors duration-300 hover:text-accent-soft ${
                    fund ? "text-espresso" : "text-white"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <div
            className={`flex flex-wrap items-center gap-[22px] font-sans text-base leading-6 tracking-[0.02em] ${
              fund ? "text-espresso" : "text-white"
            }`}
          >
            <span>{copyright}</span>
            <Link
              href="/privacy-policy"
              data-label="Privacy Policy"
              className="link-bold"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
