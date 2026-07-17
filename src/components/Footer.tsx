import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";
import { footerColumns, site, socials } from "@/lib/content";

const socialIcons = {
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const;

export function Footer() {
  return (
    <footer className="bg-espresso text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-md">
            <Logo
              wordmarkClassName="h-[15px] w-auto"
              markClassName="h-[22px] w-[42px]"
            />
            <p className="mt-6 font-sans text-xl leading-relaxed text-white/80">
              {site.description}
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-8 sm:gap-12 lg:justify-items-end">
            {footerColumns.map((column, i) => (
              <ul key={i} className="flex flex-col gap-4">
                {column.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="link-underline font-serif text-[26px] font-medium italic leading-[1.14] text-white/90 hover:text-white"
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
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-10">
          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/80 transition-colors duration-300 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-sans text-xl text-white/70">
            <span>© 2026 Kurdistan Film Commission</span>
            <Link
              href="/privacy-policy"
              className="link-underline hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
