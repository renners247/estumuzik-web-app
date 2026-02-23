import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_KEY } from "./components/utils/data";

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const token = req.cookies.get(AUTH_TOKEN_KEY);
	const isAuthenticated = !!token;

	// 1. Skip middleware for static assets, images, and internal Next.js files
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/static") ||
		pathname.includes(".") // skips files like favicon.ico, images, etc.
	) {
		return NextResponse.next();
	}

	const isAuthPage =
		pathname.startsWith("/auth") || pathname.startsWith("/loggedIn");

	// 2. PROTECT: If NOT authenticated and NOT on the login page, redirect to login
	if (!isAuthenticated && !isAuthPage) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	// 3. REDIRECT: If authenticated and trying to access auth pages (login/register), send to dashboard
	if (isAuthenticated && isAuthPage) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

// 4. Matcher configuration: Ensure it covers all protected routes
export const config = {
	matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
