import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

import { I18N_CONFIG } from "@averse/lib/i18n/config";

import type { NextRequest } from "next/server";

const locales = ["en", "fr"];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = I18N_CONFIG.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as unknown as string[],
  );

  return matchLocale(languages, locales, "en");
}

export function middleware(request: NextRequest) {
  const nextReq = request.nextUrl;
  const pathname = nextReq.pathname;
  const origin = nextReq.origin;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`),
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(new URL(`/${locale}`, origin));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
