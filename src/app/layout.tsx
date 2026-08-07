import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getGlobal, getSiteAssets, mediaUrl } from "@/lib/strapi";

// Flecha M — display serif (the design's headline + editorial face)
const flecha = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "../fonts/FlechaM-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/FlechaM-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../fonts/FlechaM-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/FlechaM-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../fonts/FlechaM-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/FlechaM-BoldItalic.otf", weight: "700", style: "italic" },
  ],
});

// Cadiz — grotesque sans for body copy and labels
const cadiz = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/Cadiz-Book.otf", weight: "400", style: "normal" },
    { path: "../fonts/Cadiz-Regular.otf", weight: "500", style: "normal" },
    { path: "../fonts/Cadiz-SemiBold.otf", weight: "600", style: "normal" },
  ],
});

/**
 * Site-wide metadata, from Strapi's `global` single type. Individual pages layer
 * their own `seo` component over this through `seoMetadata()`; anything they
 * leave blank falls through to these defaults.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getGlobal();
  const seo = site.defaultSeo;
  const ogImage = mediaUrl(seo?.ogImage);
  const title = seo?.metaTitle ?? `${site.siteName} — ${site.tagline}`;
  const description = seo?.metaDescription ?? site.description;

  return {
    metadataBase: new URL(site.siteUrl),
    title: { default: title, template: `%s | ${site.siteName}` },
    description,
    ...(seo?.keywords
      ? { keywords: seo.keywords.split(",").map((k) => k.trim()) }
      : {}),
    authors: [{ name: site.siteName }],
    creator: site.siteName,
    alternates: { canonical: seo?.canonical ?? "/" },
    openGraph: {
      type: "website",
      url: site.siteUrl,
      siteName: site.siteName,
      title,
      description,
      locale: "en_US",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: seo?.ogImage?.alternativeText ?? "",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: site.siteName,
      description: site.tagline,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#EAE3DB",
  width: "device-width",
  initialScale: 1,
};

/** `url(...)` for a CSS custom property, or nothing when the slot is empty. */
const asset = (image: Parameters<typeof mediaUrl>[0]) => {
  const url = mediaUrl(image);
  return url ? `url("${url}")` : undefined;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assets = await getSiteAssets();

  // The paper scans, washes and map artwork are all editable in the admin
  // panel, so they are published once here as custom properties rather than
  // hard-coded into the stylesheet and half a dozen inline styles. Empty slots
  // are left unset so each usage falls back to its bundled asset.
  const textures = {
    "--asset-paper-tile": asset(assets.paperTile),
    "--asset-paper-testimonial": asset(assets.paperTestimonial),
    "--asset-paper-founder": asset(assets.paperFounder),
    "--asset-paper-modal": asset(assets.paperModal),
    "--asset-paper-news": asset(assets.paperNews),
    "--asset-floral": asset(assets.floralTexture),
    "--asset-services-wash": asset(assets.servicesWash),
    "--asset-founder-bg": asset(assets.founderBackground),
    "--asset-map-hero": asset(assets.kurdistanMapHero),
    "--asset-map": asset(assets.kurdistanMap),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${flecha.variable} ${cadiz.variable}`}
      style={textures}
    >
      <body>{children}</body>
    </html>
  );
}
