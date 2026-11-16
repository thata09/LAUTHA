import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#FF4F9A",
          neon: "#FF2E88",
          light: "#FFE4EF",
          pastel: "#FFF0F6",
          dark: "#21131B",
          gray: "#8B7883",
          border: "#FFD1E3",
          card: "rgba(255, 255, 255, 0.85)",
          glass: "rgba(255, 240, 246, 0.65)",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pink: "0 10px 30px -10px rgba(255, 79, 154, 0.35)",
        neon: "0 0 25px rgba(255, 46, 136, 0.45)",
        glass: "0 8px 32px 0 rgba(255, 79, 154, 0.12)",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "heart-pop": "heartPop 0.4s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(255,46,136,0.5))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 25px rgba(255,46,136,0.8))" },
        },
        heartPop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
