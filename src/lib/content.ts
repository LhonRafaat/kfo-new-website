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

/** Rows readable without registering; everything after is gated (Figma 651:524). */
export const freeLocations = 3;

/**
 * The registration gate over the locked cards (Figma "Frame 204", 651:524) and
 * the three states of the access bar it opens (Figma "Bar Statuses", 651:493).
 *
 * NOTE — there is no backend behind this. Submitting an address does not send
 * anything; the flow advances to "sent", and the verified state is reached by
 * opening the page with `?verified=1` (standing in for the emailed link), which
 * is then remembered in localStorage. Wire the real endpoint into
 * `LocationsList`'s `onSubmit` and drop the query-string shortcut when one
 * exists.
 */
export const locationsGate = {
  title: "You can’t access this item.",
  body: "You will need to register to access this item.",
  cta: "access all database items",
  prompt: "Enter your e-mail to access all database locations.",
  placeholder: "you@example.com",
  sent: "Please check your email for a verification request.",
  verified: "Email verified. You can now check our location database.",
} as const;

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

/**
 * Founder's full message (Figma "Testimonial Section" 537:1923) — the bottom
 * sheet the homepage testimonial's "Read Full Message" opens.
 *
 * COPY NOTE — the frame's heading reads "Biography & title is needed.", which
 * is the designer asking the client for one rather than copy to ship. It is
 * replaced here with the card's own subheading so the sheet reads properly;
 * swap in the real biography title when it lands. The frame also gives the
 * LinkedIn link a label but no URL, so `linkedin` points at a search for the
 * founder rather than inventing a profile address — replace with the real one.
 */
export const founderMessage = {
  heading: "Founder’s ",
  headingItalic: "Statement & Vision",
  /** Verbatim from 537:1933. */
  body: "As a film production consultant, I work on various cultural, film affairs, and production projects. I have been developing a system for the sustainable film industry in Kurdistan-Iraq based on various research, statistics, networking, and lobbying all around the world. Next to this, I'm also a freelancer producer-production consultant to individuals, companies and government officials.",
  name: "Bavi Yassin",
  // The frame types "Commision"; shipped corrected, like the homepage's
  // "Filiming" → "Filming".
  title: "Founder, Kurdistan Film Commission",
  readStatement: "Read Full Statement",
  linkedin: {
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/search/results/people/?keywords=Bavi%20Yassin",
  },
  image: {
    src: "/images/founder-modal.jpg",
    alt: "Bavi Yassin, Founder of the Kurdistan Film Commission",
  },
} as const;

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

/* ---------------------------------------------------------------------------
   /about — Figma "About Page - V1" (338:1246, file nbxKoz4mGA6K2A7z6v1RNY)
   ------------------------------------------------------------------------- */

/** Hero band (Frame 160 + Frame 16): one full-bleed photo under a corner-to-
 *  corner black wash, title + squiggle + lead sitting on its base line. */
export const aboutHero = {
  title: "All about ",
  titleItalic: "Kurdistan Film Commission",
  lead: "Kurdistan Film Commission is the newly established non-profit film commission in the Kurdistan region of Iraq.",
  image: {
    src: "/images/about-hero.jpg",
    alt: "Late sun raking across the green rolling hills of the Kurdistan Region",
  },
} as const;

/** The three paragraphs in the right-hand column under the hero. */
export const aboutIntro = [
  "The northern region of Iraq is well-known for its rich history, beautiful landscapes, charming cities, mountains, and vibrant cultural heritage. It is also known for its safety and security.",
  "KFO acts as a liaison between foreign production companies and every aspect of their production on the ground. As a minority nation in the region, we want to put our great locations and talents on the map by promoting this new upcoming destination.",
  "We are confident that Kurdistan can play a role in the audio-visual sector in the region and the world.",
] as const;

/** Full-bleed photo strip between the intro and the mission (Rectangle 20 —
 *  Figma crops a 12.5% band out of the middle of a tall shot, which is what
 *  `about-band.jpg` is). */
export const aboutBand = {
  src: "/images/about-band.jpg",
  alt: "Snow-dusted peaks above a river running through bare winter trees",
} as const;

export const aboutMission = {
  heading: "Mission",
  body: "We facilitate international and national productions as we collaborate closely with official entities, such as ministries, governmental institutions, and private security companies, to ensure seamless logistics services, acquire film permits and necessary administrative authorisations, obtain security clearance, and ensure the safety of the international and national crew during production.",
} as const;

