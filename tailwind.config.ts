import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#EAE3DB",
          light: "#F0EBE3",
        },
        ink: "#2A1B1D",
        espresso: "#3E2F2E",
        cocoa: "#3C2F2E",
        slate: {
          DEFAULT: "#ADB8BD",
          deep: "#9AA6AC",
        },
        // Refine-search dropdown on the location database list (Figma 338:516).
        panel: "#D9CFC5",
        // Industry Guide directory card surface (Figma 425:221).
        card: "#DFD9D1",
        accent: {
          DEFAULT: "#FF6600",
          soft: "#F19352",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        // Figma lays the page out on a 1280 frame with 48px gutters, so the
        // content column measures 1184px. Keeping the cap at the frame width
        // lets `lg:px-12` produce that column exactly.
        content: "1280px",
      },
      letterSpacing: {
        label: "0.02em",
        wordmark: "0.03em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "menu-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Founder's-message dialog (Figma 537:1923) and its scrim. The exit
        // pair is quicker than the entrance: dismissing should feel immediate.
        "sheet-in": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "sheet-out": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
        },
        "scrim-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "scrim-out": { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // Pulls the same motion tokens as `.reveal` (see globals.css) so an
        // `animate-fade-in` added later can't drift off-system.
        "fade-in": "fade-in var(--fade-duration) var(--fade-ease) both",
        "menu-in": "menu-in 0.4s ease-out both",
        "sheet-in": "sheet-in 0.4s var(--fade-ease) both",
        // Exits run on an ease-IN curve, not the shared `--fade-ease`. That
        // token is a hard ease-out — on the way out it dumps ~95% of the
        // change in the first third, so a 250ms exit read as an instant
        // disappearance. Slow start, quick finish is what makes it visible.
        "sheet-out": "sheet-out 0.3s cubic-bezier(0.4, 0, 1, 1) both",
        "scrim-in": "scrim-in 0.35s var(--fade-ease) both",
        "scrim-out": "scrim-out 0.3s cubic-bezier(0.4, 0, 1, 1) both",
        // Partner logo strip on /about: the row holds two copies of the list,
        // so travelling exactly -50% loops seamlessly.
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
