import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

const siteUrl = "https://kurdistanfilmcommission.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Kurdistan Film Commission — The official film commission in Kurdistan & Iraq",
    template: "%s | Kurdistan Film Commission",
  },
  description:
    "The Kurdistan Film Commission supports filmmakers from around the world in bringing their stories to life — from breathtaking landscapes to rich cultural narratives, we provide the foundation for seamless, high-quality productions.",
  keywords: [
    "Kurdistan Film Commission",
    "film commission Iraq",
    "filming in Kurdistan",
    "Kurdistan Film Fund",
    "location database Kurdistan",
    "film production Kurdistan",
  ],
  authors: [{ name: "Kurdistan Film Commission" }],
  creator: "Kurdistan Film Commission",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kurdistan Film Commission",
    title:
      "Kurdistan Film Commission — The official film commission in Kurdistan & Iraq",
    description:
      "Shaping stories. Enabling productions. Showcasing Kurdistan. Explore the largest location database in the Kurdistan Region and apply for the Film Fund.",
    locale: "en_US",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "The mountains of Kurdistan at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurdistan Film Commission",
    description: "The official film commission in Kurdistan & Iraq.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#EAE3DB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${flecha.variable} ${cadiz.variable}`}>
      <body>{children}</body>
    </html>
  );
}
