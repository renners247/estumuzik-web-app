import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const IMAGE_URL = process.env.NEXT_PUBLIC_WP_IMAGE_URL || "";
export const AUTH_TOKEN_KEY = "ESTUMUSIK_LOGIN_ACCESS";
export const PERMISSIONS = "PERMISSION_ACCESS_ESTUMUSIK_WEB_APP";
export let hasSignedOut = false;

export const signOut = () => {
	if (hasSignedOut) return;
	hasSignedOut = true;

	// 🚨 Save the current path before logging out
	if (typeof window !== "undefined") {
		localStorage.setItem("EstumuzikredirectAfterLogin", window.location.href);
	}
	Cookies.remove(AUTH_TOKEN_KEY);
	toast.success("Logged out successfully!");
	window.location.pathname = "/";
};
