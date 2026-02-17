import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // MTN Branded Gradients
        "mtn-gradient": "linear-gradient(133deg, #FFCC00 0%, #E6B800 100%)",
        "mtn-dark-gradient":
          "linear-gradient(to bottom, #524400, #062c1b, #0a1a12)",
        "estu-dark-gradient":
          "linear-gradient(128.08deg, #121212 0%, #212121 100%)",
        "timebox-gradient":
          "linear-gradient(180deg, rgba(255, 204, 0, 0.15) 0%, rgba(18, 18, 18, 0.05) 100%)",
      },

      colors: {
        // MTN Primary Brand Colors
        primary: {
          50: "#FFFBEB",
          100: "#FFF1B8",
          200: "#FFE385",
          300: "#FFD552",
          400: "#FFC71F",
          500: "#FFCC00", // The official MTN Yellow
          600: "#D4AA00",
          700: "#A88800",
          800: "#7D6600",
          900: "#524400",
          DEFAULT: "#FFCC00",
        },
        // Estu Muzik Accent/Dark Theme
        secondary: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#003334",
          500: "#1A1A1A",
          DEFAULT: "#1A1A1A",
        },
        status: {
          100: "#248418", // active
          200: "#DC400C", // blacklisted
          300: "#636464", // unverified
          400: "#BED6FF", // processing
          500: "#EEDCA7", // rejected
          600: "#FFBC8F", // blocked
          700: "#B9F8B5", // successful
        },
        black: {
          100: "#000000",
          200: "#101928",
          300: "#0C1929",
          400: "#121212", // Dark background for music apps
          500: "#212121",
          600: "#141414",
        },
        bg: {
          100: "#F8F8F8",
          200: "#344054",
          300: "#3E3E3E",
          400: "#7A6D6D",
          500: "#05180F",
        },
        gray_1: {
          100: "#F2F2F2",
          200: "#535353",
        },
        purple_1: {
          100: "#8B5CF6",
        },
        green_1: {
          100: "#00C27A",
        },
        // Specific color for the 'MUZIK' section
        muzik_accent: "#FFCC00",
      },
      fontSize: {
        xxs: "10px",
        mxs: "8px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#FFCC00",
              foreground: "#000000",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FFCC00",
              foreground: "#000000",
            },
            background: "#121212",
          },
        },
      },
    }),
  ],
};
export default config;
