import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PeopleDirectory } from "@/components/sections/PeopleDirectory";
import { fundDownloadsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Fund Team",
  description:
    "The people running the Kurdistan Film Fund — the team behind its two annual grant cycles.",
  alternates: { canonical: "/film-fund/team" },
};

export default function FundTeamPage() {
  return (
    <>
      <div className="relative isolate overflow-x-clip bg-ink-deep">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-50 grayscale mix-blend-multiply"
          aria-hidden
        />

        {/* The same 160px band of the mountain photo the guidelines page opens
            on, with the header sitting over it (1078:129). */}
        <div className="relative h-40 w-full">
          <Image
            src={fundDownloadsPage.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <Navbar tone="dark" />

        <main className="relative pt-8">
          <PeopleDirectory section="fund" />
        </main>
      </div>
      <Footer variant="fund" />
    </>
  );
}
