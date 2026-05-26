import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin/jwt";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/constants";
import { getApexHost, getSiteHost } from "@/lib/siteUrl";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const apex = getApexHost();
  const canonicalHost = getSiteHost();

  if (apex && host === apex) {
    const url = request.nextUrl.clone();
    url.protocol = request.nextUrl.protocol;
    url.host = canonicalHost;
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    return new NextResponse("Configuration invalide : ADMIN_JWT_SECRET absent.", {
      status: 500,
    });
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const ok = await verifyAdminToken(token ?? "", secret);
  if (ok) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname);
  const res = NextResponse.redirect(login);
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
