import { NextRequest, NextResponse } from "next/server";

const normalizeRedirectTarget = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
};

export function middleware(request: NextRequest) {
  const redirectTarget = normalizeRedirectTarget(
    process.env.REDIRECT_TO_ACADEMY ?? "",
  );

  if (!redirectTarget) {
    return NextResponse.next();
  }

  const destination = new URL(redirectTarget);

  if (request.nextUrl.origin === destination.origin) {
    return NextResponse.next();
  }

  return NextResponse.redirect(destination, 307);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
