import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#001F5D",
          hover: "#001745",
          light: "#002B82",
        },
        secondary: {
          DEFAULT: "#7C9FE7",
          light: "#EBF1FC",
          dark: "#5A81D2",
        },
        accent: {
          DEFAULT: "#ECD700",
          hover: "#D9C600",
          light: "#FFF9B8",
        },
        textPrimary: "#000000",
        textSecondary: "#59667B",
        background: "#F8FAFC",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 25px 50px -12px rgba(0, 31, 93, 0.25), 0 0 0 12px #1E293B",
        card: "0 4px 20px -2px rgba(0, 31, 93, 0.06), 0 2px 6px -1px rgba(0, 31, 93, 0.04)",
        floating: "0 10px 30px -4px rgba(0, 31, 93, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
