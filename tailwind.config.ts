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
        // Founder's-message bottom sheet (Figma 537:1923) rising into place.
        "sheet-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
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
        "sheet-in": "sheet-in 0.45s var(--fade-ease) both",
      },
    },
  },
  plugins: [],
};

export default config;
