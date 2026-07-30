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
  { index: "06", label: "Kurdistan Film Fund", href: "/film-fund" },
] as const;

export const secondaryNav = [
  { label: "Industry Guide", href: "/industry-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** Quick links pinned to the bottom band of the hero (Figma 551:2728).
 *  `featured` shows the drawn accent underline permanently; the rest draw it
 *  on hover. Order matches the Figma left→right. */
export const quickLinks = [
  {
    label: "Apply for the",
    title: "Kurdistan Film Fund",
    href: "/film-fund",
    featured: true,
  },
  {
    label: "View",
    title: "Location Database",
    href: "/locations",
    featured: false,
  },
  {
    label: "Find movies",
    title: "Made in Kurdistan",
    href: "/movies",
    featured: false,
  },
  {
    label: "Read our",
    title: "Industry Guide",
    href: "/industry-guide",
    featured: false,
  },
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
      {
        src: "/images/loc-bazyan-1.jpg",
        alt: "Stone archway standing in the Bazyan ruins",
      },
      {
        src: "/images/loc-bazyan-2.jpg",
        alt: "Arched wall of the Bazyan site against the hillside",
      },
      {
        src: "/images/loc-bazyan-3.jpg",
        alt: "Excavated stone chambers at Bazyan",
      },
      {
        src: "/images/loc-bazyan-4.jpg",
        alt: "Vaulted interior passage of the Bazyan remains",
      },
      {
        src: "/images/loc-bazyan-5.jpg",
        alt: "Foundations of the Bazyan settlement seen from above",
      },
      {
        src: "/images/loc-bazyan-6.jpg",
        alt: "Bazyan ruins with the mountain range behind",
      },
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

/**
 * Homepage location mosaic (Figma "Location DB Variant 3", 317:640): four
 * columns of two tiles each, alternating short/tall so the rows stagger.
 * Ordered column-by-column, top-to-bottom — exactly the Figma placement.
 * Only the Bazyan tile carries the grayscale treatment + overlay CTA.
 */
export type ShowcaseTile = {
  src: string;
  alt: string;
  /** Shown in the overlay while this tile is the highlighted one. */
  title: string;
  /** Flex-grow weights straight from the Figma tile heights (234px / 320px). */
  tall: boolean;
};

/** Label on the overlay pill — one CTA, it follows the highlighted tile. */
export const showcaseCta = "Get access to all database";

export const locationShowcase: ShowcaseTile[][] = [
  [
    {
      src: "/images/loc-home-1.jpg",
      alt: "Bazyan archaeological remains",
      title: "Bazyan Remains",
      tall: false,
    },
    {
      src: "/images/loc-home-5.jpg",
      alt: "Village houses beneath snow-capped mountains",
      title: "Halgurd Peaks",
      tall: true,
    },
  ],
  [
    {
      src: "/images/loc-home-2.jpg",
      alt: "Brick university building in Kurdistan",
      title: "Sulaimani University",
      tall: true,
    },
    {
      src: "/images/loc-home-6.jpg",
      alt: "Lake at sunset among the hills",
      title: "Dukan Lake",
      tall: false,
    },
  ],
  [
    {
      src: "/images/loc-home-3.jpg",
      alt: "Narrow limestone canyon",
      title: "Gali Ali Beg",
      tall: false,
    },
    {
      src: "/images/loc-home-7.jpg",
      alt: "Snowy house glowing at night",
      title: "Winter Village",
      tall: true,
    },
  ],
  [
    {
      src: "/images/loc-home-4.jpg",
      alt: "City overlook across the plains",
      title: "Erbil Overlook",
      tall: true,
    },
    {
      src: "/images/loc-home-8.jpg",
      alt: "Green valley meeting the water",
      title: "Rawanduz Valley",
      tall: false,
    },
  ],
];

/* ---------------------------------------------------------------------------
   /services — Figma "Services Page - V1" (364:439)
   ------------------------------------------------------------------------- */

/** Hero band of the services page (Figma 537:1955 + 537:1952). */
export const servicesHero = {
  title: "Services",
  lead: "KFO Slemani is the ultimate destination for all your production requirements. We provide a variety of services for both national and international productions.",
  aside:
    "If you have any specific requirements for your project or would like to visit Kurdistan, feel free to contact us. We can create a custom plan for you that suits your needs.",
} as const;

export type ServiceItem = { title: string; body: string };

export type ServiceCategorySlug = "facilities" | "logistics";

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  heading: string;
  intro: string;
  /**
   * Figma runs the Facilities intro across the full content column above both
   * columns ("above"); Logistics keeps it in the text column beside the photo.
   */
  introPlacement: "above" | "beside";
  imageSide: "left" | "right";
  image: { src: string; alt: string; width: number; height: number };
  /** The row the Figma shows expanded when the page loads. */
  defaultOpen: number;
  items: ServiceItem[];
};

/**
 * The two service categories and their disclosure rows.
 *
 * COPY NOTE: the Figma only authors a paragraph for the one row it shows open
 * in each column — "Linguistic Coach" (539:1975) and "Production management"
 * (539:2045), and the latter is a copy-paste of the former in the source file.
 * Every other body below is placeholder copy written from the commission's own
 * material (the About page's mission/vision text and its AFCI listing) so the
 * accordion is complete; swap them for client copy when it lands.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "facilities",
    heading: "Facilities",
    introPlacement: "above",
    imageSide: "right",
    intro:
      "We facilitate international and national productions as we collaborate closely with official entities, such as ministries, governmental institutions, and private security companies, to ensure seamless logistics services, acquire film permits and necessary administrative authorisations, obtain security clearance, and ensure the safety of the international and national crew during production.",
    image: {
      src: "/images/services-facilities.jpg",
      alt: "Two speakers in conversation at a Kurdistan Film Commission panel",
      width: 635,
      height: 415,
    },
    defaultOpen: 3,
    items: [
      {
        title: "Consultation",
        body: "From your first questions to the final wrap, we advise on everything a production needs on the ground — cultural consultation, costume and design references, and guidance through every logistical stage of the shoot.",
      },
      {
        title: "Education and Training",
        body: "Our top priority is to involve the local film community. We have partnered with film schools, organisations, and institutions in Sulaymaniyah and abroad to organise intensive educational courses, workshops, and more.",
      },
      {
        title: "Cast & Talent",
        body: "We assist with casting and recruiting local cast, extras, and background talent, drawing on a network that reaches both professional performers and the communities you are filming in.",
      },
      {
        // Verbatim from the Figma (539:1975) — the row the design shows open.
        title: "Linguistic Coach",
        body: "We have in-house language experts available if you need assistance with casting and extras, especially if your project involves various ethnicities, religions, and dialects.",
      },
      {
        title: "Financial Guidance",
        body: "We walk you through what a shoot in the region costs, the support available to you, and how to apply to the Kurdistan Film Fund.",
      },
      {
        title: "Film Culture",
        body: "Kurdistan's festivals, archives, and film community are part of what you are filming in. We connect visiting productions to the people and the history behind the locations.",
      },
      {
        title: "Local Partners",
        body: "We introduce you to vetted local production companies, service providers, and suppliers, so your project is carried by people who already know the ground.",
      },
    ],
  },
  {
    slug: "logistics",
    heading: "Logistics",
    introPlacement: "beside",
    imageSide: "left",
    intro:
      "We facilitate international and national productions as we collaborate closely with official entities, such as ministries, governmental institutions, and private security companies.",
    image: {
      src: "/images/services-logistics.jpg",
      alt: "Cloud breaking over a sunlit mountain ridge in Kurdistan",
      width: 612,
      height: 636,
    },
    defaultOpen: 3,
    items: [
      {
        title: "Permits & Regulations",
        body: "We work directly with ministries and governmental institutions to acquire film permits, the necessary administrative authorisations, and security clearance for your production.",
      },
      {
        title: "Rules and Regulations",
        body: "We brief you on what filming in the Kurdistan Region asks of you — from customs clearance for technical equipment to the rules that apply on each individual location.",
      },
      {
        title: "Locations",
        body: "We offer the largest location database in the Kurdistan Region, and we scout, arrange access, and clear the permissions for every site you shoot.",
      },
      {
        // The Figma repeats the Linguistic Coach paragraph here (539:2045) —
        // a copy-paste in the source file rather than authored copy.
        title: "Production management",
        body: "We coordinate the running of your shoot on the ground: scheduling, crew calls, equipment and suppliers, and the paperwork that keeps each shooting day moving.",
      },
      {
        title: "Safety",
        body: "The region is known for its safety and security. We coordinate with local authorities and private security companies to keep international and national crew safe throughout production.",
      },
      {
        title: "Hospitality",
        body: "We arrange accommodation and catering for your team between shooting days, from hotels in Slemani to basecamps at remote locations.",
      },
      {
        title: "Transportation",
        body: "We organise transport for crew, cast, and equipment — airport pickups, unit moves, and access to locations well off the main roads.",
      },
      {
        title: "Local Crew",
        body: "We help you hire experienced local crew across every department, and connect you to the professionals listed in our Industry Guide.",
      },
    ],
  },
];

/** The "Coming soon" production card at the foot of /services (Figma 539:2130). */
export const servicesComingSoon = {
  eyebrow: "Coming soon",
  title: "Production",
  body: "We are actively working on developing our production section.",
  image: {
    src: "/images/services-production.jpg",
    alt: "",
  },
} as const;

/** Movies shot in Kurdistan (Figma "Movies Variant 3" carousel). Every poster
 *  renders in full colour; the active one is taller and carries its caption.
 *  `href` is the external page opened (new tab) when a poster is clicked;
 *  leave it unset to fall back to an IMDb title search. */
export type Movie = {
  src: string;
  title: string;
  /** Caption under the active poster — “Bekas (2017)” per the Figma. */
  caption: string;
  href?: string;
};

export const movies: Movie[] = [
  {
    src: "/images/poster-1.jpg",
    title: "Før Snøen Faller",
    caption: "Før Snøen Faller",
  },
  { src: "/images/poster-2.jpg", title: "Bekas", caption: "Bekas (2017)" },
  {
    src: "/images/poster-3.jpg",
    title: "L'Hirondelle",
    caption: "L'Hirondelle",
  },
  {
    src: "/images/poster-4.jpg",
    title: "Das Milan Protokoll",
    caption: "Das Milan Protokoll",
  },
  { src: "/images/poster-5.jpg", title: "A Noiva", caption: "A Noiva" },
  { src: "/images/poster-6.jpg", title: "09", caption: "09" },
  {
    src: "/images/poster-7.jpg",
    title: "Der Junge Siyar",
    caption: "Der Junge Siyar",
  },
  {
    src: "/images/poster-8.jpg",
    title: "Baghdad Messi",
    caption: "Baghdad Messi",
  },
];

/** News from experts pool — shown three at a time; the arrows page through it.
 *  Same image for every item for now. */
export const news = [
  {
    date: "3, Nov 2025",
    title:
      "LMGI Representatives Complete Location Familiarisation Tour in Kurdistan",
    href: "/news/lmgi-location-tour",
    image: "/images/news-home.jpg",
  },
  {
    date: "3, Nov 2025",
    title:
      "Three Day Film Workshop with Klaudia Śmieja Rostworowska in Slemani",
    href: "/news/film-workshop-slemani",
    image: "/images/loc-2.jpg",
  },
  {
    date: "3, Nov 2025",
    title:
      "Kurdsat broadcasting Corporation and the Kurdistan Film commission sign a MoU",
    href: "/news/kurdsat-mou",
    image: "/images/loc-3.jpg",
  },
  {
    date: "28, Oct 2025",
    title: "Kurdistan Film Commission Launches the 2026 Regional Film Fund",
    href: "/news/2026-film-fund",
    image: "/images/loc-4.jpg",
  },
  {
    date: "21, Oct 2025",
    title:
      "International Producers Scout the Erbil Citadel for an Upcoming Feature",
    href: "/news/erbil-citadel-scout",
    image: "/images/loc-5.jpg",
  },
  {
    date: "14, Oct 2025",
    title: "New Co-Production Treaty Opens Doors for Kurdish Filmmakers",
    href: "/news/co-production-treaty",
    image: "/images/loc-6.jpg",
  },
  {
    date: "6, Oct 2025",
    title: "Duhok International Film Festival Announces its 2026 Programme",
    href: "/news/duhok-festival-2026",
    image: "/images/loc-7.jpg",
  },
  {
    date: "29, Sep 2025",
    title: "Location Database Expands with 200 New Verified Filming Sites",
    href: "/news/database-expansion",
    image: "/images/loc-8.jpg",
  },
  {
    date: "22, Sep 2025",
    title: "Masterclass Series Brings Cannes Mentors to Slemani",
    href: "/news/cannes-masterclass",
    image: "/images/loc-bazyan.jpg",
  },
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
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin" as const,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram" as const,
  },
];
