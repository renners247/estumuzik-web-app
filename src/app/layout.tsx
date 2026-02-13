import React from "react";
// @ts-ignore
import "react-phone-input-2/lib/bootstrap.css";
// @ts-ignore
import "./globals.css";
// @ts-ignore
import "react-date-range/dist/styles.css";
// @ts-ignore
import "react-date-range/dist/theme/default.css";

// @ts-ignore
import "react-datepicker/dist/react-datepicker.css";
import ReduxProvider from "./redux-provider";
import { Metadata, Viewport } from "next";
import { SEODATA } from "@/components/utils/seoConstants";
import { Jost, Manrope, Space_Grotesk } from "next/font/google";

const jost = Jost({
	subsets: ["latin-ext"],
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["normal"],
});

const manrope = Manrope({
	subsets: ["latin-ext"],
	weight: ["200", "300", "400", "500", "700", "800"],
	style: ["normal"],
});

const space_grotesk = Space_Grotesk({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "700"],
	style: ["normal"],
});

const { description, keywords, title, url } = SEODATA.default;

export const metadata: Metadata = {
	applicationName: title,
	title: title,
	description: description,
	manifest: "/manifest.json",
	keywords: keywords,
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/pwa_images/apple-splash-1334-750.jpg",
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: title,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		url: url,
		siteName: "EstuMusik",
		title: title,
		description: description,
		images: [
			{
				url: SEODATA.defaultOGImage,
				width: 1200,
				height: 630,
				alt: "W",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: title,
		description: description,
		images: [SEODATA.defaultOGImage],
	},
};

export const viewport: Viewport = {
	themeColor: "#00C27A",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`bg-bg-100 ${manrope.className}`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
