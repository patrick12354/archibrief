import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#060807",
        charcoal: "#0c100d",
        panel: "#101512",
        line: "rgba(217, 234, 222, 0.14)",
        copy: "#f1f2ea",
        muted: "#a3aca5",
        lime: "#c7ff4f",
        mist: "#d7ddd8"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(199,255,79,0.22), 0 30px 80px rgba(136,255,63,0.14)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(199,255,79,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(199,255,79,0.06) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      letterSpacing: {
        tighter2: "-0.06em"
      }
    }
  },
  plugins: []
};

export default config;
