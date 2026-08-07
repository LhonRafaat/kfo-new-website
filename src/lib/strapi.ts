/**
 * Server-side loader for the Strapi backend in `../kfo-new-website-backend`.
 *
 * This replaces `src/lib/content.ts`: every export that file used to hold is
 * now one of the loaders below. They are plain `fetch` calls, so they run in
 * server components and go through Next's data cache; `revalidate` comes from
 * `STRAPI_REVALIDATE` (60s by default), so an edit in the admin panel shows up
 * without a rebuild.
 *
 *   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
 *   STRAPI_REVALIDATE=60
 *   STRAPI_TOKEN=            # only if the public role gets locked down
 *
 * Nothing here may be imported from a client component — `STRAPI_TOKEN` is a
 * server secret. The three form submissions the browser makes live in
 * `strapi-forms.ts` instead.
 */

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const REVALIDATE = Number(process.env.STRAPI_REVALIDATE ?? 60);

/* ------------------------------------------------------------------- media */

// The helpers live in `media.ts` so client components can use them too; they
// are re-exported here because most callers want them beside a loader.
export {
  media,
  mediaList,
  mediaUrl,
  isSvg,
  type Media,
  type StrapiImage,
} from "@/lib/media";

import type { StrapiImage } from "@/lib/media";

/* ------------------------------------------------------------------ shared */

export type Link = { label: string; href: string; external?: boolean };
export type NavItem = { index: string; label: string; href: string };
export type SocialLink = {
  label: string;
  href: string;
  icon: "youtube" | "linkedin" | "instagram";
};

export type Seo = {
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  canonical: string | null;
  noIndex: boolean;
  ogImage: StrapiImage | null;
};

