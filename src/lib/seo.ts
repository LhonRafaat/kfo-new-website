import type { Metadata } from "next";
import { mediaUrl } from "@/lib/media";
import type { Seo } from "@/lib/strapi";

/**
 * Turns a page's `seo` component into Next `Metadata`.
 *
 * Every field is optional in the admin panel, so anything left blank simply
 * falls out of the object and the root layout's defaults apply — a page with an
 * empty SEO block still inherits the site title template and description.
 */
export function seoMetadata(seo: Seo | null | undefined): Metadata {
  if (!seo) return {};

  const title = seo.metaTitle ?? undefined;
  const description = seo.metaDescription ?? undefined;
  const image = mediaUrl(seo.ogImage);

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(seo.keywords
      ? { keywords: seo.keywords.split(",").map((k) => k.trim()) }
      : {}),
    ...(seo.canonical ? { alternates: { canonical: seo.canonical } } : {}),
    ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image
        ? {
            images: [
              { url: image, alt: seo.ogImage?.alternativeText ?? undefined },
            ],
          }
        : {}),
    },
  };
}
