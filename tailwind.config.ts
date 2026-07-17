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
        content: "1200px",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        "menu-in": "menu-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