export type SectionHeading = {
  heading: string;
  headingEmphasis: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

/* ----------------------------------------------------------------- fetcher */

async function get<T>(path: string, query = ""): Promise<T> {
  const url = `${BASE}/api/${path}${query ? `?${query}` : ""}`;
  const res = await fetch(url, {
    headers: process.env.STRAPI_TOKEN
      ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
      : undefined,
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(
      `Strapi ${res.status} on ${url} — is the backend running? (npm run develop in "kfo-new-website-backend")`,
    );
  }
  const json = await res.json();
  return json.data as T;
}

/* ------------------------------------------------------------------ global */

export type Global = {
  siteName: string;
  wordmark: string;
  tagline: string;
  description: string;
  siteUrl: string;
  newsletterPlaceholder: string;
  newsletterSuccess: string;
  copyright: string;
  primaryNav: NavItem[];
  secondaryNav: Link[];
  socials: SocialLink[];
  legalLinks: Link[];
  footerColumns: { heading: string | null; links: Link[] }[];
  organization: {
    name: string;
    alternateName: string | null;
    url: string;
    description: string;
    areaServed: string | null;
  } | null;
  defaultSeo: Seo | null;
};

/** Navbar, footer, newsletter copy, socials, the Organization JSON-LD. */
export const getGlobal = () =>
  get<Global>(
    "global",
    "populate[primaryNav]=true&populate[secondaryNav]=true" +
      "&populate[footerColumns][populate][links]=true" +
      "&populate[socials]=true&populate[legalLinks]=true" +
      "&populate[organization]=true&populate[defaultSeo][populate][ogImage]=true",
  );

export type SiteAssets = {
  paperTile: StrapiImage | null;
  paperTestimonial: StrapiImage | null;
  paperFounder: StrapiImage | null;
  paperModal: StrapiImage | null;
  paperNews: StrapiImage | null;
  floralTexture: StrapiImage | null;
  servicesWash: StrapiImage | null;
  founderBackground: StrapiImage | null;
  kurdistanMapHero: StrapiImage | null;
  kurdistanMap: StrapiImage | null;
  kurdistanRegionMap: StrapiImage | null;
  locationWatermarks: StrapiImage[] | null;
  ogImage: StrapiImage | null;
};

/** The paper scans, washes and map artwork the pages paint behind themselves. */
export const getSiteAssets = () => get<SiteAssets>("site-assets", "populate=*");

/* -------------------------------------------------------------------- home */

export type QuickLink = {
  label: string;
  title: string;
  href: string;
  featured: boolean;
};

export type HomePage = {
  hero: {
    title: string;
    titleEmphasis: string | null;
    subtitle: string;
    image: StrapiImage | null;
    quickLinks: QuickLink[];
  };
  introduction: {
    eyebrow: string;
    heading: string;
    headingEmphasis: string | null;
    body: string;
  };
  showcase: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    tileCtaLabel: string;
    tiles: {
      title: string;
      column: number;
      tall: boolean;
      image: StrapiImage | null;
    }[];
  };
  moviesSection: SectionHeading;
  newsSection: SectionHeading;
  testimonial: {
    heading: string;
    headingEmphasis: string | null;
    subheading: string;
    quote: string;
    name: string;
    role: string;
    ctaLabel: string;
    portrait: StrapiImage | null;
  };
  founderMessage: {
    heading: string;
    headingEmphasis: string | null;
    body: string;
    name: string;
    title: string;
    readStatementLabel: string;
    linkedinLabel: string;
    linkedinHref: string;
    image: StrapiImage | null;
  };
  seo: Seo | null;
};

export const getHomePage = () =>
  get<HomePage>(
    "home-page",
    "populate[hero][populate][image]=true&populate[hero][populate][quickLinks]=true" +
      "&populate[introduction]=true" +
      "&populate[showcase][populate][tiles][populate][image]=true" +
      "&populate[moviesSection]=true" +
      "&populate[testimonial][populate][portrait]=true" +
      "&populate[founderMessage][populate][image]=true" +
      "&populate[newsSection]=true" +
      "&populate[seo][populate][ogImage]=true",
  );

export type Movie = {
  title: string;
  slug: string;
  year: string | null;
  href: string | null;
  poster: StrapiImage | null;
};

export const getMovies = () =>
  get<Movie[]>("movies", "populate[poster]=true&sort=order:asc");

export type NewsArticle = {
  title: string;
  slug: string;
  date: string;
  displayDate: string;
  href: string | null;
  image: StrapiImage | null;
};

export const getNews = (limit = 100) =>
  get<NewsArticle[]>(
    "news-articles",
    `populate[image]=true&sort[0]=order:asc&sort[1]=date:desc&pagination[pageSize]=${limit}`,
  );

/* --------------------------------------------------------------- locations */

export type LocationsPage = {
  eyebrow: string;
  heading: string;
  headingEmphasis: string | null;
  lead: string;
  leadEmphasis: string | null;
  listHeading: string;
  filtersLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  cityLabel: string;
  refineLabel: string;
  emptyMessage: string;
  perPage: number;
  freeCount: number;
  backLabel: string;
  productionBlurb: string;
  contactLine: string;
  body: { text: string }[];
  gate: {
    title: string;
    body: string;
    cta: string;
    prompt: string;
    placeholder: string;
    sent: string;
    verified: string;
  };
  mapImage: StrapiImage | null;
  seo: Seo | null;
};

/** Headings, labels, the access gate, the standing production blurb. */
export const getLocationsPage = () =>
  get<LocationsPage>(
    "locations-page",
    "populate[body]=true&populate[gate]=true&populate[mapImage]=true" +
      "&populate[seo][populate][ogImage]=true",
  );

/**
 * A city record exists as soon as a location names it, so everything except the
 * name is optional: `Akre` is seeded with no count and no coordinates because
 * only a location's `citySuffix` mentions it. The map skips a city until its
 * pin has been placed.
 */
export type City = {
  name: string;
  slug: string;
  blurb: string | null;
  locationCount: number | null;
  primary: boolean;
  /** Percentages of the 900×800 full-page map artboard. */
  pinX: number | null;
  pinY: number | null;
  /** Percentages of the 611×543 hero map export — a different artboard. */
  heroPinX: number | null;
  heroPinY: number | null;
};

/** Map pins and the filter chips beside the "Locations" heading. */
export const getCities = () =>
  get<City[]>("cities", "sort=order:asc&pagination[pageSize]=200");

export type Taxonomy = { name: string; slug: string };

export const getLocationCategories = () =>
  get<Taxonomy[]>(
    "location-categories",
    "sort=order:asc&pagination[pageSize]=200",
  );

/**
 * A row in the database list. Every entry carries the card's fields; the ones
 * an editor has written a full page for (`hasDetailPage`) also carry a gallery,
 * a map pin and a Maps link. `area` / `lastActiveDate` are only known for some
 * entries and the card drops the field rather than inventing a figure.
 */
export type LocationEntry = {
  title: string;
  slug: string;
  summary: string;
  citySuffix: string;
  area: string | null;
  lastActiveDate: string | null;
  /** Overrides the city record's shared blurb for this one entry. */
  cityBlurb: string | null;
  /** Percentages of the 611×543 hero-map artboard; only set on detail pages. */
  pinX: number | null;
  pinY: number | null;
  mapsUrl: string | null;
  hasDetailPage: boolean;
  cardImage: StrapiImage | null;
  gallery?: StrapiImage[] | null;
  city: City | null;
  category: Taxonomy | null;
};

/** Every card in the database list. */
export const getLocations = (limit = 200) =>
  get<LocationEntry[]>(
    "locations",
    "populate[cardImage]=true&populate[city]=true&populate[category]=true" +
      `&sort=order:asc&pagination[pageSize]=${limit}`,
  );

/** One location's detail page. Returns null when the slug is unknown. */
export async function getLocation(slug: string) {
  const [entry] = await get<LocationEntry[]>(
    "locations",
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
      "&populate[gallery]=true&populate[cardImage]=true" +
      "&populate[city]=true&populate[category]=true",
  );
  return entry ?? null;
}

/** Slugs for `generateStaticParams` — only the entries that have a page. */
export const getLocationSlugs = () =>
  get<{ slug: string }[]>(
    "locations",
    "filters[hasDetailPage][$eq]=true&fields[0]=slug&pagination[pageSize]=200",
  );

/* ---------------------------------------------------------------- services */

export type ServicesPage = {
  hero: {
    title: string;
    lead: string;
    aside: string;
    image: StrapiImage | null;
  };
  comingSoon: {
    eyebrow: string;
    title: string;
    body: string;
    image: StrapiImage | null;
  };
  backgroundWash: StrapiImage | null;
  seo: Seo | null;
};

export const getServicesPage = () =>
  get<ServicesPage>(
    "services-page",
    "populate[hero][populate][image]=true" +
      "&populate[comingSoon][populate][image]=true" +
      "&populate[backgroundWash]=true&populate[seo][populate][ogImage]=true",
  );

export type ServiceCategoryEntry = {
  heading: string;
  slug: string;
  intro: string;
  /** Facilities runs its intro across the full column; Logistics beside the photo. */
  introPlacement: "above" | "beside";
  imageSide: "left" | "right";
  imageWidth: number;
  imageHeight: number;
  /** The row the Figma shows expanded when the page loads. */
  defaultOpen: number;
  image: StrapiImage | null;
  items: { title: string; body: string }[];
};

export const getServiceCategories = () =>
  get<ServiceCategoryEntry[]>(
    "service-categories",
    "populate[image]=true&populate[items]=true&sort=order:asc",
  );

/* ---------------------------------------------------------- industry guide */

export type IndustryGuidePage = {
  title: string;
  titleEmphasis: string | null;
  intro: string;
  countLine: string;
  perPage: number;
  filtersLabel: string;
  searchPlaceholder: string;
  backLabel: string;
  contactLine: string;
  emptyMessage: string;
  heroImage: StrapiImage | null;
  quickFilters: { label: string; value: string }[];
  seo: Seo | null;
};

export const getIndustryGuidePage = () =>
  get<IndustryGuidePage>(
    "industry-guide-page",
    "populate[heroImage]=true&populate[quickFilters]=true" +
      "&populate[seo][populate][ogImage]=true",
  );

export type Agency = {
  /** Card title — the Figma's "Agency Name" placeholder on every seeded row. */
  name: string;
  /** Trading name, shown as the detail page's title. */
  displayName: string;
  slug: string;
  city: string;
  website: string;
  /** The Figma labels the third card row "Type" on some cards, "Category" on
   *  others, so the label travels with the listing. */
  fieldLabel: string;
  blurb: string;
  email: string;
  phone: string;
  /** Newline-separated; the contact table renders one line per entry. */
  address: string;
  image: StrapiImage | null;
  logo: StrapiImage | null;
  mark: StrapiImage | null;
  category: Taxonomy | null;
};

export const getAgencies = (limit = 200) =>
  get<Agency[]>(
    "agencies",
    "populate[image]=true&populate[logo]=true&populate[category]=true" +
      `&sort=order:asc&pagination[pageSize]=${limit}`,
  );

export async function getAgency(slug: string) {
  const [entry] = await get<Agency[]>(
    "agencies",
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
      "&populate[image]=true&populate[logo]=true&populate[mark]=true" +
      "&populate[category]=true",
  );
  return entry ?? null;
}

export const getAgencySlugs = () =>
  get<{ slug: string }[]>(
    "agencies",
    "fields[0]=slug&pagination[pageSize]=200",
  );

/* ----------------------------------------------------------------- contact */

export type ContactPage = {
  heading: string;
  intro: string;
  image: StrapiImage | null;
  form: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    successMessage: string;
  };
  details: {
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    addressLabel: string;
    address: string;
  };
  seo: Seo | null;
};

export const getContactPage = () =>
  get<ContactPage>(
    "contact-page",
    "populate[image]=true&populate[form]=true&populate[details]=true" +
      "&populate[seo][populate][ogImage]=true",
  );
