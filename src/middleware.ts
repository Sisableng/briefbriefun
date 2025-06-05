import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // Define auth pages
  const authPages = ["/sign-in", "/sign-up"];
  const isAuthPage = authPages.includes(pathname);

  // If user has session and tries to access auth pages, redirect to /me
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  // If user has no session and tries to access protected pages, redirect to sign-in
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only protect the /me route, not the auth pages
  matcher: ["/me/:path*", "/sign-in", "/sign-up"],
};