/** Vision card (Testimonial Section) — the same slate panel + linear-burned
 *  paper scan as the homepage founder card, mirrored: photo left, copy right.
 *  Figma desaturates the photo with a `saturation: -1` image filter, kept as a
 *  CSS filter so a colour photo dropped in later still reads as intended. */
export const aboutVision = {
  heading: "Vision",
  lead: "Our top priority is to involve the local film community.",
  body: [
    "We have partnered with film schools, organisations, and institutions in Sulaymaniyah and abroad to organise intensive educational courses, workshops, and more.",
    "We also recommend local crew and film school students as interns or second-third-range crew positions. We have established strong partnerships with key players in the private sector.",
    "We believe that the growth of a sustainable film industry is not limited to governmental support alone but also through co-production and private-sector involvement.",
    "Our objective is to create opportunities for co-productions with local film companies, private investors, and sponsors by unleashing the limitless possibilities of investing in the film industry and boosting film tourism.",
  ],
  image: {
    src: "/images/about-vision.jpg",
    alt: "A lit tent on a hillside above a valley town at dusk",
  },
} as const;

export type Person = {
  name: string;
  role: string;
  /** Shown over the portrait while the card is hovered or focused. */
  bio: string;
  image: string;
};

export type PeopleSection = {
  heading: string;
  intro: string;
  people: readonly Person[];
  /** Trailing panel that closes the grid (Figma's sixth cell). */
  more: { body: string; cta: string; href: string };
};

/**
 * COPY NOTE — every name, role and biography below is the Figma's own
 * placeholder ("Sara Ahmed", "A person's bio would show up here…"), including
 * the repeated cards, and the portraits are the frame's stock photography.
 * They are laid out exactly as the frame has them so the client can see the
 * real shape of the section; swap the whole array once the real people land.
 *
 * The closing cards link through to the "Team Opened" frame (981:106), built
 * as /about/team and /about/advisory-board.
 */
const placeholderBio =
  "A person’s bio would show up here when their card is hovered.";

export const aboutTeam: PeopleSection = {
  heading: "Team",
  intro:
    "Meet the smarts and passion dedicated to shaping better futures for places.",
  people: [
    { name: "Sara Ahmed", role: "Co-Founder", bio: placeholderBio, image: "/images/about-person-1.jpg" },
    { name: "Rojin Hama", role: "Lead Designer", bio: placeholderBio, image: "/images/about-person-2.jpg" },
    { name: "Kamal Nuri", role: "Product Manager", bio: placeholderBio, image: "/images/about-person-3.jpg" },
    { name: "Dilan Azad", role: "Marketing Specialist", bio: placeholderBio, image: "/images/about-person-4.jpg" },
    { name: "Rojin Hama", role: "Lead Designer", bio: placeholderBio, image: "/images/about-person-2.jpg" },
  ],
  more: {
    body: "There’s more people behind the scene.",
    cta: "Meet our team",
    href: "/about/team",
  },
};

export const aboutAdvisory: PeopleSection = {
  heading: "Advisory Board",
  intro:
    "Meet the smarts and passion dedicated to shaping better futures for places.",
  people: [
    { name: "Sara Ahmed", role: "Co-Founder", bio: placeholderBio, image: "/images/about-person-5.jpg" },
    { name: "Kamal Nuri", role: "Product Manager", bio: placeholderBio, image: "/images/about-person-6.jpg" },
    { name: "Kamal Nuri", role: "Product Manager", bio: placeholderBio, image: "/images/about-person-7.jpg" },
    { name: "Dilan Azad", role: "Marketing Specialist", bio: placeholderBio, image: "/images/about-person-8.jpg" },
    { name: "Rojin Hama", role: "Lead Designer", bio: placeholderBio, image: "/images/about-person-2.jpg" },
  ],
  more: {
    body: "There’s more people behind the scene.",
    cta: "Meet Advisory Board",
    href: "/about/advisory-board",
  },
};

/** Partner logos (Frame 115). The strip repeats them, so the marquee only
 *  needs one copy here. `wide` marks the one lock-up Figma lays out in a
 *  174-wide box rather than a 104 square. */
export const aboutPartners = {
  heading: "Partners",
  logos: [
    { name: "Association of Film Commissioners International", src: "/images/partner-afci.png", wide: true },
    { name: "University of Sulaimani", src: "/images/partner-sulaimani.png", wide: false },
    { name: "Asian Film Commissions Network", src: "/images/partner-afcnet.png", wide: true },
    { name: "Location Managers Guild International", src: "/images/partner-lmgi.png", wide: true },
    { name: "Kurdsat", src: "/images/partner-kurdsat.png", wide: false },
  ],
} as const;

