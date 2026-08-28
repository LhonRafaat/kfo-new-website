import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight, Underline } from "@/components/icons";
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
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-50 grayscale mix-blend-multiply"
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
        <Navbar tone="dark" />

        <main className="relative">
          <Container className="relative z-10 pt-20">
            <Reveal className="flex justify-center">
              <Link
                href="/film-fund"
                className="flex items-center gap-2 font-sans text-base font-semibold uppercase tracking-label text-white opacity-[0.64] transition-opacity duration-300 hover:opacity-100"
              >
                <CaretRight className="h-5 w-5 rotate-180" />
                {fundDownloadsPage.backLabel}
              </Link>
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="heading-section mt-12 text-center text-white"
            >
              {fundDownloadsPage.heading}
            </Reveal>
            {/* A 492px block centred on the page — the lines inside it are
                ranged left, not centred (939:355). */}
            <Reveal
              as="p"
              delay={100}
              className="mx-auto mt-4 max-w-[492px] font-sans text-base leading-[1.6] text-slate"
            >
              {fundDownloadsPage.intro}
            </Reveal>

            {/* 1078:115 — no Kurdish set exists yet, so this is still a label. */}
            <Reveal delay={140} className="reveal-underline mt-8 flex justify-center">
              <span className="font-serif text-2xl font-medium italic leading-[1.14] tracking-label text-white">
                {fundDownloadsPage.switchLabel}
                <Underline className="!mt-1.5 !h-[5px] w-full text-rust" />
              </span>
            </Reveal>
          </Container>

          <div className="mt-20">
            <FundDownloads />
          </div>
        </main>
      </div>
      <Footer variant="fund" />
    </>
  );
}
