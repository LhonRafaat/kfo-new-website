import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight } from "@/components/icons";
import { FundDownloads } from "@/components/sections/FundDownloads";
import { fundDownloadsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guidelines & Templates",
  description:
    "Regulations, guidelines and application templates for the Kurdistan Film Fund's grant cycles.",
  alternates: { canonical: "/film-fund/guidelines" },
};

export default function FundGuidelinesPage() {
  return (
    <>
      <div className="relative isolate overflow-x-clip bg-ink-deep">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-[0.10] mix-blend-screen"
          aria-hidden
        />

        {/* Figma opens the page on a 160px band of the mountain photo, with the
            header sitting over it. */}
        <div className="relative h-40 w-full">
          <Image
            src={fundDownloadsPage.image.src}
            alt={fundDownloadsPage.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <Navbar />

        <main className="relative">
          <Container className="relative z-10 pt-20">
            <Reveal className="flex justify-center">
              <Link
                href="/film-fund"
                className="flex items-center gap-2 font-sans text-base font-semibold uppercase tracking-label text-white opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <CaretRight className="h-5 w-5 rotate-180" />
                {fundDownloadsPage.backLabel}
              </Link>
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="heading-section mt-10 text-center text-white"
            >
              {fundDownloadsPage.heading}
            </Reveal>
            <Reveal
              as="p"
              delay={100}
              className="mx-auto mt-4 max-w-[492px] text-center font-sans text-base leading-[1.6] text-slate"
            >
              {fundDownloadsPage.intro}
            </Reveal>
          </Container>

          <div className="mt-12">
            <FundDownloads />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
