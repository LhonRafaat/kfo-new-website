/**
 * Media helpers, kept apart from `strapi.ts` so client components can resolve an
 * image URL without pulling the server loaders (and `STRAPI_TOKEN`) into the
 * browser bundle. Only the public base URL is referenced here.
 */

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export type StrapiImage = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

/** What every `next/image` in this codebase wants, from a Strapi media field. */
export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Absolute URL for a media field — Strapi returns paths relative to its host. */
export function mediaUrl(image?: { url?: string } | null): string {
  if (!image?.url) return "";
  return image.url.startsWith("http") ? image.url : `${BASE}${image.url}`;
}

/**
 * A media field as `{ src, alt, width, height }`. Alt text is the media
 * library's own `alternativeText` rather than a field beside the image, so a
 * photo carries its description wherever it is used.
 */
export function media(image?: StrapiImage | null): Media {
  return {
    src: mediaUrl(image),
    alt: image?.alternativeText ?? "",
    width: image?.width ?? 0,
    height: image?.height ?? 0,
  };
}

/** Media list, with the empty slots dropped. */
export function mediaList(images?: (StrapiImage | null)[] | null): Media[] {
  return (images ?? []).filter(Boolean).map((image) => media(image));
}

/** Strapi serves SVGs untouched and Next's optimiser refuses them unless SVG is
 *  globally allowlisted, which we do not want for remote images. */
export const isSvg = (src: string) => src.toLowerCase().endsWith(".svg");
