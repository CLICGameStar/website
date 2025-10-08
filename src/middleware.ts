import { NextRequest, NextResponse } from "next/server";

export const LOCALES = ["en", "fr"];

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  let newPath = `/fr${pathname}`;
  return NextResponse.rewrite(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Skip all internal paths (_next)
    "/", // Match the root path
  ],
};