/* ---------------------------------------------------------------------------
   /film-fund — Figma "Film Fund - V1" (541:2432) and its guidelines page
   (939:110), both in file nbxKoz4mGA6K2A7z6v1RNY.

   This page is the site's only dark one: black under the shared paper tile at
   8% "hard light", white headings, slate (#ADB8BD) body copy.

   COPY NOTE — the frame leaves several blocks unwritten, twice with a note to
   the client in place of copy ("Rahand writes the contact content here.", and
   a caption reading "Rahand leraya 2-3 sentence anuse."). Those notes are not
   shipped; where a disclosure needs *something* to open onto, `body` carries a
   plainly provisional line instead of invented policy. Everything marked
   "awaiting copy" below needs the commission's own words before launch.
   ------------------------------------------------------------------------- */

/** Stands in for the blocks the frame leaves empty — deliberately obvious. */
const fundAwaitingCopy = "Copy for this section is still to come from the commission.";

export const fundHero = {
  wordmark: {
    src: "/images/fund-wordmark.svg",
    alt: "Kurdistan Film Fund",
  },
  image: {
    src: "/images/fund-hero.jpg",
    alt: "A lone tree on the plain below the mountains of the Kurdistan Region",
  },
  lead: "Initiative of the Kurdish Film Commission, the Kurdish Film Fund is a grant initiative dedicated to supporting the development, production, co-production, post-production and distribution of Kurdish short, medium-length, feature films and TV series in the Kurdistan region of Iraq and around the world through two annual funding cycles.",
  aside: [
    "The Fund also aims to expand beyond their borders Kurdish projects by connecting them with international opportunities.",
    "The Fund supports projects through both financial grants and tailored professional support designed to strengthen their artistic and production potential and maximize their chances of success.",
  ],
} as const;

export type FundDisclosure = { title: string; body: string };

export const fundAbout = {
  heading: "About",
  headingItalic: "The Kurdistan Film Fund",
  /** The figure is picked out in accent orange, the rest in slate. */
  amount: "$2M",
  amountSuffix: "fund given to selected individuals",
  cta: "Click here to Apply",
  image: {
    src: "/images/fund-about.jpg",
    alt: "A pool below snow-streaked peaks in the Kurdistan Region",
  },
  /** DRAFT COPY — the frame carries a note to the client here ("Rahand leraya
   *  2-3 sentence anuse.") rather than words. Written to the brief the note
   *  gives; needs the commission's sign-off. */
  imageCaption:
    "The Kurdistan Film Fund backs Kurdish stories from development through to distribution. It opens twice a year to shorts, features and TV series. Every selected project gets professional support alongside the grant.",
  items: [
    {
      title: "Our Vision",
      body: "The Kurdistan Film Fund (KFF) exists to empower Kurdish filmmakers, strengthen the local audiovisual industry, and connect Kurdish stories with international audiences. We believe cinema creates culture, employment, dialogue and opportunity, while contributing to the long-term development and international visibility of the Kurdistan Region of Iraq.",
    },
    // Awaiting copy — the frame gives these two rows a heading only.
    { title: "Our Mission", body: fundAwaitingCopy },
    { title: "Building a Sustainable Film Ecosystem", body: fundAwaitingCopy },
  ] as FundDisclosure[],
} as const;

export const fundGrants = {
  heading: "Grants",
  intro:
    "Through its financial and professional support, the Kurdish Film Fund fosters the Kurdish film industry while building a strong community of filmmakers who are bringing Kurdish stories to audiences around the world.\nThe Kurdish Film Fund supports projects across multiple formats.",
  cards: [
    {
      title: "Short and Medium-length films",
      body: "Fiction, Documentary and Animation at Production or Co-production stage, or may need Distribution support.",
      image: "/images/fund-grant-1.jpg",
      alt: "Cloud rolling over a dark ridge at dusk",
    },
    {
      title: "Feature films",
      body: "Fiction, Documentary and Animation at Development, Production, Co-production, or Post-production stage, or may need Distribution support.",
      image: "/images/fund-grant-2.jpg",
      alt: "A town on the far shore of a lake under a pale sky",
    },
    {
      title: "TV Series",
      body: "Fiction, Documentary and Animation at Development, Production, or Co-production stage.",
      image: "/images/fund-grant-3.jpg",
      alt: "Golden hills rolling to the horizon",
    },
  ],
} as const;

