import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        custom: "900px", // custom breakpoint
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        creepster: ['Creepster', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],

      },
      minHeight: {
        500: "500px",
        "full-double": "calc(500px * 2 + 1rem)",
      },
    },
  },
  plugins: [typography],
};

export default config;