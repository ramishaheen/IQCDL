import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Consolidate all alternate domains onto one canonical host so search ranking
// and link equity are not split across iqcdl.com / iqcdl.online / www.* .
const PRIMARY_HOST = (process.env.CANONICAL_HOST || "iqcdl.org").toLowerCase();
const KNOWN_HOSTS = [
  "iqcdl.org",
  "www.iqcdl.org",
  "iqcdl.com",
  "www.iqcdl.com",
  "iqcdl.online",
  "www.iqcdl.online",
];

export async function middleware(request: NextRequest) {
  // 1) Canonical host redirect (only for known alternate production hosts).
  const host = (request.headers.get("host") || "").toLowerCase();
  if (KNOWN_HOSTS.includes(host) && host !== PRIMARY_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = PRIMARY_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // 2) Protect the dashboard (authenticated routes only).
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = token ? await verifySessionToken(token) : null;
    if (!user) {
      const url = new URL("/login", request.url);
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next internals and static asset files, so the
  // canonical-host redirect applies site-wide while skipping build assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