export const fundApplication = {
  heading: "Application",
  cta: "Click here to Apply",
  body: [
    "Registering a project requires submitting an online form and a single PDF containing all required documents during an open cycle.",
    "Once submitted, applications cannot be modified or withdrawn, and any incomplete dossiers will be automatically rejected.",
    "The full regulations, guidelines, and templates are available in detail below.",
  ],
  image: {
    src: "/images/fund-application.jpg",
    alt: "",
  },
} as const;

/** Where both "Click here to Apply" buttons point. The frame gives them no
 *  destination and there is no application form yet, so they open the contact
 *  page — swap for the real form when it exists. */
export const fundApplyHref = "/contact";

export const fundTimeline = {
  heading: "Fund Cycle Timeline",
  intro:
    "The Kurdish Film Fund holds two grant cycles each year. The dates below apply to the 2026 cycle and the first grant cycle of 2027.",
  /** `major` marks the announcements, which Figma draws at twice the diameter;
   *  `above` lifts the 2027 cycle's labels over the line, as the frame has them. */
  milestones: [
    { label: "Call opening", date: "September 1st, 2026", major: false, above: false },
    { label: "Deadline", date: "October 16th, 2026\n6pm (UTC+3)", major: false, above: false },
    { label: "Announcement of supported projects", date: "mid-January 2027", major: true, above: false },
    { label: "Call opening", date: "March 1st, 2027", major: false, above: true },
    { label: "Deadline", date: "April 2nd, 2027", major: false, above: true },
    { label: "Announcement of supported projects", date: "early July 2027", major: true, above: true },
  ],
} as const;

/**
 * The four regulation sets (Frame 239). Only "Guidelines & Templates" has a
 * page in the design (939:110); the other three are awaiting their content, so
 * they render without a link until it lands.
 */
export const fundGuidelines = {
  heading: "Application Guidelines",
  intro:
    "The Kurdish Film Fund holds two grant cycles each year. The dates below apply to the 2026 cycle and the first grant cycle of 2027.",
  rows: [
    { title: "General Regulations", href: null },
    { title: "Guidelines & Templates", href: "/film-fund/guidelines" },
    { title: "Eligibility & Policies", href: null },
    { title: "Evaluation & Selection", href: null },
  ] as { title: string; href: string | null }[],
} as const;

export const fundFaq = {
  heading: "Frequently asked questions",
  image: {
    src: "/images/fund-faq.jpg",
    alt: "Snow-covered peaks above a bare winter treeline",
  },
  /** Questions per page — the frame's list runs to five before its pager. */
  perPage: 5,
  items: [
    {
      title: "Does the KFF support the development of feature film projects?",
      body: "Yes. Feature films are eligible for funding at the Development stage, as well as Production, Co-production, Post-production and Distribution.",
    },
    // Awaiting copy — the frame lists these questions without answers.
    {
      title:
        "Does the KFF support the development or post-production of short film projects?",
      body: fundAwaitingCopy,
    },
    { title: "How can I submit a project for the KFF grant?", body: fundAwaitingCopy },
    {
      title:
        "As a director, is it possible to apply for the funding without previous works?",
      body: fundAwaitingCopy,
    },
    { title: "Do I need to complete the online submission all at once?", body: fundAwaitingCopy },
    { title: "Can I apply in Kurdish language?", body: fundAwaitingCopy },
  ] as FundDisclosure[],
} as const;

/**
 * /film-fund/guidelines — Figma 939:110. Seven documents, none of which the
 * client has supplied yet: a row with no `file` renders with its arrow dimmed
 * rather than linking nowhere. Drop the PDFs in `public/documents/` and fill
 * `file` in to switch them on.
 */
export const fundDownloadsPage = {
  backLabel: "Back to Kurdistan Film Fund",
  heading: "Guidelines & Templates",
  intro:
    "The Kurdish Film Fund holds two grant cycles each year. The dates below apply to the 2026 cycle and the first grant cycle of 2027.",
  image: {
    src: "/images/fund-guidelines-strip.jpg",
    alt: "",
  },
  rows: [
    { title: "Development PDF", file: null },
    { title: "Production & Co-Production PDF", file: null },
    { title: "Post-Production PDF", file: null },
    { title: "Distribution PDF", file: null },
    { title: "Financial Plan Template PDF", file: null },
    { title: "Budget Template PDF", file: null },
    { title: "Checklist PDF", file: null },
  ] as { title: string; file: string | null }[],
} as const;

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
