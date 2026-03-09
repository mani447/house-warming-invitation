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
        cream: "#FDF8F0",
        "cream-dark": "#F5EDE0",
        gold: "#C8A951",
        "gold-dark": "#A8893A",
        "warm-brown": "#5C3D2E",
        "warm-text": "#3E2723",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
