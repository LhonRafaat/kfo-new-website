import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { seoMetadata } from "@/lib/seo";
import { getContactPage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return seoMetadata(page.seo);
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <>
      {/* Cream under the tiled paper scan, with the navbar inside the texture
          so there is no seam above it — the same shell as /locations. */}
      <div className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />

        <Navbar variant="solid" />
        <main className="relative">
          <ContactSection page={page} />
        </main>
      </div>
      <Footer />
    </>
  );
}
