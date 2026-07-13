# Kurdistan Film Commission — Website

Server-rendered homepage for the Kurdistan Film Commission, recreated from the Figma
design (`Homepage - V1`) with **Next.js (App Router) + TypeScript + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## What's inside

- **SSR by default** — the homepage is a React Server Component; only the interactive
  pieces (menu overlay, poster carousel, news carousel, newsletter field) are client
  components, so the full page is rendered on the server.
- **Metadata & SEO** — title/description, Open Graph, Twitter card, canonical, robots,
  theme-color, and `Organization` JSON-LD (see `src/app/layout.tsx` and `src/app/page.tsx`).
- **Typography** — self-hosted via `next/font`: **Fraunces** (display serif, matches the
  design's *Flecha*) and **Inter** (body sans, matches *Cadiz*).
- **Design tokens** — colours and fonts live in `tailwind.config.ts`; reusable text/UI
  styles in `src/app/globals.css`.

## Structure

```
src/
  app/
    layout.tsx          # fonts + metadata + <html>
    page.tsx            # homepage composition (SSR) + JSON-LD
    globals.css         # Tailwind + design-system utility classes
  components/
    Navbar.tsx          # transparent header + full-screen menu overlay (client)
    Footer.tsx          # brand, newsletter, link columns, socials
    NewsletterForm.tsx  # newsletter field (client)
    icons.tsx           # logo mark, hamburger, curves (verbatim from Figma) + UI icons
    ui/                 # Container, Eyebrow, AccentLink, Logo (reusable primitives)
    sections/           # Hero, QuickLinks, Introduction, LocationDatabase,
                        # MoviesMade, FounderStatement, NewsExperts
  lib/
    content.ts          # all copy, nav, links, gallery & carousel data
public/images/          # optimized assets exported from the Figma source
```

## Notes

- All navigational links point to route stubs (`/about`, `/locations`, …) ready for the
  remaining pages to be built; the homepage is the only implemented route.
- Content is centralised in `src/lib/content.ts` so copy and imagery can be edited in one
  place (or wired to a CMS later).
