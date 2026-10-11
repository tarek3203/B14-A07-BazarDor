import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// next 16 renamed middleware.ts to proxy.ts, and this runs on the edge, so it
// only checks that a session cookie is present. it cannot import the auth
// instance because that pulls in the mongodb driver, which the edge runtime
// cannot load. the real session check happens on the server once the page runs.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
