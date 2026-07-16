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

/** Movies shot in Kurdistan (poster carousel). `featured` sits raised, per Figma. */
export const movies = [
  { src: "/images/poster-1.jpg", title: "Før Snøen Faller", featured: false },
  { src: "/images/poster-2.jpg", title: "Bekas", featured: true },
  { src: "/images/poster-3.jpg", title: "L'Hirondelle", featured: false },
  { src: "/images/poster-4.jpg", title: "Das Milan Protokoll", featured: false },
  { src: "/images/poster-5.jpg", title: "A Noiva", featured: false },
  { src: "/images/poster-6.jpg", title: "09", featured: false },
  { src: "/images/poster-7.jpg", title: "Der Junge Siyar", featured: false },
] as const;

/** News from experts pool — shown three at a time; the arrows page through it.
 *  Same image for every item for now. */
export const news = [
  { date: "3, Nov 2025", title: "LMGI Representatives Complete Location Familiarisation Tour in Kurdistan", href: "/news/lmgi-location-tour", image: "/images/news.jpg" },
  { date: "3, Nov 2025", title: "Three Day Film Workshop with Klaudia Śmieja Rostworowska in Slemani", href: "/news/film-workshop-slemani", image: "/images/news.jpg" },
  { date: "3, Nov 2025", title: "Kurdsat broadcasting Corporation and the Kurdistan Film commission sign a MoU", href: "/news/kurdsat-mou", image: "/images/news.jpg" },
  { date: "28, Oct 2025", title: "Kurdistan Film Commission Launches the 2026 Regional Film Fund", href: "/news/2026-film-fund", image: "/images/news.jpg" },
  { date: "21, Oct 2025", title: "International Producers Scout the Erbil Citadel for an Upcoming Feature", href: "/news/erbil-citadel-scout", image: "/images/news.jpg" },
  { date: "14, Oct 2025", title: "New Co-Production Treaty Opens Doors for Kurdish Filmmakers", href: "/news/co-production-treaty", image: "/images/news.jpg" },
  { date: "6, Oct 2025", title: "Duhok International Film Festival Announces its 2026 Programme", href: "/news/duhok-festival-2026", image: "/images/news.jpg" },
  { date: "29, Sep 2025", title: "Location Database Expands with 200 New Verified Filming Sites", href: "/news/database-expansion", image: "/images/news.jpg" },
  { date: "22, Sep 2025", title: "Masterclass Series Brings Cannes Mentors to Slemani", href: "/news/cannes-masterclass", image: "/images/news.jpg" },
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
