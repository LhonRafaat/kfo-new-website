# Brand fonts (Flecha M + Cadiz VF)

The design uses two commercial Latinotype fonts. Until they're added, the site
falls back to **Fraunces** (serif) and **Inter** (sans) loaded via `next/font/google`
in `src/app/layout.tsx`.

## To install the real fonts

1. Drop the licensed files into this folder, e.g.:
   ```
   src/fonts/FlechaM-Regular.woff2
   src/fonts/FlechaM-Italic.woff2
   src/fonts/FlechaM-Medium.woff2
   src/fonts/FlechaM-MediumItalic.woff2
   src/fonts/FlechaM-Bold.woff2
   src/fonts/CadizVF.woff2            # variable, or individual weights
   ```
   `.woff2` is preferred; `.otf`/`.ttf`/`.woff` also work. Variable fonts are fine.

2. Then `layout.tsx` switches from `next/font/google` to `next/font/local`:
   ```ts
   import localFont from "next/font/local";

   const flecha = localFont({
     variable: "--font-serif",
     display: "swap",
     src: [
       { path: "../fonts/FlechaM-Regular.woff2", weight: "400", style: "normal" },
       { path: "../fonts/FlechaM-Italic.woff2",  weight: "400", style: "italic" },
       { path: "../fonts/FlechaM-Medium.woff2",  weight: "500", style: "normal" },
       { path: "../fonts/FlechaM-MediumItalic.woff2", weight: "500", style: "italic" },
       { path: "../fonts/FlechaM-Bold.woff2",    weight: "700", style: "normal" },
     ],
   });

   const cadiz = localFont({
     variable: "--font-sans",
     display: "swap",
     src: "../fonts/CadizVF.woff2", // or a src[] array of weights
   });
   ```
   The rest of the app already reads `--font-serif` / `--font-sans` (see
   `tailwind.config.ts`), so no other changes are needed.
