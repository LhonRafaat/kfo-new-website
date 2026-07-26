export const site = {
  name: "Kurdistan Film Commission",
  wordmark: "KURDISTAN FILM COMMISSION",
  tagline: "The official film commission in Kurdistan & Iraq.",
  description:
    "Discover Kurdistan through the art of filmmaking! We're here to assist you when you consider filming in Kurdistan.",
} as const;

/** Primary navigation shown in the full-screen menu overlay. */
export const primaryNav = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "About", href: "/about" },
  { index: "03", label: "Services", href: "/services" },
  { index: "04", label: "Locations", href: "/locations" },
  { index: "05", label: "Production", href: "/production" },
  { index: "06", label: "Film Fund", href: "/film-fund" },
] as const;

export const secondaryNav = [
  { label: "Industry Guide", href: "/industry-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** Quick links directly beneath the hero. */
export const quickLinks = [
  { label: "View", title: "Location Database", href: "/locations", featured: false },
  { label: "Apply for the", title: "Film Fund", href: "/film-fund", featured: true },
  { label: "Find movies", title: "Made in Kurdistan", href: "/movies", featured: false },
  { label: "Read our", title: "Industry Guide", href: "/industry-guide", featured: false },
] as const;

/**
 * Pins on the Kurdistan map of the location database.
 * `x`/`y` are percentages of the 900×800 map artboard, taken from the Figma
 * frame so each dot lands on its city.
 */
export type LocationPin = {
  city: string;
  count: number;
  x: number;
  y: number;
  /** Shown as one of the three chips beside the "Locations" heading. */
  primary: boolean;
};

export const locationPins: LocationPin[] = [
  { city: "Sulaymaniyah", count: 10, x: 69.67, y: 34.13, primary: true },
  { city: "Duhok", count: 22, x: 32.33, y: 7.5, primary: true },
  { city: "Erbil", count: 42, x: 48.11, y: 16.25, primary: true },
  { city: "Kifri", count: 2, x: 62.78, y: 22.38, primary: false },
  { city: "Halabjah", count: 4, x: 80.33, y: 48.25, primary: false },
];

/**
 * A single entry in the location database, rendered at /locations/[slug].
 * `gallery` is ordered as the Figma lays it out: [0] is the wide hero tile,
 * [1] sits beside it, and [2..5] form the bleeding strip underneath.
 */
export type LocationEntry = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  city: string;
  cityBlurb: string;
  /** Pin position as a percentage of the 644×572 region-map artboard. */
  pin: { x: number; y: number };
  mapsUrl: string;
  gallery: { src: string; alt: string }[];
};

export const locations: LocationEntry[] = [
  {
    slug: "bazyan",
    category: "Archeological Sites",
    title: "Archaeological remains in Bazyan",
    summary:
      "The archaeological remains of Bazyan, an ancient Christian heritage, are estimated to date back to the 6th century.",
    city: "As Sulaymaniyah",
    cityBlurb:
      "Sulaymaniyah, a vibrant city in the Kurdistan Region of Iraq, is known for its rich cultural heritage and stunning landscapes.",
    pin: { x: 64.9, y: 25.2 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bazyan+Kurdistan",
    gallery: [
      { src: "/images/loc-bazyan-1.jpg", alt: "Stone archway standing in the Bazyan ruins" },
      { src: "/images/loc-bazyan-2.jpg", alt: "Arched wall of the Bazyan site against the hillside" },
      { src: "/images/loc-bazyan-3.jpg", alt: "Excavated stone chambers at Bazyan" },
      { src: "/images/loc-bazyan-4.jpg", alt: "Vaulted interior passage of the Bazyan remains" },
      { src: "/images/loc-bazyan-5.jpg", alt: "Foundations of the Bazyan settlement seen from above" },
      { src: "/images/loc-bazyan-6.jpg", alt: "Bazyan ruins with the mountain range behind" },
    ],
  },
];

/**
 * A row in the location database list at /locations (Figma "Location DB - V2",
 * node 338:191). `variant` picks the card layout: "expanded" shows all four
 * fields plus the region-silhouette watermark behind the text column;
 * "compact" is the shorter three-column row used for the last few entries.
 * `citySuffix` is reproduced verbatim from the Figma copy — some rows read
 * "As Sulaymaniyah", others just the city name, kept as authored rather than
 * normalised, since it's the dev-mode source text.
 */
export type LocationDbRow = {
  title: string;
  citySuffix: string;
  type: string;
  area?: string;
  lastActiveDate?: string;
  image: string;
  imageAlt: string;
  variant: "expanded" | "compact";
  /** Which of the two decorative region-silhouette watermarks (if any) sits behind the text. */
  watermark?: 1 | 2;
  /** Links through to a full /locations/[slug] page when one exists. */
  slug?: string;
};

export const locationDbRows: LocationDbRow[] = [
  {
    title: "Archaeological remains in Bazyan",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-bazyan.jpg",
    imageAlt: "Stone archway standing in the Bazyan ruins",
    variant: "expanded",
    watermark: 1,
    slug: "bazyan",
  },
  {
    title: "Red Prison Museum",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-red-prison-museum.jpg",
    imageAlt: "Tank displayed outside the Red Prison Museum's cell block",
    variant: "expanded",
    // Figma uses the variant-2 highlight here (same as Kifri) — verified by
    // the highlight vector's geometry, not the (unreliable) layer name.
    watermark: 2,
  },
  {
    title: "Tuni Baba",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-tuni-baba.jpg",
    imageAlt: "Steep canyon walls at Tuni Baba with a shallow stream below",
    variant: "expanded",
    watermark: 1,
  },
  {
    title: "A home in Kifri",
    citySuffix: "Kifri",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-home-in-kifri.jpg",
    imageAlt: "Courtyard home shaded by palm trees in Kifri",
    variant: "expanded",
    watermark: 2,
  },
  {
    title: "Abandoned Prison",
    citySuffix: "Kifri",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-abandoned-prison.jpg",
    imageAlt: "Rows of wire fencing in the abandoned Kifri prison yard",
    variant: "expanded",
  },
  {
    title: "Abandoned tobacco factory",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    image: "/images/loc-db-tobacco-factory.jpg",
    imageAlt: "Steel roof trusses inside the abandoned tobacco factory",
    variant: "compact",
  },
  {
    title: "Ahmed Awa waterfall",
    citySuffix: "Halabja",
    type: "Archeological Site",
    image: "/images/loc-db-ahmed-awa-waterfall.jpg",
    imageAlt: "Ahmed Awa waterfall flowing between mossy boulders",
    variant: "compact",
  },
  {
    title: "Akre’s castle",
    citySuffix: "Akre",
    type: "Archeological Site",
    image: "/images/loc-db-akre-castle.jpg",
    imageAlt: "Terraced hillside buildings beneath Akre's old citadel",
    variant: "compact",
  },
  {
    title: "Alqosh",
    citySuffix: "Erbil",
    type: "Archeological Site",
    image: "/images/loc-db-alqosh.jpg",
    imageAlt: "Stone terraces climbing the hillside near Alqosh",
    variant: "compact",
  },
];

/** Location database masonry gallery. Column & span drive the layout. */
export type LocationTile = {
  src: string;
  alt: string;
  tall: boolean;
  overlay?: { title: string; subtitle: string };
};

export const locationTiles: LocationTile[] = [
  { src: "/images/loc-bazyan.jpg", alt: "Bazyan archaeological remains", tall: false, overlay: { title: "Bazyan Remains", subtitle: "Description." } },
  { src: "/images/loc-2.jpg", alt: "Brick university building in Kurdistan", tall: true, overlay: { title: "Sulaimani University", subtitle: "Description." } },
  { src: "/images/loc-3.jpg", alt: "Narrow limestone canyon", tall: false, overlay: { title: "Gali Ali Beg", subtitle: "Description." } },
  { src: "/images/loc-4.jpg", alt: "City overlook across the plains", tall: true, overlay: { title: "Erbil Overlook", subtitle: "Description." } },
  { src: "/images/loc-5.jpg", alt: "Snow-capped mountain range", tall: true, overlay: { title: "Halgurd Peaks", subtitle: "Description." } },
  { src: "/images/loc-6.jpg", alt: "Lake at sunset among the hills", tall: false, overlay: { title: "Dukan Lake", subtitle: "Description." } },
  { src: "/images/loc-7.jpg", alt: "Snowy house glowing at night", tall: true, overlay: { title: "Winter Village", subtitle: "Description." } },
  { src: "/images/loc-8.jpg", alt: "Green valley meeting the water", tall: false, overlay: { title: "Rawanduz Valley", subtitle: "Description." } },
];

/** Movies shot in Kurdistan (poster carousel). `featured` sits raised, per Figma.
 *  `href` is the external page opened (new tab) when a poster is clicked; leave
 *  it unset to fall back to an IMDb title search. */
export type Movie = {
  src: string;
  title: string;
  featured: boolean;
  href?: string;
};

export const movies: Movie[] = [
  { src: "/images/poster-1.jpg", title: "Før Snøen Faller", featured: false },
  { src: "/images/poster-2.jpg", title: "Bekas", featured: true },
  { src: "/images/poster-3.jpg", title: "L'Hirondelle", featured: false },
  { src: "/images/poster-4.jpg", title: "Das Milan Protokoll", featured: false },
  { src: "/images/poster-5.jpg", title: "A Noiva", featured: false },
  { src: "/images/poster-6.jpg", title: "09", featured: false },
  { src: "/images/poster-7.jpg", title: "Der Junge Siyar", featured: false },
];

/** News from experts pool — shown three at a time; the arrows page through it.
 *  Same image for every item for now. */
export const news = [
  { date: "3, Nov 2025", title: "LMGI Representatives Complete Location Familiarisation Tour in Kurdistan", href: "/news/lmgi-location-tour", image: "/images/news.jpg" },
  { date: "3, Nov 2025", title: "Three Day Film Workshop with Klaudia Śmieja Rostworowska in Slemani", href: "/news/film-workshop-slemani", image: "/images/loc-2.jpg" },
  { date: "3, Nov 2025", title: "Kurdsat broadcasting Corporation and the Kurdistan Film commission sign a MoU", href: "/news/kurdsat-mou", image: "/images/loc-3.jpg" },
  { date: "28, Oct 2025", title: "Kurdistan Film Commission Launches the 2026 Regional Film Fund", href: "/news/2026-film-fund", image: "/images/loc-4.jpg" },
  { date: "21, Oct 2025", title: "International Producers Scout the Erbil Citadel for an Upcoming Feature", href: "/news/erbil-citadel-scout", image: "/images/loc-5.jpg" },
  { date: "14, Oct 2025", title: "New Co-Production Treaty Opens Doors for Kurdish Filmmakers", href: "/news/co-production-treaty", image: "/images/loc-6.jpg" },
  { date: "6, Oct 2025", title: "Duhok International Film Festival Announces its 2026 Programme", href: "/news/duhok-festival-2026", image: "/images/loc-7.jpg" },
  { date: "29, Sep 2025", title: "Location Database Expands with 200 New Verified Filming Sites", href: "/news/database-expansion", image: "/images/loc-8.jpg" },
  { date: "22, Sep 2025", title: "Masterclass Series Brings Cannes Mentors to Slemani", href: "/news/cannes-masterclass", image: "/images/loc-bazyan.jpg" },
] as const;

/** Footer link columns. */
export const footerColumns = [
  [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Production", href: "/production" },
    { label: "Film Fund", href: "/film-fund" },
    { label: "Locations", href: "/locations" },
  ],
  [
    { label: "FAQ", href: "/faq" },
    { label: "Suggest a location", href: "/suggest-a-location" },
    { label: "Contact", href: "/contact" },
  ],
] as const;

export const socials = [
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
];
