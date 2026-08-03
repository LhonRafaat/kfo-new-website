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
    // There is no movies page — the reel lives further down this same page.
    label: "Find movies",
    title: "Made in Kurdistan",
    href: "#movies-made-in-kurdistan",
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
 * `gallery` is ordered as the Figma lays it out (338:1043): [0] is the hero
 * tile beside the summary, [1] the full-width band under it, and [2…] feed the
 * three-up slider below the body copy.
 */
export type LocationEntry = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  city: string;
  cityBlurb: string;
  /** Pin position as a percentage of the Kurdistan silhouette's artboard. */
  pin: { x: number; y: number };
  mapsUrl: string;
  gallery: { src: string; alt: string }[];
};

/** Standing paragraph under the gallery on every location page (338:1043). */
export const locationProductionBlurb =
  "We facilitate international and national productions as we collaborate closely with official entities, such as ministries, governmental institutions, and private security companies, to ensure seamless logistics services, acquire film permits and necessary administrative authorisations, obtain security clearance, and ensure the safety of the international and national crew during production.";

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
    pin: { x: 64.9, y: 23.9 },
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
 * node 522:314) — each one renders as a full-width photo card with its details
 * laid over the image. `citySuffix` is reproduced verbatim from the Figma copy
 * — some rows read "As Sulaymaniyah", others just the city name, kept as
 * authored rather than normalised, since it's the dev-mode source text.
 * `area`/`lastActiveDate` are only known for the first five entries; the card
 * drops the field rather than inventing a figure.
 */
export type LocationDbRow = {
  title: string;
  citySuffix: string;
  type: string;
  area?: string;
  lastActiveDate?: string;
  image: string;
  imageAlt: string;
  /** Links through to a full /locations/[slug] page when one exists. */
  slug?: string;
};

/** Rows shown per page of the database list, matching the Figma's five cards. */
export const locationsPerPage = 5;

