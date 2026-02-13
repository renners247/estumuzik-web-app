import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_KEY } from "./components/utils/data";

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const token = req.cookies.get(AUTH_TOKEN_KEY);
	const isAuthenticated = !!token;

	// Skip middleware for static files and API routes
	if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
		return NextResponse.next();
	}

	// PROTECT: All dashboard routes require authentication
	// if (!isAuthenticated && pathname.startsWith("/dashboard")) {
	// 	const redirectUrl = req.nextUrl.clone();
	// 	redirectUrl.pathname = "/";
	// 	return NextResponse.redirect(redirectUrl);
	// }

	// REDIRECT: Authenticated users from home to dashboard
	// if (isAuthenticated && pathname === "/") {
	// 	const redirectUrl = req.nextUrl.clone();
	// 	redirectUrl.pathname = "/dashboard";
	// 	return NextResponse.redirect(redirectUrl);
	// }

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*"],
};
