import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname === "/feed" || pathname.startsWith("/feed/");

  const isAuthRoute =
    pathname === "/login" || pathname === "/register";

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/login", "/register"],
};