export const locationDbRows: LocationDbRow[] = [
  {
    title: "Archaeological remains in Bazyan",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-bazyan.jpg",
    imageAlt: "Stone archway standing in the Bazyan ruins",
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
  },
  {
    title: "Tuni Baba",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-tuni-baba.jpg",
    imageAlt: "Steep canyon walls at Tuni Baba with a shallow stream below",
  },
  {
    title: "A home in Kifri",
    citySuffix: "Kifri",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-home-in-kifri.jpg",
    imageAlt: "Courtyard home shaded by palm trees in Kifri",
  },
  {
    title: "Abandoned Prison",
    citySuffix: "Kifri",
    type: "Archeological Site",
    area: "400 m²",
    lastActiveDate: "1922",
    image: "/images/loc-db-abandoned-prison.jpg",
    imageAlt: "Rows of wire fencing in the abandoned Kifri prison yard",
  },
  {
    title: "Abandoned tobacco factory",
    citySuffix: "As Sulaymaniyah",
    type: "Archeological Site",
    image: "/images/loc-db-tobacco-factory.jpg",
    imageAlt: "Steel roof trusses inside the abandoned tobacco factory",
  },
  {
    title: "Ahmed Awa waterfall",
    citySuffix: "Halabja",
    type: "Archeological Site",
    image: "/images/loc-db-ahmed-awa-waterfall.jpg",
    imageAlt: "Ahmed Awa waterfall flowing between mossy boulders",
  },
  {
    title: "Akre’s castle",
    citySuffix: "Akre",
    type: "Archeological Site",
    image: "/images/loc-db-akre-castle.jpg",
    imageAlt: "Terraced hillside buildings beneath Akre's old citadel",
  },
  {
    title: "Alqosh",
    citySuffix: "Erbil",
    type: "Archeological Site",
    image: "/images/loc-db-alqosh.jpg",
    imageAlt: "Stone terraces climbing the hillside near Alqosh",
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

/* ---------------------------------------------------------------------------
   /industry-guide — Figma "Industry Guide Page - V1" (425:96)
   ------------------------------------------------------------------------- */

/** Hero band (Figma 507:789 + 507:793) — centred over a darkened grayscale sky.
 *  `titleItalic` is the run the Figma sets in Flecha Italic Regular. */
export const industryGuideHero = {
  title: "Kurdistan Film Commission’s ",
  titleItalic: "Industry Guide",
  intro:
    "The KFO Slemani Industry Guide is the first for filmmaking in the region. It showcases Slemani's offerings. You can find specific services or companies for your project. To include your company, contact us.",
  image: {
    src: "/images/industry-hero.jpg",
    alt: "Cloud banking against snow-covered peaks above Slemani",
  },
} as const;

/** Headline on the directory's filter bar (Figma 505:117). */
export const industryGuideCount = "1966 professionals waiting.";

/** Quick-filter chips beside the headline (Figma 505:118). Verbatim from the
 *  frame, including its mixed casing — the bar renders them uppercase. */
export const industryQuickFilters = [
  "Sales",
  "post-production",
  "rental",
] as const;

/** Directory entries shown per page, matching the Figma's nine cards. */
export const industryPerPage = 9;

export type IndustryAgency = {
  /** URL segment of this listing's detail page, /industry-guide/[slug]. */
  slug: string;
  name: string;
  location: string;
  website: string;
  /** Third row of the card. The Figma labels it "Type" on some cards and
   *  "Category" on others, so the label travels with the entry. */
  field: { label: string; value: string };
  image: string;
  imageAlt: string;
  logo: string;
};

/**
 * Detail-page copy for a listing (Figma "Agency Opened", 507:906).
 *
 * COPY NOTE — the Figma authors exactly one detail page, for Ballu Agency, and
 * every listing opens onto it verbatim: same name, mark, blurb, category,
 * domain and contact details. That is deliberate, not an oversight to fill in —
 * the directory's nine cards are placeholders too. Swap this for per-listing
 * records when the real dataset lands.
 */
export const industryAgencyProfile = {
  /** Trading name, shown as the detail page's title. The directory cards keep
   *  the Figma's "Agency Name" placeholder; this is the real one. */
  displayName: "Ballu Agency",
  /** Logo mark centred in the black card at the top of the detail page. */
  mark: "/images/industry-agency-mark-ballu.png",
  category: "Post Production",
  website: "baluagency.com",
  blurb:
    "BALLU Company is a service-based company for media production and advertising that is based in Iraq. BALLU works locally and internationally with high-quality and inclusive services including data insight, research, and production.",
  email: "info@baluagency.com",
  phone: "+964 771 585 5535",
  /** One entry per rendered line, right-aligned like the Figma. */
  address: [
    "Hera business center, Floor 3, Office F2",
    "24 46001 Sulaymaniyah Iraq",
  ],
} as const;

/** Closing line under the contact table (Figma 507:956). */
export const industryAgencyContactLine =
  "For logistics, Public Relations, and Information please contact us.";

/**
 * COPY NOTE — the Figma authors this directory entirely with placeholder data:
 * every card is titled "Agency Name", every location is Sulaymaniyah, and the
 * websites alternate between two stock brands. It is reproduced verbatim here
 * (including the duplicated team photos and the Type/Category label switch)
 * rather than invented around, so the real 1966-strong dataset can drop
 * straight in. The circular avatar uses the stock mark the Figma paints on
 * every card; a real entry would carry its own logo.
 */
export const industryAgencies: IndustryAgency[] = [
  {
    slug: "agency-1",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "admedia.agency",
    field: { label: "Type", value: "Pre" },
    image: "/images/industry-agency-1.jpg",
    imageAlt: "Agency team photographed together in a bright studio",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-2",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "baluagency.com",
    field: { label: "Category", value: "Post Production" },
    image: "/images/industry-agency-2.jpg",
    imageAlt: "Agency crew leaning into frame for a group portrait",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-3",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "admedia.agency",
    field: { label: "Type", value: "Pre" },
    image: "/images/industry-agency-3.jpg",
    imageAlt: "Agency team in black tailoring against a dark backdrop",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-4",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "baluagency.com",
    field: { label: "Category", value: "Post Production" },
    image: "/images/industry-agency-4.jpg",
    imageAlt: "Black-and-white group portrait of an agency's crew",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-5",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "admedia.agency",
    field: { label: "Type", value: "Pre" },
    image: "/images/industry-agency-5.jpg",
    imageAlt: "Agency team standing shoulder to shoulder in suiting",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-6",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "baluagency.com",
    field: { label: "Category", value: "Post Production" },
    image: "/images/industry-agency-6.jpg",
    imageAlt: "Editorial group portrait of an agency's production team",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-7",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "admedia.agency",
    field: { label: "Type", value: "Pre" },
    image: "/images/industry-agency-3.jpg",
    imageAlt: "Agency team in black tailoring against a dark backdrop",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-8",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "admedia.agency",
    field: { label: "Type", value: "Pre" },
    image: "/images/industry-agency-1.jpg",
    imageAlt: "Agency team photographed together in a bright studio",
    logo: "/images/industry-agency-logo.png",
  },
  {
    slug: "agency-9",
    name: "Agency Name",
    location: "Sulaymaniyah",
    website: "baluagency.com",
    field: { label: "Category", value: "Post Production" },
    image: "/images/industry-agency-2.jpg",
    imageAlt: "Agency crew leaning into frame for a group portrait",
    logo: "/images/industry-agency-logo.png",
  },
];

/* ---------------------------------------------------------------------------
   /contact — Figma "Contact Us" (508:1077)
   ------------------------------------------------------------------------- */

export const contactPage = {
  heading: "Let's work together!",
  intro:
    "We are currently developing each of our departments. Meanwhile, please send us a letter if interested.",
  image: {
    src: "/images/contact-valley.jpg",
    alt: "Snow-capped ridge above a wooded river valley in the Kurdistan Region",
  },
  form: {
    name: "Name",
    email: "E-mail",
    message: "Tell us what you can help with",
    submit: "Submit Message",
  },
  /** Commission's own details, verbatim from the frame's table (541:2415). */
  email: "info@kfo.krd",
  phone: "+964 772 139 2923",
  address:
    "Hera Business Center Midya Street, Floor 3, Office 30-31 As Sulaymaniyah, 46001 Iraq",
} as const;

/** Movies shot in Kurdistan (Figma 636:63 carousel). Every poster renders in
 *  full colour at the same size, with its title and release year underneath.
 *  `href` is the external page opened (new tab) when a poster is clicked;
 *  leave it unset to fall back to an IMDb title search. */
export type Movie = {
  src: string;
  title: string;
  /** Release year, shown under the title. TODO: the four the Figma names carry
   *  its years verbatim; the rest are awaiting confirmed dates from the client
   *  and render without a year line until then. */
  year?: string;
  href?: string;
};

export const movies: Movie[] = [
  { src: "/images/poster-1.jpg", title: "Før Snøen Faller" },
  { src: "/images/poster-2.jpg", title: "Bekas", year: "2020" },
  {
    src: "/images/poster-3.jpg",
    title: "L’Hirondelle Die Schwalbe",
    year: "2020",
  },
  {
    src: "/images/poster-4.jpg",
    title: "Das Milan Protokoll",
    year: "2011",
  },
  { src: "/images/poster-5.jpg", title: "A Noiva" },
  { src: "/images/poster-6.jpg", title: "09" },
  { src: "/images/poster-7.jpg", title: "Der Junge Siyar" },
  { src: "/images/poster-8.jpg", title: "Baghdad Messi", year: "2011" },
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
