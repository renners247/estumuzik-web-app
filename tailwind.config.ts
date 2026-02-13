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
				"gradient-linear":
					"linear-brown-gradient(133deg, #2B3221 9.11%, rgba(242, 242, 242, 0.00) 298.89%)",
				"deep-blue-gradient":
					"linear-gradient(128.08deg, rgba(2, 3, 8, 0.9) 34.62%, rgba(1, 32, 130, 0.9) 71.83%, rgba(0, 44, 179, 0.9) 99.89%)",
				"green-gradient":
					"linear-gradient(128.08deg, rgba(0, 194, 122, 0.9) 0%, rgba(0, 150, 100, 0.85) 50%, rgba(0, 100, 70, 0.9) 100%)",
				"lemon-gradient": "linear-gradient(90deg, #118858 0%, #8EFACE 100%)",
				"timebox-gradient":
					"linear-gradient(180deg, rgba(127, 224, 111, 0.25) 0%, rgba(216, 221, 215, 0.25) 100%)",
				"deep-green-gradient":
					"linear-gradient(128.08deg, rgba(0, 80, 50, 0.95) 20%, rgba(0, 194, 122, 0.85) 70%, rgba(0, 150, 100, 0.9) 100%)",
			},

			colors: {
				// Add your custom colors here
				primary: {
					50: "#E6F9F0",
					100: "#00C27A",
					200: "#81E045",
					300: "#377D0B",
					400: "#00753B",
					500: "#B9D081",
					600: "#00421C",
					700: "#002911",
					800: "#000F05",
					900: "#000000",
				},
				secondary: {
					100: "#F5A3A3",
					200: "#beff8b"
				},
				status: {
					100: "#248418", //active
					200: "#DC400C", //blacklisted
					300: "#636464", //unverified
					400: "#BED6FF", //processing
					500: "#EEDCA7", //rejected
					600: "#FFBC8F", //blocked
					700: "#B9F8B5", //successful
				},
				black: {
					100: "#000000",
					200: "#101928",
					300: "#0C1929",
					400: "#121212",
					500: "#212121",
					600: "#141414",
				},
				bg: {
					100: "#F8F8F8",
					200: "#344054",
					300: "#3E3E3E",
					400: "#7A6D6D",
				},
				green_1: {
					100: "#0F973D",
					200: "#10B981",
				},
				red_1: {
					100: "#D42620",
				},
				blue_1: {
					100: "#0097D1",
					200: "#038FC1",
				},
				gray_1: {
					100: "#F2F2F2",
					200: "#535353"
				},
				card_gradient: {
					100: "#065f46",
					200: "#047857",
					300: "#022c22",
				}

				// Add more colors as needed
			},
			fontSize: {
				xxs: "10px",
				mxs: "8px",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};
export default config;
