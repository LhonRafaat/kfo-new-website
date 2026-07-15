# Brand fonts

The site uses the licensed **Flecha M** (display serif) and **Cadiz** (grotesque
sans), self-hosted via `next/font/local` in `src/app/layout.tsx` and exposed as
the `--font-serif` / `--font-sans` CSS variables (wired into `tailwind.config.ts`).

## Files in use

| Family | File | CSS weight / style |
|--------|------|--------------------|
| Flecha M | `FlechaM-Regular.otf` | 400 normal |
| Flecha M | `FlechaM-RegularItalic.otf` | 400 italic |
| Flecha M | `FlechaM-Medium.otf` | 500 normal |
| Flecha M | `FlechaM-MediumItalic.otf` | 500 italic |
| Flecha M | `FlechaM-Bold.otf` | 700 normal |
| Flecha M | `FlechaM-BoldItalic.otf` | 700 italic |
| Cadiz | `Cadiz-Book.otf` | 400 normal (body, ≈ design w340) |
| Cadiz | `Cadiz-Regular.otf` | 500 normal |
| Cadiz | `Cadiz-SemiBold.otf` | 600 normal (labels, ≈ design w560) |

Full weight sets for both families (extra light → black, plus italics) are
available in the original `~/Downloads/flenchaM.zip` and `cadiz.zip` if more
weights are ever needed.

> Optional: these are `.otf` (~740 KB total). Converting to `.woff2` (needs
> `fonttools` + `brotli`) would cut that ~40% — just swap the file extensions in
> `layout.tsx` after converting.
