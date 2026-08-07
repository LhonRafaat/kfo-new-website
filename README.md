# Kurdistan Film Commission — Website (Strapi integration)

> **This is the `strapi-integration` branch.** Every string and image comes from
> the Strapi backend in `../kfo-new-website-backend`, so this branch needs that
> backend running. `master` is the static-content build — it renders from
> `src/lib/content.ts`, needs no backend, and is what client reviews go out on.
>
> `src/lib/content.ts` is still present here but nothing imports it. It is kept
> deliberately: it is the reference copy the seed was built from, and merging
> this branch must not delete it.

## Getting started

Start the backend first — this branch has no bundled copy of its content and
will not build without it:

```bash
cd ../kfo-new-website-backend
npm install && npm run seed && npm run develop    # http://localhost:1337/admin
```

Then, here:

```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build    # prerenders every route from Strapi
npm run start
```

## Content

`src/lib/strapi.ts` is the only way content enters the site on this branch: one
loader per page or collection, each carrying the populate query that page
needs. Pages are server components that call the loaders and pass plain props
down, so the client bundle never sees the fetcher.

Responses go through Next's data cache with `revalidate` set from
`STRAPI_REVALIDATE` (60s), so edits in the admin panel appear without a
rebuild. `generateStaticParams` prerenders `/locations/[slug]` and
`/industry-guide/[slug]` from the slugs Strapi holds.

| Module | Holds |
| --- | --- |
| `lib/content.ts` | The static copy `master` renders from. Unused on this branch; kept as the seed's reference. |
| `lib/strapi.ts` | Server loaders and the response types. **Server only** — it reads `STRAPI_TOKEN`. |
| `lib/media.ts` | `media()` / `mediaUrl()`. Client-safe, so client components can resolve an image URL. |
| `lib/strapi-forms.ts` | The four calls the browser makes: newsletter, contact, and the database gate's request/verify. |
| `lib/seo.ts` | Maps a page's `seo` component onto Next `Metadata`. |
| `lib/text.tsx` | `lines()` — renders a CMS string's newlines as `<br />`. |

Headings are stored as a plain run plus an `headingEmphasis` run, because the
design italicises the tail of most of them. Where that emphasis goes — its own
line, or inline after a space — stays in the component, since it is the Figma's
layout rather than the editor's copy.

The paper scans, washes and map artwork are published by the root layout as
`--asset-*` custom properties on `<html>`, which `globals.css` and a few inline
styles read; each has its bundled file as a `var()` fallback.

### Environment

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_REVALIDATE=60
STRAPI_TOKEN=            # only if the backend's public role is locked down
```

`next.config.mjs` derives the `next/image` `remotePatterns` entry from
`NEXT_PUBLIC_STRAPI_URL`, so pointing that at a deployed backend is enough.

## Forms

| Form | Writes to | Notes |
| --- | --- | --- |
| Newsletter (footer) | `POST /api/newsletter-subscribers` | A repeat address comes back as a uniqueness error, which reads as success. |
| Contact letter | `POST /api/contact-submissions` | Falls back to a `mailto:` compose if the request fails, so a message is never lost. |
| Location-database gate | `POST /api/database-access/{request,verify}` | The e-mail links back as `/locations?token=…`; the token is single-use and is stripped from the URL after it is exchanged. |

All three collections are write-only over the API — they are read in the admin
panel. **No e-mail is sent yet**: while the backend's `EXPOSE_ACCESS_TOKEN` is
on it returns the gate's token directly, which is what lets the flow be walked
in development. See the backend README for finishing that.

## Structure

```
src/
  app/
    layout.tsx            # fonts, site metadata, --asset-* custom properties
    page.tsx              # homepage composition + Organization JSON-LD
    globals.css           # Tailwind + design-system utility classes
    contact/ services/ locations/ industry-guide/
  components/
    Navbar.tsx            # server: loads both menus, renders NavbarMenu
    NavbarMenu.tsx        # client: header + full-screen menu overlay
    Footer.tsx            # server: brand, newsletter, link columns, socials
    icons.tsx             # logo mark, hamburger, curves (verbatim from Figma)
    ui/                   # Container, Eyebrow, AccentLink, Logo, ContactTable
    sections/             # one component per band of each page
  lib/                    # the Strapi client and its helpers (table above)
public/images/            # fallbacks only; the live assets are in Strapi
```

## Notes

- Typography is self-hosted through `next/font/local`: **Flecha M** (display
  serif) and **Cadiz** (body sans), the design's own faces.
- `/about`, `/production`, `/film-fund`, `/faq` and `/news` are still link
  stubs; `/`, `/services`, `/locations`, `/industry-guide` and `/contact` are
  built.
- `public/images/` is kept as the `var()` fallback for the CSS-driven textures,
  and is what `master` renders from throughout. On this branch nothing renders
  from it while the backend is reachable.
