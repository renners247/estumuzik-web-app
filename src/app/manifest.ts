import {
	SEODATA,
	shortName,
	websiteName,
} from "@/components/utils/seoConstants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: websiteName,
		short_name: shortName,
		description: SEODATA?.default?.description,
		start_url: "/?source=pwa",
		scope: "/",
		id: "/",
		display: "standalone",
		orientation: "portrait",
		lang: "en-US",
		dir: "auto",
		theme_color: "#FFD552",
		background_color: "#F8F8F8",
		categories: ["productivity", "utilities"],
		icons: [
			{
				src: "/pwa_images/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/pwa_images/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/pwa_images/manifest-icon-512.maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/pwa_images/manifest-icon-512.maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		screenshots: [
			{
				src: "/pwa_images/apple-splash-1668-2224.jpg",
				sizes: "1668x2224",
				type: "image/png",
				label: "LendoVerify Mobile App",
				platform: "windows",
				form_factor: "narrow",
			},
			{
				src: "/pwa_images/apple-splash-2388-1668.jpg",
				sizes: "2388x1668",
				type: "image/png",
				label: "LendoVerify Tablet View",
				platform: "ipados",
				form_factor: "wide",
			},
			{
				src: "/pwa_images/apple-splash-2732-2048.jpg",
				sizes: "2732x2048",
				type: "image/png",
				label: "LendoVerify Desktop Interface",
				form_factor: "wide",
			},
		],
	};
}
