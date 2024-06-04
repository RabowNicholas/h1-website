import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "dark-black": "#000000",
      "bright-yellow": "#FFD700",
      "charcoal-gray": "#333333",
      "light-gold": "#FFEA70",
      "slate-gray": "#555555",
      "warm-white": "#F4F4F4",
      "graphite-gray": "#4B4B4B",
      "cool-white": "#FFFFFF",
      "emerald-green": "#00A676",
      "forest-green": "#228B22",
    },
    screens: {
      sm: "0px",
      md: "748px",
      lg: "1024px",
    },
  },
  plugins: [],
};
export default config;
