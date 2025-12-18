import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      colors: {
        lamaSky: "#38bdf8", // More vibrant sky
        lamaSkyLight: "#e0f2fe", // Richer light sky
        lamaPurple: "#cf66ff", // More vibrant purple
        lamaPurpleLight: "#f3e8ff", // Richer light purple
        lamaYellow: "#fbbf24", // More vibrant yellow
        lamaYellowLight: "#fef3c7", // Richer light yellow
        darkBg: "#0f172a", // Deep slate background
        glassBorder: "rgba(255, 255, 255, 0.2)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
        float: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
