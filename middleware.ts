import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This middleware runs on every request
export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path.startsWith("/api/") || // API routes handled by their own auth
    path.includes("."); // Static files

  // Get the token from next-auth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to login if accessing protected route without token
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  if (token && (path === "/login" || path === "/signup")) {
    // Redirect to dashboard if accessing login/signup with token
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /fonts (static files)
     * 3. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!_next|fonts|favicon.ico|sitemap.xml).*)",
  ],
};
